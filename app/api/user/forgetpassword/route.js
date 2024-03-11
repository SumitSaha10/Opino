import { NextResponse } from "next/server";
import User from '../../../models/user'
import jwt from "jsonwebtoken";
export async function POST(request) {
    let success = false;
    try {
        let { email } = await request.json();
        let user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ success, errorMessage: "User Not Found" }, { status: 404 })
        }
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "5m" })
        let link = `http://localhost:3000/api/user/resetpassword?id=${user._id}&token=${token}`
        success = true;
        return NextResponse.json({ success, link: link })
    } catch (error) {
        NextResponse.json({ success, errorMessage: "Internal Server error" }, { status: 400 })
    }
}