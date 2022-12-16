export class HttpResponseError extends Error {
    private readonly status: number

    constructor(error: {status: number, message: string}) {
        super(error.message);
        this.message = error.message || 'An error occured';
        this.status = error.status || 500;
    }

    toString(): string {
        return `Error ${this.status} : ${this.message}`;
    }
}