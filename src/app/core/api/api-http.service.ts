import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "./api-response";
import { environmentConfig } from "src/environments/environment";

// export const API_HTTP_CONFIGURATION = new InjectionToken<ApiHttpOptions>('API_HTTP_CONFIGURATION');

// export interface ApiHttpOptions {
//     // The base URL of the microservice applications
//     msBooksAppBaseUrl: string;
//     msHouseAppBaseUrl: string;
// }

@Injectable({ providedIn: 'root' })
export class ApiHttp {

    private MS_BOOK_API_BASE: string = '';
    private MS_HOUSE_API_BASE: string = '';

    // constructor(
    //     private http: HttpClient, 
    //     @Inject(API_HTTP_CONFIGURATION) config: ApiHttpOptions){
    //     this.MS_BOOK_API_BASE = config.msBooksAppBaseUrl;
    //     this.MS_HOUSE_API_BASE = config.msHouseAppBaseUrl;
    // }

    constructor(private http: HttpClient) {
        this.MS_BOOK_API_BASE = environmentConfig.msBooksAppBaseUrl;
        this.MS_HOUSE_API_BASE = environmentConfig.msHousingAppBaseUrl;
    }

    public getBookMs<T>(url: string, options?: any): Observable<any | Observable<T[]>> {
            return this.http.get<ApiResponse>(`${this.MS_BOOK_API_BASE}${url}`, options); 
    }

    public getHouseMs<T>(url: string, options?: any): Observable<{} | Observable<T[]>> {
            return this.http.get(`${this.MS_HOUSE_API_BASE}${url}`, options); 
    }

    public postBookMs<T>(url: string, body: any, options?: any): Observable<{} | Observable<T[]>> {
            return this.http.post(`${this.MS_BOOK_API_BASE}${url}`, body, options); 
    }

    public postHouseMs<T>(url: string, body: any, options?: any): Observable<{} | Observable<T[]>> {
            return this.http.post(`${this.MS_HOUSE_API_BASE}${url}`, body, options); 
    }


}