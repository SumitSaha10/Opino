import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    profilePhoto: {
        type: String,
    },
    profileCover: {
        type: String,
    },
    bio: {
        type: String,
    },
    followers: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            username: {
                type: String,
                require: true,
                unique: true,
            },
            profilePhoto: {
                type: String,
            },
        }
    ],
    following: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            username: {
                type: String,
                require: true,
                unique: true,
            },
            profilePhoto: {
                type: String,
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now

    }
})

let User = mongoose.models.users || mongoose.model("users", userSchema)
module.exports = User