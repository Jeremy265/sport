import {Model} from "../utils/types";
import {DMMF} from "@prisma/client/runtime";
import ModelAction = DMMF.ModelAction;

export class GenericModel<T> implements Model{

    protected prisma: any

    constructor (prismaClient: any) {
        this.prisma = prismaClient
    }

    get = (): Promise<T[]> =>
        this.prisma.findMany()

    getById = (conditions: any): Promise<T> =>
        this.prisma.findUniqueOrThrow({
            where: conditions,
        })

    getBy = (conditions: any): Promise<T> =>
        this.prisma.findMany({
            where: conditions,
        })

    create = (data: T): Promise<T> => {
        return this.prisma.create({
            data: data
        })
    }

    update = (conditions: any, data: T): Promise<T> =>
        this.prisma.update({
            where: conditions,
            data: data
        })

    remove = (conditions: any): Promise<T> =>
        this.prisma.delete({
            where: conditions
        })
}