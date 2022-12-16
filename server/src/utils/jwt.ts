import {HttpResponseError} from "./CustomErrors";

const jwt = require('jsonwebtoken')

export const generateAccessToken = (data: any) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3 hours' });


export const verifyAccessToken = (token: string) =>
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err)
            throw new HttpResponseError({ status: 403, message: 'Wrong token'})
        return user
    })

