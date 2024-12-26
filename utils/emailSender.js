import nodemailer from 'nodemailer';
import {nodeMailerConfig} from '../config';

const transport = nodemailer.createTransport({
    host : nodeMailerConfig.NM_HOST,
    port : nodeMailerConfig.NM_PORT,
    auth : {
        user : nodeMailerConfig.NM_USERNAME,
        pass : nodeMailerConfig.NM_PASSWORD
    }
});

export const sendEmail = async(subject, reciverEmail, text, templatePath = null) => {
    const mailResult = await transport.sendMail({
        from : nodeMailerConfig.NM_SENDER_NAME,
        to : reciverEmail,
        subject : subject,
        text : text,
        html : templatePath
    });
    return mailResult;
}
