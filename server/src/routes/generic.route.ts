import { Router } from 'express';
import {Controller, Route} from "../utils/types";

export class GenericRoute<T> implements Route {

    protected controller: Controller & T
    protected router: Router

    constructor(controller: Controller & T) {
        this.controller = controller
        this.router = Router();
        this.router.get('/', this.controller.get);
        this.router.get('/:id', this.controller.getById);
        this.router.post('/', this.controller.create);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.remove);
    }

    getRouter = (): Router =>
        this.router

}
