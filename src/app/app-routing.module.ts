import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SelectivePreloadStrategy } from "./core/routing/selective-preloading-strategy";
import { HousingDetailsComponent } from "./features/houses/housing-details/housing-details.component";

const routes: Routes = [
    { path: '', redirectTo: '/books' },
    { 
        path: 'customers', 
        loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule)
    },
    { 
        path: 'books', 
        loadChildren: () => import('./features/books/books.module').then(m => m.BooksModule)
    },
    { 
        path: 'houses', 
        loadChildren: () => import('./features/houses/houses.module').then(m => m.HousesModule)
    }
    // {
    //     path: '404',
    //     component: PageNotFoundViewComponent
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes/*, {
            useHash: true,
            preloadingStrategy: SelectivePreloadStrategy
         }*/)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }