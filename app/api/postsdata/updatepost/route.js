import { NextResponse } from "next/server";
import Post from "../../../models/post"
import { fetchuser } from "@/app/lib/fetchuser";
export async function PUT(request) {
    let success = false;
    try {
        let token = request.headers.get("auth-token");
        let userid = await fetchuser(token);

        let res = await request.json()
        let post = await Post.findById(res.postid)
        if (!post) {
            return NextResponse.json({ success }, { status: 404 })
        }
        if (post.userid.toString() !== userid) {
            return NextResponse.json({ success, errorMessage: "Try to login with correct credentials" }, { status: 404 })
        }
        post = await Post.findByIdAndUpdate(res.postid, { postData: res.postData }, { new: true })
        success = true;
        return NextResponse.json({ success, post })
    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}