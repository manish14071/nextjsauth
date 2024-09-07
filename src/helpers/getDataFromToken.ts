
import jwt from "jsonwebtoken"
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {

    try {
        const token = request.cookies.get("token")?.value || ""

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.id
    } catch (error) {
        throw new Error(error.message)

    }
}