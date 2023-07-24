import {Request, Response} from "express"
import {Controller} from "../utils/types"

export class GenericController implements Controller {

    protected service: any
    protected gettableByAll: boolean
    protected foreignTableUserKey: string

    constructor(service: any, gettableByAll: boolean = false, foreignTableUserKey: string = '') {
        this.service = service
        this.gettableByAll = gettableByAll
        this.foreignTableUserKey = foreignTableUserKey
    }

    getUserIdByRequest = (req: Request) => {
        if (req.res?.locals.user === undefined)
            return
        return req.res?.locals.user.user_id
    }

    getUserCondition = (userId: number | null) =>
        this.foreignTableUserKey === ''
            ? {
                user_id: userId
            }
            : {
                [this.foreignTableUserKey]: {
                    user_id: userId
                }
            }

    getConditions = (userId: number, mustBeOwned: boolean = !this.gettableByAll) =>
        mustBeOwned
            ? this.getUserCondition(userId)
            : {
                'OR': [
                    this.getUserCondition(userId),
                    this.getUserCondition(null),
                ]
            }

    getByIdIfItemOwnedByUserAndExists = (itemId: number, userId: number) =>
        this.service.getById(
            this.getConditions(userId, true),
            Number(itemId)
        )

    get = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.get(this.getConditions(this.getUserIdByRequest(req))))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getById(
                this.getConditions(this.getUserIdByRequest(req)),
                Number(req.params.id)
            ))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getBy = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getBy(this.getConditions(this.getUserIdByRequest(req))))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.create(
                this.foreignTableUserKey === ''
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