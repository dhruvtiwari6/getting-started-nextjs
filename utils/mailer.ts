import User from '@/models/user.model';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface EmailOptions {
    email: string;
    emailtype: 'verify' | 'reset';
    userId: mongoose.Types.ObjectId;
}

const mail_pass = process.env.DEMO_MAILTRAP_TOKEN;
const mail_host = process.env.MAIL_TRAP_HOST;
const mail_user = process.env.MAIL_TRAP_USER;

export const sendEmail = async({email , emailtype , userId} : EmailOptions) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailtype === 'verify') {
            await User.findByIdAndUpdate(userId, {
             verifyToken:  hashedToken,
             verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailtype === 'reset') {
            await User.findByIdAndUpdate(userId, {
             forgotPasswordToken:  hashedToken,
             forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
        host: mail_host,
        port: 465,
        auth: {
            user: mail_user,
            pass: mail_pass,
        },
        });


        const mailOptions = {
            from:mail_user,
            to: email,
            subject: emailtype === 'verify' ? 'Verify your email' : 'Reset your password',
            html: "<p>click here</p>"
        };

        console.log("Sending email transporter request");

        const mailResponse  = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return mailResponse;


    }catch (Err: unknown) {
      if(Err instanceof Error) throw new Error (Err.message || 'Failed to send email');
      throw new Error('Failed to send email');
    }
}