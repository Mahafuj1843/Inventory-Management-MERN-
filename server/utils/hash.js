import bcrypt from 'bcryptjs'

export const hash = (text) =>{
    const salt = bcrypt.genSaltSync(10);
    const hashText = bcrypt.hashSync(text, salt);

    return hashText;
};