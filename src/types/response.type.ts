export interface ApiResponse {
    isSuccess: boolean,
    statusCode: number,
    message: string,
    messageLBL: string,
    payload: object
}