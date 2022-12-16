import {Request, Response} from "express";
import {UsersService} from "../services/users.service";
import {GenericController} from "./generic.controller";

export class UsersController extends GenericController {

    constructor() {
        super(new UsersService());
    }

    update = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.update({user_id: Number(req.params.id), ...req.body}))
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            res.json(await this.service.login(req.body, await this.service.getByEmail(req.body)))
        } catch (e: any) {
            console.log(e)
            res.status(e.status).send(e.message)
        }
    }

}