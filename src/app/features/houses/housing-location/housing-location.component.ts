import { Component, Inject, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HousingLocation } from '../../../data/models/housing-location';
import { Logger } from 'src/app/core/services';

@Component({
    selector: 'app-housing-location',
    templateUrl: './housing-location.component.html',
    styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
    @Input() housingLocation!: HousingLocation;

    constructor(private logger: Logger) {
        this.logger.log('Logger Test');
    }

}
