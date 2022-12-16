import {Request, Response, Router} from "express";

export interface Route {
    getRouter: () => Router
}

export type Controller = {
    get: (req: Request, res: Response) => void
    getById: (req: Request, res: Response) => void
    getBy: (req: Request, res: Response) => void
    create: (req: Request, res: Response) => void
    update: (req: Request, res: Response) => void
    remove: (req: Request, res: Response) => void
}


export interface Service {
    get: () => Promise<any[]>
    getById: (conditions: any) => Promise<any>
    getBy: (conditions: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (conditions: any, data: any) => Promise<any>
    remove: (conditions: any) => Promise<any>
}

export interface Model {
    get: () => Promise<any[]>
    getById: (conditions: any) => Promise<any>
    getBy: (conditions: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (conditions: any, data: any) => Promise<any>
    remove: (conditions: any) => Promise<any>
}

export interface BodyCompositionCategory {
    body_composition_category_id?: number;
    title: string,
    unit: string,
    created_at: Date;
    updated_at: Date;
}

export interface BodyComposition {
    body_composition_id?: number;
    title: string,
    unit: string,
    created_at: Date;
    updated_at: Date;
}

export interface Training {
    training_id?: number;
    title?: string,
    date: Date,
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Exercise {
    exercise_id?: number;
    title: string,
    image: string,
    created_at: Date;
    updated_at: Date;
}

export interface Set {
    set_id?: number;
    number: number,
    repetitions: number,
    weight: number,
    exercise_id: number,
    training_id: number,
    created_at: Date;
    updated_at: Date;
}

export interface User {
    user_id?: number;
    first_name: string,
    last_name: string,
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserLogin {
    email: string;
    password: string;
}