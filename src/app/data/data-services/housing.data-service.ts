import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousingLocation } from '../models/housing-location';
import { map, Observable, of } from 'rxjs';
import { ApiHttp } from 'src/app/core/api/api-http.service';
import { environmentConfig } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/api/api-response';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class HousingDataService {

	// For local testing without json-server use this local link and update the array with static values.
	readonly baseUrl = '../../assets/';
	housingLocationList: HousingLocation[] = [];

	// url = 'http://localhost:3000/locations';
    url = '';
    serviceUrl = '/locations'; // Spring Boot
	
    constructor(private http: HttpClient, private apiHttp: ApiHttp, private config: AppConfigService) {
        this.url =  environmentConfig.msHousingAppBaseUrl +  this.serviceUrl;
        console.log("FULL URL:", this.url);
        this.getHousingLocations();
    }

    // Return hard coded static list initilaized in this service
    async getHousingLocations(): Promise<HousingLocation[]> {
		const data = this.housingLocationList;
		return this.housingLocationList;
	}
    
    // NOTE: The following function is implemented using the APiHttp reusable common service, for which you just need to send the service base URL,
    // not the host and microservice URL. the Full URL is construted in the ApiHttp class.
    getHousingLocationsNew(): Observable<ApiResponse> {
        return this.apiHttp.getHouseMs<any>(this.serviceUrl)
                    .pipe(
                        map(response => new ApiResponse(response)) // ✅ Map to `ApiResponse`
                    );
	}

    // Use this function to get location from local server, host URL is configured in env file.
	async getAllHousingLocations(): Promise<HousingLocation[]> {
		const data = await fetch(this.url);
		return (await data.json()) ?? [];
	}
	
	async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
		const data = await fetch(`${this.url}/${id}`);
		return (await data.json()) ?? {};
	}

	submitApplication(firstName: string, lastName: string, email: string, houseId: number): Observable<any> {
        if(this.url.includes('3000')) {
            console.log(
                `Houses application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
              );
            return of(true);
        } else { //Submit to spring boot server
            return this.submitData(firstName, lastName, email, houseId);
        }
	}

    submitData(firstName: string, lastName: string, email: string, houseId: number): Observable<any> {
        // const requestBody = { data };
        const headers = {
            'Content-Type': 'application/json', // Ensure proper content type
        };
        
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            houseId: houseId
        };
      
        return this.http.post<string>(this.url+'/submit', body, { headers });
    }
}
