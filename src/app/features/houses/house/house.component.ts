import {Component, inject} from '@angular/core';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../../../data/models/housing-location';
import {HousingDataService} from '../../../data/data-services/housing.data-service';
import { Notifier } from 'src/app/core/services/notifier.service';
import { ApiResponse } from 'src/app/core/api/api-response';

@Component({
  selector: 'app-house',
  // standalone: true,
  // imports: [CommonModule, HousingLocationComponent],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {

	readonly baseUrl = '../../../assets/';
	housingLocationList: HousingLocation[] = [];
	filteredLocationList: HousingLocation[] = [];
	
	housingDataService: HousingDataService = inject(HousingDataService);
  	
	constructor(private notifier: Notifier) {
        // Static collection
        /* this.HousingDataService.getHousingLocations()
            .then((housingLocationList: HousingLocation[]) => {
                this.housingLocationList = housingLocationList;
                this.filteredLocationList = housingLocationList;
            }); */

        // Getting list from JSON server  
    	this.housingDataService.getAllHousingLocations()
            .then((housingLocationList: HousingLocation[]) => {
			    this.housingLocationList = housingLocationList;
			    this.filteredLocationList = housingLocationList;
		    });
  	}

	filterResults(text: string) {
		if (!text) {
			this.filteredLocationList = this.housingLocationList;
			return;
		}
		this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
			housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
		);

		console.log('Filtered results:' + this.filteredLocationList);
	}

    
    showSuccess() {
       this.notifier.success('Hello world!', 'Toastr fun!');
    }

    showError() {
       this.notifier.error('Oops, something went wrong!', 'Error');
    }


}
