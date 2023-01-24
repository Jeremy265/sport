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

}
