import {Condition, Include, Model} from "../utils/types"

export class GenericModel<T> implements Model {

    protected prisma: any
    protected includes: Include

    constructor(prismaClient: any, includes: Include = {}) {
        this.prisma = prismaClient
        this.includes = includes
    }

    get = (conditions: Condition = {}): Promise<T[]> =>
        this.prisma.findMany({
            where: conditions,
            include: this.includes
        })

    getById = (conditions: Condition = {}): Promise<T> =>
        this.prisma.findFirstOrThrow({
            where: conditions,
            include: this.includes
        })

    getBy = (conditions: Condition = {}): Promise<T[]> =>
        this.prisma.findMany({
            where: conditions,
            include: this.includes
        })

    create = (data: T): Promise<T> => {
        return this.prisma.create({
            data: data,
            include: this.includes
        })
    }

    update = (conditions: Condition = {}, data: T): Promise<T> =>
        this.prisma.update({
            where: conditions,
            data: data,
            include: this.includes
        })

    remove = (conditions: Condition = {}): Promise<T> =>
        this.prisma.delete({
            where: conditions,
            include: this.includes
        })

}
