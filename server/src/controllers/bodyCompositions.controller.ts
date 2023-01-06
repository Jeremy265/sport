import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {BodyCompositionsService} from "../services/bodyCompositions.service";
import {HttpResponseError} from "../utils/CustomErrors";

export class BodyCompositionController extends GenericController {

    constructor() {
        super(new BodyCompositionsService());
    }

    getByUserId = async (req: Request, res: Response) => {
        try {
            if (Number(req.params.id) !== this.getUserIdByRequest(req))
                throw new HttpResponseError(403, 'Impostor !')
            res.json(await this.service.getByUserId(Number(req.params.id)))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}