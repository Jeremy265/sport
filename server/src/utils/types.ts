import {Request, Response, Router} from "express"
import {ObjectSchema} from "joi"

export interface Route {
    getRouter: () => Router
}

export interface Include {
    [key: string]: boolean | number | Include
}

export interface Condition {
    [key: string]: number | string | boolean
}

export type Schema = {
    getById: () => ObjectSchema
    create: () => ObjectSchema
    update: () => ObjectSchema
    remove: () => ObjectSchema
}

export type Controller = {
    get: (req: Request, res: Response) => void
    getById: (req: Request, res: Response) => void
    getBy: (req: Request, res: Response) => void
    create: (req: Request, res: Response) => void
    updateById: (req: Request, res: Response) => void
    removeById: (req: Request, res: Response) => void
}

export interface Service {
    get: (conditions: any) => Promise<any[]>
    getById: (conditions: any, id: any) => Promise<any>
    getBy: (conditions: any) => Promise<any>
    create: (data: any) => Promise<any>
    updateById: (conditions: any, id: any, data: any) => Promise<any>
    removeById: (conditions: any, id: any) => Promise<any>
}

export interface Model {
    get: (condition: any) => Promise<any[]>
    getById: (conditions: any) => Promise<any>
    getBy: (conditions: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (conditions: any, data: any) => Promise<any>
    remove: (conditions: any) => Promise<any>
}

export interface BodyCompositionCategory {
    body_composition_category_id?: number
    title: string
    unit_id: number
    user_id?: number
    created_at: Date
    updated_at: Date
}

export interface BodyComposition {
    body_composition_id?: number
    title: string
    body_composition_category_id: string
    user_id: number
    created_at: Date
    updated_at: Date
}

export interface Training {
    training_id?: number
    title?: string
    date: Date
    user_id: number
    created_at: Date
    updated_at: Date
}

export interface Unit {
    unit_id?: number
    title: string
    user_id?: number
    created_at: Date
    updated_at: Date
}

export interface Exercise {
    exercise_id?: number
    title: string
    image: string
    unit_id: number
    user_id?: number
    created_at: Date
    updated_at: Date
}

export interface Set {
    set_id?: number
    repetitions: number
    value: number
    exercise_id: number
    training_id: number
    created_at: Date
    updated_at: Date
}

export interface User {
    user_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
}

export interface UserLogin {
    email: string
    password: string
}
