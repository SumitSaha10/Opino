import { fetchuser } from "@/app/lib/fetchuser";
import Post from "../../../models/post"
import { NextResponse } from "next/server";
export async function DELETE(request) {
    try {
        let success = false;
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
        post = await Post.findByIdAndDelete(res.postid);
        success = true
        return NextResponse.json({ success, post })
    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}