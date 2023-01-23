import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'
import User from '../models/User.js'
import Token from '../models/Token.js'
import { resetPasswordMsg } from '../utils/mailGenerator/resetPassword.js';
import { sendEmail } from '../utils/mail.js';
import { hash } from '../utils/hash.js';

export const register = async (req, res, next) => {
    try {
        if (!req.body.fullname || !req.body.username || !req.body.email || !req.body.password)
            return next(createError(401, "Please fill the all requried fields."));
        else if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const newUser = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hash(req.body.password),
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT)

            const { password, isAdmin, ...otherDetails } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).send({ ...otherDetails })
        }
    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or email!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).send({ ...otherDetails })
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("access_token", "", { httpOnly: true, expires: new Date(Date.now()) }).status(200).send("Logout successfully.")
    } catch (err) {
        next(err)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        if (req.body.newPassword.length < 6 || req.body.newPassword.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const user = await User.findById(req.user.id);
            const isPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isPasswordCorrect) return next(createError(400, "Wrong password!"))
            else {
                user.password = hash(req.body.newPassword);
                await user.save();
                res.status(200).send("Password change successful.");
            }
        }
    } catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return next(createError(404, "User does not exist."));
        else {
            let token = await Token.findOne({ userId: user._id });
            if (token) {
                await token.deleteOne();
            }
            let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

            const hashedToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

            await new Token({
                userId: user._id,
                token: hashedToken,
                createdAt: Date.now(),
                expiresAt: Date.now() + 5 * (60 * 1000), // 5 minutes
            }).save();

            const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

            const message = resetPasswordMsg(resetUrl, user.username);
            const subject = "Reset Password Request";
            const send_to = user.email;

            await sendEmail(subject, message, send_to);
            res.status(200).send("Reset Email Sent successfully.");
        }
    } catch (err) {
        next(err);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const hashedToken = crypto
                .createHash("sha256")
                .update(req.params.resetToken)
                .digest("hex");

            const userToken = await Token.findOne({
                token: hashedToken,
                expiresAt: { $gt: Date.now() },
            });

            if (!userToken)
                return next(createError(404, "Invalid or Expired Token."));
            else {
                const user = await User.findOne({ _id: userToken.userId });
                user.password = hash(req.body.password);
                await user.save();
                res.status(200).send("Password reset successful.");
            }
        }
    } catch (err) {
        next(err);
    }
}