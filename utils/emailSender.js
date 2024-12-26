import nodemailer from 'nodemailer';
import {nodeMailerConfig} from '../config.js';

/**
 * Creates a Nodemailer transport object using the provided configuration.
 *
 * @constant {Object} transport - The Nodemailer transport object.
 * @property {string} host - The hostname or IP address to connect to (e.g., 'smtp.example.com').
 * @property {number} port - The port to connect to (e.g., 587).
 * @property {Object} auth - The authentication object.
 * @property {string} auth.user - The username for authentication.
 * @property {string} auth.pass - The password for authentication.
 */
const transport = nodemailer.createTransport({
    host : nodeMailerConfig.NM_HOST,
    port : nodeMailerConfig.NM_PORT,
    auth : {
        user : nodeMailerConfig.NM_USERNAME,
        pass : nodeMailerConfig.NM_PASSWORD
    }
});

/**
 * Sends an email using the specified parameters.
 *
 * @param {string} subject - The subject of the email.
 * @param {string} reciverEmail - The recipient's email address.
 * @param {string} text - The plain text content of the email.
 * @param {string} [templatePath=null] - The HTML template path for the email content (optional).
 * @returns {Promise<Object>} The result of the email sending operation.
 */

export const sendEmail = async(subject, reciverEmail, text = null, templatePath = null) => {
    let options = {
        from : nodeMailerConfig.NM_SENDER_NAME,
        to : reciverEmail,
        subject : subject,
    };
    templatePath ? options.html = templatePath : options.text = text;
    const mailResult = await transport.sendMail(options);
    return mailResult;
}
