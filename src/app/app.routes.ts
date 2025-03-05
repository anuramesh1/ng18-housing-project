import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/houses', pathMatch: 'full' },
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