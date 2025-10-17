import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async(req, res)=>{
    try{
        const {username, email, password} = req.body;
    if(!email || !username || !password)
            return res.status(400).json({
                message: "All fields are required to sign up.",
                success: false
            });
    let isEmailFound = await User.findOne({email});
    if(isEmailFound){
        return res.status(400).json({
            message: "Email already exist",
            success: false
        })    
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        email,
        password: hashedPassword,
    })
    return res.status(201).json({
        success: true,
        message: "Registered Successfully"
    })
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            success: false
        })
    }
}
