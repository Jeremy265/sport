import {HttpResponseError} from "./CustomErrors"

const statusByPrismaCodes: {
    [code: string]: number
} = {
    'P2000': 400,
    'P2001': 404,
    'P2025': 404,
    'P2002': 409
}

const messageByPrismaCodes: {
    [code: string]: string
} = {
    'P1000': 'Authentication failed to database',
    'P1001': 'Can\'t reach database',
    'P1002': 'Database reached but timed out',
    'P1003': 'Database not found',
    'P1008': 'Operations timed out',
    'P1009': 'Database already exists',
    'P1010': 'User was denied access on the database',
    'P1011': 'Error opening a TLS connection',
    'P1013': 'The provided database string is invalid',
    'P1014': 'Model does not exists',
    'P1015': 'Prisma feature not supported by the database',
    'P1016': 'Raw query had an incorrect number of parameters',
    'P1017': 'Server has closed the connection',
    'P2000': 'The provided value for the column is too long for the column\'s type',
    'P2001': 'The record searched for in the where condition does not exist'
}

export const handleError = (e: any) => {
    if (e.name === 'ValidationError') {
        return new HttpResponseError(400, e.details[0].message)
    }
    if (e.name === 'NotFoundError') {
        return new HttpResponseError(404, 'Resource not found')
    }
    if (e.code === 'P2002') {
        return new HttpResponseError(409, 'Unique constraint failed on field : ' + e.meta.target)
    }
    if (e.code === 'P2003') {
        return new HttpResponseError(400,'Foreign key constraint failed on field : ' + e.meta.field_name)
    }
    if (e.code === 'P2025') {
        return new HttpResponseError(404, e.meta.cause)
    }
    console.log(e)
    return new HttpResponseError(statusByPrismaCodes[e.code] || 500, messageByPrismaCodes[e.code] || 'An error occurred')
}
