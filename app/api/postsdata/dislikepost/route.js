import { fetchuser } from "@/app/lib/fetchuser";
import Post from "../../../models/post"
import { NextResponse } from "next/server";
export async function POST(request) {
    let success = false;
    try {
        let token = request.headers.get("auth-token");
        let userid = await fetchuser(token)

        let res = await request.json();
        let post = await Post.findById(res.postid)
        if (!post) {
            return NextResponse.json({ success, errorMessage: "Post not found" }, { status: 404 })
        }
        let updatedLikes = await post.likes.filter(item => item.toString() !== userid)
        post = await Post.findByIdAndUpdate(res.postid, { likes: updatedLikes }, { new: true })
        return NextResponse.json({ success, post })
    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}