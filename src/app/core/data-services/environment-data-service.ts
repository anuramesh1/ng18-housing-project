import { map, Observable } from "rxjs";
import { ApiHttp, ApiResponse } from "../api";
import { Environment } from "../models/environment.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EnvironmentDataService {

    constructor(public apiHttp: ApiHttp) {
        
    }

    // getEnvironmentDetails(): Observable<any> {
    //     const url = 'environment';
    //     return this.apiHttp
    //             .getBookMs(url)
    //             .pipe(
    //                 map((response: ApiResponse) => 
    //                     return new Environment(response.data))
    //             );
    // }   
}