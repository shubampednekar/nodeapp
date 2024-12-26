import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path : path.resolve(`${process.cwd()}`,`.env.${process.env.NODE_ENV}`)
})
export const config = {
    NODE_ENV : process.env.NODE_ENV || 'dev',
    PORT : process.env.PORT || 5000,
    MONGO_URI : process.env.MONGO_URI ,
    MONGODB_NAME : process.env.MONGO_DBNAME,
    JWT_SECRET : process.env.JWT_SECRET
}

export const nodeMailerConfig = {
    NM_USERNAME : process.env.NODEMAILER_USERNAME,
    NM_PASSWORD : process.env.NODEMAILER_PASSWORD,
    NM_HOST : process.env.NODEMAILER_HOST,
    NM_PORT : process.env.NODEMAILER_PORT,
    NM_SENDER_NAME : process.env.NODEMAILER_SENDER_NAME
}