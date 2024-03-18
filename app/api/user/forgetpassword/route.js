import { NextResponse } from "next/server";
import User from '../../../models/user'
import jwt from "jsonwebtoken";
let nodemailer = require("nodemailer")
export async function POST(request) {
    let success = false;
    try {
        let { email } = await request.json();
        let user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ success, errorMessage: "User Not Found" }, { status: 404 })
        }
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1d" })
        let link = `http://localhost:3000/api/user/resetpassword?id=${user._id}&token=${token}`

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'opino90ac@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: 'opino90ac@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Hi,

There was a request to change your password!

If you did not make this request then please ignore this email.

Otherwise, please click this link to change your password: ${link}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return NextResponse.json({ success, errorMessage: "Something went Wrong" }, { status: 400 })
            }
        });

        success = true;
        return NextResponse.json({ success })
    } catch (error) {
        NextResponse.json({ success, errorMessage: "Internal Server error" }, { status: 400 })
    }
}