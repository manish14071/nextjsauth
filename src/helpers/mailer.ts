import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { $set: {verifyToken: hashedToken, verifyTokenExpiry:new Date(Date.now() + 3600000)} })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPassword: hashedToken, forgotPasswordExpiry: Date.now() + 3600000 })

    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d387034fa4d061",
        pass: "ccb727d72b6525"
      }
    });



    const mailOptions = {
      from: 'any1@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and past elink below in broswer.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
    };
    const mailreset = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error) {

  }
}