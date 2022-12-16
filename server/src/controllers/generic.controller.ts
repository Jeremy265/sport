import {Request, Response} from "express";
import {Controller} from "../utils/types";

export class GenericController implements Controller {

    protected service: any

    constructor(service: any) {
        this.service = service
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