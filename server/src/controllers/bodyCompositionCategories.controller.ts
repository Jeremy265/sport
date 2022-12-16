import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {BodyCompositionCategoriesService} from "../services/bodyCompositionCategories.service";

export class BodyCompositionCategoriesController extends GenericController {

    constructor() {
        super(new BodyCompositionCategoriesService());
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({body_composition_category_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}