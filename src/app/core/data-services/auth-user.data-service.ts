import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApiHttp } from "../api/api-http.service";
import { ApiResponse } from "../api/api-response";

@Injectable()
export class AuthUserDataService {
    constructor(private apiHttp: ApiHttp) {
    }

    getProfile(): Observable<any> {
        const url = 'users';
        return this.apiHttp
                .getBookMs(url)
                .pipe(
                    map((response: ApiResponse) => response.data),
                    catchError((error) => {
                        return of(error);
                    })
                );
    }

}