import { IErrorResponse } from "@/types/error-response"

export class RequestError implements IErrorResponse {
    public message: string
    public name: string

    public constructor(message: string) {
        this.message = message
        this.name = 'Error'
    }
}