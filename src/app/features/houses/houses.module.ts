import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousesRoutingModule } from './houses-routing.module';
import { HouseComponent } from './house/house.component';
import { HousingLocationComponent } from './housing-location/housing-location.component';
import { HousingDetailsComponent } from './housing-details/housing-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
        HouseComponent,
        HousingLocationComponent,
        HousingDetailsComponent
  ],
  imports: [
    CommonModule,
    HousesRoutingModule,
    ReactiveFormsModule
  ]
})
export class HousesModule { }
