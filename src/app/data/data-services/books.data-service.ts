import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";


@Injectable()
export class BooksDataService {
    baseUrl = 'https://openlibrary.org/api/books';
    key = 'bibkeys=ISBN:0201558025,LCCN:93005405'
    format = 'json';


    constructor(public httpClient: HttpClient) {
        
    }

    getBooks(): Observable<any> {
        const url = `{baseUrl}?{key}&format={format}`;
        return this.httpClient.get(url).pipe(
                map((response: any) => {
                        console.log('Books response: ', response);
                        return response.data
                    }),
                    catchError((error: any) => {
                        return of(error);
                    })
                );
    }

}