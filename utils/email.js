const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "example@gmail.com",
            pass: "any password"
        }
    });

    // 2) Define email options
    const mailOptions = {
        from: 'example@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions, (err)=>{
        if(err)console.log(err);
        else console.log("Email sended");
    });
}

module.exports = sendEmail;