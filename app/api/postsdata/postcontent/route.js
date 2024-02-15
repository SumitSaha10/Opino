import { NextResponse } from "next/server";
import { fetchuser } from "../../../lib/fetchuser";
import Post from "../../../models/post"
import User from "../../../models/user"
export async function POST(request) {
    let success = false;
    try {
        let token = request.headers.get("auth-token")
        let userid = await fetchuser(token)
        let user = await User.findOne({ _id: userid }).select("-password");
        let req = await request.json()
        let post = new Post({
            userid: userid, user: user.name, postData: req.postData
        })
        post = await post.save()
        success = true
        return NextResponse.json({ success, post })

    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}