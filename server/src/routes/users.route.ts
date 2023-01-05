import {GenericRoute} from "./generic.route";
import {UsersController} from "../controllers/users.controller";
import {BodyCompositionController} from "../controllers/bodyCompositions.controller";

export class UsersRoute extends GenericRoute<UsersController> {

    constructor() {
        super(new UsersController());
        this.router.post('/login', this.controller.login);
        this.router.get('/:id/bodyCompositions', new BodyCompositionController().getByUserId)
    }

}