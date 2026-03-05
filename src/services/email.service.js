require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  secure:true,
  host:'smtp.gmail.com',
  port:465,
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
  },
});

// Function to send email
const sendMail = async (to, sub, msg) => {
  try {
    const info = await transporter.sendMail({
      from: `Backend Ledger <${process.env.EMAIL_USER}>`, // sender address
      to:to, // list of receivers
      subject:sub, // Subject line
      html:msg, // html body
    });
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASSWORD);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function  sendRegistrationEmail(userEmail,name){
    const subject = 'Welcome to Backend Ledger!';
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;
  await sendMail(userEmail,subject,html);
}

async function  sendTransactionEmail(userEmail,name,amount,toAccount){
    const subject = 'Transaction successful!';
    const html = `<p>Hello ${name},</p><p>your transaction of $${amount} to  account ${toAccount} was successful`;
  await sendMail(userEmail,subject,html);
}

async function  sendTransactionFailureEmail(userEmail,name,amount){
    const subject = 'Transaction Failed!';
    const html = `<p>Hello ${name},</p><p> we regret to inform you that you transaction of $${amount} to account is failed!`;
  await sendMail(userEmail,subject,html);
}

module.exports = {sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};


