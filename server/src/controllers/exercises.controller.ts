import {GenericController} from "./generic.controller";
import {ExercisesService} from "../services/exercises.service";
import {Request, Response} from "express";

export class ExercisesController extends GenericController {

    constructor() {
        super(new ExercisesService());
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({exercise_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}