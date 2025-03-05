import { ApiError } from "./api-error";
export class InvalidResponseError extends ApiError {
    public static ID = 'INVALID_RESPONSE';

    constructor() {
        super(InvalidResponseError.ID, 'This application send an invalid response');
    }
}