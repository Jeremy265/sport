import {GenericService} from "./generic.service"
import {BodyCompositionsSchema} from "../schemas/bodyCompositions.schema"
import {BodyComposition} from "../utils/types"
import {BodyCompositionsModel} from "../models/bodyCompositions.model"

export class BodyCompositionsService extends GenericService<BodyComposition> {

    constructor() {
        super(new BodyCompositionsModel(), new BodyCompositionsSchema(), 'body_composition_id')
    }

    getByUserId = (id: number): Promise<BodyComposition[]> => {
        this.validateSchema({user_id: id}, this.schema.getByUserId())
        return super.getBy({user_id: id})
    }

}