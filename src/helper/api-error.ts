import { IErrorResponse } from "@/types/error-response"

export class ApiError implements IErrorResponse {
    public message: string
    public name: string
    public code?: string
    public status: number

    public constructor(message: string, status: number, code?: string) {
        this.message = message
        this.status = status
        this.name = 'Error'
        if(code){
            this.code = code
        }
    }
}