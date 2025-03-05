import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './house/house.component';
import { HousingDetailsComponent } from './housing-details/housing-details.component';

const routes: Routes = [
    { 
        path: '', 
        component: HouseComponent
    },
    {   path: 'details/:id',      
        component: HousingDetailsComponent 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule { }
