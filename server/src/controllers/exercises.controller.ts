import {GenericController} from "./generic.controller";
import {ExercisesService} from "../services/exercises.service";
import {Request, Response} from "express";

export class ExercisesController extends GenericController {

    constructor() {
        super(new ExercisesService(), true);
    }

}