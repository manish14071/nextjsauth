import { connect } from "@/dbConfig/dbConnection";



import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
    try {

        const logout = NextResponse.json({ message: "logout successfully", success: true })

        logout.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        },)
        return logout
    } catch (error) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )

    }
}