import {Model} from "../utils/types";

export interface Include {
    [key: string]: boolean | Include;
}

export interface Condition {
    [key: string]: number | string | boolean;
}

export class GenericModel<T> implements Model {

    protected prisma: any
    private readonly includes: Include

    constructor(prismaClient: any, includes: Include = {}) {
        this.prisma = prismaClient
        this.includes = includes
    }

    get = (conditions: Condition, includes: Include = this.includes): Promise<T[]> =>
        this.prisma.findMany({
            where: conditions,
            include: includes
        })

    getById = (conditions: Condition, includes: Include = this.includes): Promise<T> =>
        this.prisma.findUniqueOrThrow({
            where: conditions,
            include: includes
        })

    getBy = (conditions: Condition, includes: Include = this.includes): Promise<T> =>
        this.prisma.findMany({
            where: conditions,
            include: includes
        })

    create = (data: T, includes: Include = this.includes): Promise<T> => {
        return this.prisma.create({
            data: data,
            include: includes
        })
    }

    update = (conditions: Condition, data: T, includes: Include = this.includes): Promise<T> =>
        this.prisma.update({
            where: conditions,
            data: data,
            include: includes
        })

    remove = (conditions: Condition, includes: Include = this.includes): Promise<T> =>
        this.prisma.delete({
            where: conditions,
            include: includes
        })
}