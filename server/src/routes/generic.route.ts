import {NextFunction, Request, Response, Router} from 'express'
import {Controller, Route} from "../utils/types"

export class GenericRoute<T> implements Route {

    protected controller: Controller & T
    protected router: Router

    constructor(controller: Controller & T, middlewares: ((req: Request, res: Response) => void)[] = []) {
        this.controller = controller
        this.router = Router()
        if (middlewares.length > 0)
            this.router.use('*', (req: Request, res: Response, next: NextFunction) => {
                for (const middleware of middlewares)
                    middleware(req, res)
                next()
            })
        this.router.get('/', this.controller.get)
        this.router.get('/:id', this.controller.getById)
        this.router.post('/', this.controller.create)
        this.router.put('/:id', this.controller.updateById)
        this.router.delete('/:id', this.controller.removeById)
    }

    getRouter = (): Router =>
        this.router

}
