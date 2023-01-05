import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {UnitsService} from "../services/units.service";

export class UnitsController extends GenericController {

    constructor() {
        super(new UnitsService());
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({unit_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}