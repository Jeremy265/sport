import {NextFunction, Request, Response} from "express"
import {verifyAccessToken} from "../utils/jwt"
import {HttpResponseError} from "../utils/CustomErrors"

interface AllowedRoute {
    method: string
    url: string
}

const removeTrailingSlash = (str: string) => {
    return str.replace(/\/+$/, '')
}

const allowedRoutes = [
    {
        method: 'POST',
        url: '/users/login'
    },
    {
        method: 'POST',
        url: '/users'
    }
]

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const isAllowedRoute: boolean = allowedRoutes.find((allowedRoute: AllowedRoute) => allowedRoute.url === removeTrailingSlash(req.url) && allowedRoute.method === req.method) !== undefined
    if (isAllowedRoute)
        return next()

    const authorization: string = req.headers['authorization'] || ''
    const token: string = authorization && authorization.split(' ')[1]

    if (!token)
        return res.status(401).send('Missing token')

    try {
        res.locals.user = verifyAccessToken(token)
        if (!res.locals.user.user_id)
            throw new HttpResponseError(401, 'Invalid token')
        next()
    } catch (error: any) {
        res.status(error.status).send(error.message)
    }
}
