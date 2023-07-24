export class HttpResponseError extends Error {
    private readonly status: number

    constructor(status: number, message: string) {
        super(message)
        this.message = message || 'An error occured'
        this.status = status || 500
    }

    toString(): string {
        return `Error ${this.status} : ${this.message}`
    }
}