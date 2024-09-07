import { connect } from "@/dbConfig/dbConnection";

import User from "@/models/userModel"

import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json()
        const { email, password } = reqbody

        console.log(reqbody)

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User doesnt exist" }, { status: 400 })

        }
        console.log("user exist")


        const compare = await bcryptjs.compare(password, user.password)

        if (!compare) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })

        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })


        const response = NextResponse.json({ message: "LOgges in succes", success: true },
            { status: 500 }
        )
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }

}