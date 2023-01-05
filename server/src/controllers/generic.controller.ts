import {Request, Response} from "express";
import {Controller} from "../utils/types";
import {HttpResponseError} from "../utils/CustomErrors";

export class GenericController implements Controller {

    protected service: any

    constructor(service: any) {
        this.service = service
    }

    validateUser = (userId1: number, userId2: number) => {
        if (userId1 !== userId2)
            throw new HttpResponseError(403, 'You can not access other user\'s data')
        }

    get = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.get())
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getById(Number(req.params.id)))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    getBy = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getBy({}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.create(req.body))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update(req.body))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    remove = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.remove(Number(req.params.id)))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }
}