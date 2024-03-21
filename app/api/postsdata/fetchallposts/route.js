import { NextResponse } from "next/server";
import Post from "../../../models/post"
export async function GET(request) {
    let success = false;
    try {
        let username = request.headers.get("username");
        let posts = await Post.find({ username: username })
        success = true
        return NextResponse.json({ success, posts })
    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}