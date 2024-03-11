import { NextResponse } from "next/server";
import User from '../../../models/user'
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
export async function GET(request) {
    let success = false;
    try {
        let searchParams = request.nextUrl.searchParams
        let id = searchParams.get("id")
        let token = searchParams.get("token")
        let user = await User.findById({ _id: id })
        if (!user) {
            return NextResponse.json({ success, errorMessage: "User Not Exist" }, { status: 404 })
        }
        let secret = process.env.JWT_SECRET_KEY + user.password;
        jwt.verify(token, secret)
        success = true;
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ success, errorMessage: "Internal Server Error" }, { status: 400 })
    }

}