import {HttpResponseError} from "./CustomErrors"

const jwt = require('jsonwebtoken')

export const generateAccessToken = (data: any) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '72h' })


export const verifyAccessToken = (token: string) =>
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err)
            throw new HttpResponseError(403, 'Wrong token')
        return user
    })

