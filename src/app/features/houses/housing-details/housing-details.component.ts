import {Component, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingDataService} from '../../../data/data-services/housing.data-service';
import {HousingLocation} from '../../../data/models/housing-location';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { PageRedirector } from 'src/app/core/services/page-redirector.service';
import { Notifier } from 'src/app/core/services/notifier.service';
import { Logger } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrl: './housing-details.component.css'
})
export class HousingDetailsComponent {
	route: ActivatedRoute = inject(ActivatedRoute);
	housingDataService = inject(HousingDataService);
    pageRedirector = inject(PageRedirector);
    
	housingLocation: HousingLocation | undefined;
    housingLocationId = 0;

	applyForm = new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		email: new FormControl(''),
	});

	constructor(private logger: Logger,
        private notifier: Notifier
    ) {
		// const housingLocationId = Number(this.route.snapshot.params['id']);
		// this.housingLocation = this.HousingDataService.getHousingLocationById(housingLocationId);
		this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
        this.logger.log('Housing Details ID: ', this.housingLocationId);
        // Testing page redirector
        if(this.housingLocationId >= 10) {
            // this.pageRedirector.redirectToApplicationError();
            this.notifier.error('The requested house is not available');
            this.logger.error('The requested house is not available');
            // this.pageRedirector.redirectToLogOut(); --Anu this works
            return;
        }

    	this.housingDataService.getHousingLocationById(this.housingLocationId)
            .then((housingLocation) => {
                this.housingLocation = housingLocation;
            });
	}

    // TODO: Add method to submit application so it gets saved in DB
	submitApplication() {
        const firstName = this.applyForm.value.firstName ?? '';
        const lastName = this.applyForm.value.lastName ?? '';
        const email = this.applyForm.value.email ?? '';
        const houseId = this.housingLocationId ?? 0;
		this.housingDataService.submitApplication(firstName, lastName, email, houseId)
            .subscribe({
                    next: (response) => {
                        if (response) {
                            this.notifier.success('Application submitted successfully');
                            console.log('Application submitted successfully:', response);
                        } else {
                            this.notifier.warning('No response received. Possible error occurred.');
                            console.warn('No response received. Possible error occurred.');
                        }
                    },
                    error: (error) => {
                        this.notifier.error('Unexpected error:', error);
                        console.error('Unexpected error:', error);
                    }
                });
	}
}
