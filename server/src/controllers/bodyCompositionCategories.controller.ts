import {GenericController} from "./generic.controller";
import {BodyCompositionCategoriesService} from "../services/bodyCompositionCategories.service";
import {NextFunction, Request, Response} from "express";

export class BodyCompositionCategoriesController extends GenericController {

    constructor() {
        super(new BodyCompositionCategoriesService(), true);
    }

    addUserConditionInclude = (req: Request, res: Response) => {
        this.service.addUserConditionInclude(this.getUserIdByRequest(req))
    }

    updateVisibilityById = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.updateVisibilityById(
                Number(req.params.id),
                {...req.body, ...this.getUserCondition(this.getUserIdByRequest(req))}
            ))
        } catch (e: any) {
            console.log(e)
            res.status(e.status).send(e.message)
        }
    }

}
