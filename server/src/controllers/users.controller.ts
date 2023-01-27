import {Request, Response} from "express"
import {UsersService} from "../services/users.service"
import {GenericController} from "./generic.controller"
import {HttpResponseError} from "../utils/CustomErrors"

export class UsersController extends GenericController {

    constructor() {
        super(new UsersService())
    }

    getByIdIfItemOwnedByUserAndExists = async (itemId: number, userId: number) => {
        if (itemId !== userId)
            throw new HttpResponseError(403, 'Impostor !')
        return await this.service.getById(
            this.getUserCondition(userId),
            Number(itemId)
        )
    }

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.service.getByEmail(req.body)
            const token = await this.service.login(req.body, user)
            res.setHeader('Authorization', token).json(user)
        } catch (e: any) {
            res.status(e.status).send(e.message)
        }
    }

}
