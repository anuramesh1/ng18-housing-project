import { Directive } from "@angular/core";

@Directive()
export class ApiError {
    constructor(public id: string, public message: string) {

    }
}