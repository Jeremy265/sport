import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {BodyCompositionsService} from "../services/bodyCompositions.service";

export class BodyCompositionController extends GenericController {

    constructor() {
        super(new BodyCompositionsService());
    }

    create = async (req: Request, res: Response) => {
        try {
            const userId = req.res?.locals.user.user_id
            if (!userId)
                res.status(401).send('Invalid token')

            res.json(await this.service.create({
                ...req.body,
                date: req.body.date ?? new Date(),
                user_id: userId
            }))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({body_composition_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}