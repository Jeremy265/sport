import {GenericController} from "./generic.controller";
import {Request, Response} from "express";
import {TrainingsService} from "../services/trainings.service";
import {HttpResponseError} from "../utils/CustomErrors";

export class TrainingsController extends GenericController {

    constructor() {
        super(new TrainingsService());
    }

}