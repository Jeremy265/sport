import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {BodyCompositionCategoriesService} from "../services/bodyCompositionCategories.service";

export class BodyCompositionCategoriesController extends GenericController {

    constructor() {
        super(new BodyCompositionCategoriesService(), true);
    }

}