import { NextResponse } from 'next/server';
import User from '../../../models/user'
export async function GET(request) {
    let success = false;
    try {
        let username = request.headers.get("username");
        let user = await User.findOne({ username: username }).select("-password")
        if (!user) {
            return NextResponse.json({ success, errorMessage: "User Not Found" })
        }
        success = true;
        return NextResponse.json({ success, user })
    } catch (error) {
        return NextResponse.json({ success, errorMessage: "Internal Server Error" })
    }
}