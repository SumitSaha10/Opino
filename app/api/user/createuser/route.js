import { NextResponse } from "next/server";
import User from '../../../models/user'
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Route - Creating user using (POST)
export async function POST(request) {
    try {
        let res = await request.json()
        let success = false;
        const validationSchema = [
            {
                valid: validator.isLength(res.name, {
                    min: 3
                }),
                error: "Name must be atleast 3 characters"
            },
            {
                valid: validator.isEmail(res.email),
                error: "Email is invalid"
            },
            {
                valid: validator.isLength(res.password, {
                    min: 6
                }),
                error: "Password must be atleast 6 characters"
            }
        ]
        let errors = []
        validationSchema.forEach(event => {
            if (!event.valid) {
                errors.push(event.error)
            }
        })

        if (errors.length > 0) {
            return NextResponse.json({ success: success, errorMessage: errors[0] }, { status: 400 })
        }

        let user = await User.findOne({ email: res.email })
        if (user) {
            return NextResponse.json({ success: success, errorMessage: "Email already taken" }, { status: 404 })
        }
        //Creating secure password using salt and hash
        let salt = await bcrypt.genSalt(10)
        let securePassword = bcrypt.hashSync(res.password, salt)
        user = new User({
            name: res.name,
            email: res.email,
            password: securePassword
        })
        user = await user.save()
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY)
        success = true
        return NextResponse.json({ success, authToken })
    } catch (error) {
        return NextResponse.json({ success: false, errorMessage: "Internal server error" }, { status: 500 })
    }
}