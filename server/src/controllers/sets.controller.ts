import {GenericController} from "./generic.controller"
import {Request, Response} from "express"
import {SetsService} from "../services/sets.service"

export class SetsController extends GenericController {

    constructor() {
        super(new SetsService(), false, 'trainings')
    }

    getByTrainingId = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.getByTrainingId(
                this.getUserCondition(this.getUserIdByRequest(req)),
                Number(req.params.id)
            ))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}