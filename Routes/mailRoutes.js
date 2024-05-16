const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"nabeelkn07@gmail.com",
        pass:"nabeelkn9061"
    }
})
router.post('/sendEmail' , (req , res)=>{
    const { to, subject, text } = req.body;
    const mailOptions = {
        from: 'nabeelkn07@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions , (error , info)=>{
        if (error) {
            console.log('error sending mail' , error);
            res.status(500).json({ error: 'Failed to send email'})
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    })
})

module.exports=router;
