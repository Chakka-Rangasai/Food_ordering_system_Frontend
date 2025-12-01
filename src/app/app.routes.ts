import { Routes } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Landing } from './home-module/landing/landing';
import { UserRegister } from './user-module/user-register/user-register';
import { UserLogin } from './user-module/user-login/user-login';
import { RestaurantList } from './restaurant-module/restaurant-list/restaurant-list';

export const routes: Routes = [
    { path:'',component:Landing},
    { path:'register',component:UserRegister},
    { path:'login',component:UserLogin},
    { path:'restaurantlist',component:RestaurantList}
];
