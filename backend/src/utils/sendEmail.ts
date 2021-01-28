import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string, subject: string) {
  //! Don't spam the servers
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("TEST ACCOUNT", testAccount);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS,
    },
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"VR Funds Team" <no-reply@example.com>',
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
