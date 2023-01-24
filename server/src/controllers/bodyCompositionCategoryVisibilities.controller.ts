import {GenericController} from "./generic.controller";
import {BodyCompositionCategoriesService} from "../services/bodyCompositionCategories.service";
import {NextFunction, Request, Response} from "express";
import {BodyCompositionCategoryVisibilitiesService} from "../services/bodyCompositionCategoryVisibilities.service";
import {HttpResponseError} from "../utils/CustomErrors";

export class BodyCompositionCategoryVisibilitiesController extends GenericController {

    constructor() {
        super(new BodyCompositionCategoryVisibilitiesService());
    }

    updateVisibilities = async (req: Request, res: Response) => {
        try {
            await this.service.removeByUserId(this.getUserIdByRequest(req))
            res.send(await this.service.updateVisibilities(this.getUserIdByRequest(req), req.body))
        } catch (e: any) {
            console.log(e)
            res.status(e.status).send(e.message)
        }
    }

    updateById = async (req: Request, res: Response) => {
        res.status(405).send()
    }

    removeById = async (req: Request, res: Response) => {
        res.status(405).send()
    }

}
