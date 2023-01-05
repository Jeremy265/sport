import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {TrainingsService} from "../services/trainings.service";
import {HttpResponseError} from "../utils/CustomErrors";

export class TrainingsController extends GenericController {

    constructor() {
        super(new TrainingsService());
    }

    create = async (req: Request, res: Response) => {
        try {
            const userId = req.res?.locals.user.user_id

            res.json(await this.service.create({
                ...req.body,
                date: new Date(),
                user_id: userId
            }))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            if (req.res?.locals.user.user_id !== Number(req.params.id))
                throw new HttpResponseError(403, 'You can not update other users')
            res.json(await this.service.update({training_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}