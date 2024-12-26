import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import { User } from "../models/userModel.js";
import { getStatusCode, StatusCodes } from 'http-status-codes';
import { Resettoken } from '../models/resettokenModel.js';
import { sendEmail } from '../utils/emailSender.js';    
import { EmailMessages } from '../enum.js';
import path from 'path';
import fs from 'fs';

const  template = path.join(path.resolve(), 'emailTemplates', 'login.html');
const emailTemplate = fs.readFileSync(template,'utf-8');

export const login =async (req,res) => {
    const { username , password } = req.body;
    try {
        const user = await User.findOne({
            username : username
        });
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch){
                const token = jwt.sign({ id : user._id},config.JWT_SECRET,{expiresIn : '1h'});
                const mail = await sendEmail(EmailMessages.LOGIN_SUBJECT,user.email,EmailMessages.LOGIN_SUCCESS, emailTemplate);
                res.status(StatusCodes.OK).json({ message : "Login Successfully",token : token})
 
            }else{
                res.status(StatusCodes.UNAUTHORIZED).json({ message : "Invalid Password"})
            }
        }else{

            res.status(StatusCodes.NOT_FOUND).json({
                message : 'User Not found'
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : error.message})
    }
}

export const register = async (req,res) => {
    const { name, username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(StatusCodes.CONFLICT).json({message:'User Already Exist'});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const newUser = new User({
                name: name,
                email : email,
                username: username,
                password : hashPassword
            });
            await newUser.save();
            res.status(StatusCodes.OK).json({message:'user saved successfully'});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error : 'internal error'});
    }
}

export const forgotpassword = async(req,res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({ id : user._id},config.JWT_SECRET,{expiresIn : '1h'});
            const salt = await bcrypt.genSalt(10);
            const hashedToken = await bcrypt.hash(token, salt);

            const updateToken = new Resettoken({
                userId : user._id,
                token : token,
                hashedToken : hashedToken, 
                created : Date.now()
            });
            await updateToken.save();
            if(updateToken){
                res.status(StatusCodes.OK).json({message:'reset email sent',token: token})
            }else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error during token creation'});
            }
        }else{
            res.status(StatusCodes.NOT_FOUND).json({message : 'Email doesnt exist'});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'Internal Error'});
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {token} = req.query;
        const { newpassword } = req.body;
        const resertToken = await Resettoken.findOne({ token : token});
        if(resertToken){
            const userId = resertToken.userId;
            const user = await User.findOne( { _id : userId});
            const salt = await bcrypt.genSalt(10);
            const isSamePassword = await bcrypt.compare(newpassword,user.password);
            if(isSamePassword){
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'password needs to be different than previous one'});
            }else{
                const hashedpassword = await bcrypt.hash(newpassword,salt);
                await User.updateOne({_id : userId},{password : hashedpassword});
                await resertToken.deleteOne();
                res.status(StatusCodes.OK).json({message:'password updated successfully'})

            }
        }else{
            res.status(StatusCodes.NOT_FOUND).json({message: 'token not found or expired'});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message});
    }
}

export const profile = async (req,res) => {
    try {
        const userId = req.user;
        const user = await User.findOne({ _id : userId });
        res.status(StatusCodes.OK).json({message:'profile recieved', user});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'internal error'});
    }
    
}