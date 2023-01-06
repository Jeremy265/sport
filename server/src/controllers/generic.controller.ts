import {Request, Response} from "express";
import {Controller} from "../utils/types";

export class GenericController implements Controller {

    protected service: any
    protected hasDefaultKey: boolean
    protected hasUserKey: boolean
    protected foreignTableUserKey: string

    constructor(service: any, hasDefaultKey: boolean = false, hasUserKey: boolean = true, foreignTableUserKey: string = '') {
        this.service = service
        this.hasDefaultKey = hasDefaultKey
        this.hasUserKey = hasUserKey
        this.foreignTableUserKey = foreignTableUserKey
    }

    getUserIdByRequest = (req: Request) => {
        if (req.res?.locals.user === undefined)
            return
        return req.res?.locals.user.user_id
    }

    getUserCondition = (userId: number) => {
        if (!this.hasDefaultKey) {
            return this.hasUserKey
                ? {
                    user_id: userId
                }
                : {
                    [this.foreignTableUserKey]: {
                        user_id: userId
                    }
                }
        }
        return this.hasUserKey
            ? {
                'OR': [
                    {
                        user_id: userId
                    },
                    {
                        isDefault: true
                    }
                ]
            }
            : {
                'OR': [
                    {
                        [this.foreignTableUserKey]: {
                            user_id: userId
                        }
                    },
                    {
                        isDefault: true
                    }
                ]
            }
    }


    getByIdIfItemOwnedByUserAndExists = async (itemId: number, userId: number) =>
        await this.service.getById(
            this.getUserCondition(userId),
            Number(itemId)
        )

    get = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.get(this.getUserCondition(this.getUserIdByRequest(req))))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            res.json(await this.getByIdIfItemOwnedByUserAndExists(Number(req.params.id), this.getUserIdByRequest(req)))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getBy = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getBy(this.getUserCondition(this.getUserIdByRequest(req))))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.create(
                this.hasUserKey
                    ? {
                        ...req.body,
                        user_id: this.getUserIdByRequest(req)

                    }
                    : req.body
            ))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    updateById = async (req: Request, res: Response) => {
        try {
            if (await this.getByIdIfItemOwnedByUserAndExists(Number(req.params.id), this.getUserIdByRequest(req)))
                res.json(await this.service.updateById(
                    Number(req.params.id),
                    req.body
                ))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    removeById = async (req: Request, res: Response) => {
        try {
            if (await this.getByIdIfItemOwnedByUserAndExists(Number(req.params.id), this.getUserIdByRequest(req)))
                res.json(await this.service.removeById(
                    Number(req.params.id))
                )
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }
}