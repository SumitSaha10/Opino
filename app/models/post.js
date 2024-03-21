import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    user: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    postData: {
        type: String,
        required: true
    },
    postImage: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: Date.now

    }
})

let Post = mongoose.models.posts || mongoose.model("posts", postSchema)
module.exports = Post