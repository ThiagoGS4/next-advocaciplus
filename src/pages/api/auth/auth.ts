import { IUserProps } from "@/types/login"
import jwt from "jsonwebtoken"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jwtSign = (object: any): string => {
    // mexer aqui no auth??
    const user: IUserProps = {
        status: object.status,
        email: "",
        username: "",
        user: {
            data: {
                auth: {
                    token: "",
                    refresh_token: "",
                },
                info: {
                    name: "",
                    age: 0,
                },
            },
        },
    }

    const token = jwt.sign(user, process.env.AUTH_SECRET ?? "")

    return token
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const data = req.body

    const token = jwtSign(data)

    return res.status(200).json(token)
}
