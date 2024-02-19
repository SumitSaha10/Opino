import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs"
import User from "../../../models/user"
import jwt from "jsonwebtoken";
export async function POST(request) {
    try {
        let res = await request.json()
        let success = false;
        let errors = []
        let validationSchema = [
            {
                valid: validator.isEmail(res.email),
                error: "Email is not valid"
            },
            {
                valid: validator.isLength(res.password, {
                    min: 6
                }),
                error: "Password must be atleast 6 characters"
            }
        ]

        validationSchema.forEach(ele => {
            if (!ele.valid) {
                errors.push(ele.error)
            }
        })

        if (errors.length > 0) {
            return NextResponse.json({ success, errorMessage: errors[0] }, { status: 400 })
        }

        let { email, password } = res;
        let user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ success, errorMessage: "Please try to login with correct credentials" }, { status: 404 })
        }

        let securePassword = await bcrypt.compare(password, user.password)
        if (!securePassword) {
            return NextResponse.json({ success, errorMessage: "Please try to login with correct credentials" }, { status: 404 })
        }

        let data = {
            user: {
                id: user._id
            }
        }

        let authToken = jwt.sign(data, process.env.JWT_SECRET_KEY)
        success = true;
        return NextResponse.json({ success, authToken })
    } catch (error) {
        return NextResponse.json({ success: false, errorMessage: "Internal server error" }, { status: 500 })
    }
}