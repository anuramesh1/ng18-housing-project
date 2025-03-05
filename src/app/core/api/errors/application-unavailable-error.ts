import { ApiError } from "./api-error";

export class ApplicationUnavailableError extends ApiError {
    public static ID = 'APPLICATION_UNAVAILABLE';

    constructor() {
        super(ApplicationUnavailableError.ID, 'This application is currently unavailable');
    }
}