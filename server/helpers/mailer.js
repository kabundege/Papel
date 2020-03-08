import nodemailer from "nodemailer";
import Nexmo from 'nexmo'
import dotenv from 'dotenv'

dotenv.config()

export default class mail {
    static async main(staff,data) {

        const transactionMessage = `
            <div  style="background: #581b98;padding:10px;border-radius:5px;width:80%">
                <p><span style="background:#46c3db;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">Transaction Type </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000""> ${data.type}<span></p>
                <p><span style="background:#9c1de7;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">Amount </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000""> ${data.amount}</span></p>
                <p><span style="background:#f3558e;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">Account Number </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000""> ${data.accountnumber}</p>
                <p><span style="background:#e0d500;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">Cashier </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000""> ${staff.firstname}  ${ staff.lastname} </span></p>
                <p><span style="background:#17b978;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">Old Balance </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000""> ${data.oldbalance}</span></p>
                <p><span style="background:#85203b;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">New Balance </span> :
                <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000"">${data.newbalance}</span></p>
            </div>
        `;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD 
            }
        });

        let info = await transporter.sendMail({
            from: `'From Papel' 👻 ${process.env.EMAIL}`, 
            to: "christophekwizera1@gmail.com", 
            subject: "Transactions Successful ✔", 
            text: "Papel_An Excellent Banking Experience", 
            html: transactionMessage
        });
    }

    static async sendSms(message) {
        try{
          const nexmo = new Nexmo({
            apiKey: process.env.SMS_API_KEY,
            apiSecret: process.env.SMS_API_SECRET,
          });
    
          const from = 'Kabundege Andela';
          const to = '+250784824295';
          const text = `${transa.type } transaction`;
          nexmo.message.sendSms(from, to, text);
        } catch (err) {
          return err;
        }
    }

    static async reset(user,token){
        const Message = `
        <div  style="background: #581b98;padding:10px;border-radius:5px;width:80%">
            <p><span style="background:#46c3db;color:white;border-top-left-radius:3px;border-bottom-left-radius:3px;padding:5px;">To reset your Password </span>
            <span style="background:white;border-top-right-radius:3px;border-bottom-right-radius:3px;padding:5px;color:#000"><a href="http://localhost:1999/reset.html?token=${token}">Click here</a><span></p>
        </div>`;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD 
            }
        });

        let info = await transporter.sendMail({
            from: `'From Papel' 👻 ${process.env.EMAIL}`, 
            to: `${user.email}`, 
            subject: "Reset Your Password", 
            text: "Papel_An Excellent Banking Experience", 
            html: Message
        });
    }
}
