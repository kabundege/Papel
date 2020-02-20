import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

export default class mail {
    static main (staff,data) {
        const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
        });

        const mailOption = {
            from:`${staff.email}`,
            to:'christophekwizera1@gmail.com',
            subject:"transaction was successful",
            text:{
                data,
                cashier:staff.firstname+" "+staff.lastname
            }
        }
        transporter.sendMail(mailOption,(err,res)=>{
            if(err){
                console.log(err)
            }
        })
    }
}
