import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {SetsService} from "../services/sets.service";

export class SetsController extends GenericController {

    constructor() {
        super(new SetsService());
    }

    getByTrainingId = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getByTrainingId(Number(req.params.id)))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({repetition_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}