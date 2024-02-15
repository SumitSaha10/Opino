const { NextResponse } = require("next/server")
import User from "../../../models/user"
import { fetchuser } from "../../../lib/fetchuser";
export async function POST(request) {
    let success = false;
    try {
        let token = request.headers.get("auth-token");
        let userid = await fetchuser(token)
        let user = await User.findOne({ _id: userid }).select("-password");
        success = true
        return NextResponse.json({ success, user })

    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }


}