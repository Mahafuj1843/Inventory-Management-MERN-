import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {createError} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) =>{
    try{
        if(!req.body.fullname || !req.body.username || !req.body.email || !req.body.password)
           return next(createError(401, "Please fill the all requried fields."));
        else if(req.body.password.length<6 || req.body.password.length>12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({
                fullname : req.body.fullname,
                username : req.body.username,
                email : req.body.email,
                password : hash,
            })
            await newUser.save();
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT)

            const { password, isAdmin, ...otherDetails } = newUser._doc;
            res.cookie("access_token", token, {httpOnly: true, expires: new Date(Date.now() + 1000 * 86400)}).status(200).send({...otherDetails})
        }
    }catch(err){
        next(err)
    }
}


export const login = async (req,res,next) =>{
    try{
        const user = await User.findOne({ email: req.body.email })
        if(!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or email!"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT) 

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {httpOnly: true, expires: new Date(Date.now() + 1000 * 86400)}).status(200).send({...otherDetails})
    }catch(err){
        next(err)
    }
}

export const logout = async (req,res,next) =>{
    try{
        res.cookie("access_token", "", {httpOnly: true, expires: new Date(Date.now())}).status(200).send("Logout successfully.")
    }catch(err){
        next(err)
    }
}