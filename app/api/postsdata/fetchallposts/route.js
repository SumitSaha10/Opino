import { fetchuser } from "@/app/lib/fetchuser";
import { NextResponse } from "next/server";
import Post from "../../../models/post"
export async function GET(request) {
    let success = false;
    try {
        let token = request.headers.get("auth-token");
        let userid = await fetchuser(token);
        let posts = await Post.find({ userid: userid })
        success = true
        return NextResponse.json({ success, posts })
    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }
}