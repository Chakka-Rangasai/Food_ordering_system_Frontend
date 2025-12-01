import { Routes } from '@angular/router';
import { Header } from './core/header/header';
import { Landing } from './home-module/landing/landing';
import { RestaurantList } from './restaurant-module/restaurant-list/restaurant-list';
import { RestaurantMenuList } from './restaurant-module/restaurant-menu-list/restaurant-menu-list';

export const routes: Routes = [

    {
        path:'header',component:Header
    },
    {
        path: '',component:Landing
    },
    {
        path: 'res',component:RestaurantList
    },
    {
        path:'restaurantdetails',component:RestaurantMenuList
    }
];
