import { Routes } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Landing } from './home-module/landing/landing';
import { UserRegister } from './user-module/user-register/user-register';
import { UserLogin } from './user-module/user-login/user-login';
import { RestaurantList } from './restaurant-module/restaurant-list/restaurant-list';
import { RestaurantMenuList } from './restaurant-module/restaurant-menu-list/restaurant-menu-list';
import { Orders } from './order-module/orders/orders';
import { Cart } from './order-module/cart/cart';

export const routes: Routes = [
    { path:'',component:Landing},
    { path:'register',component:UserRegister},
    { path:'login',component:UserLogin},
    { path:'restaurantlist',component:RestaurantList},
    {
        path:'restaurantdetails',component:RestaurantMenuList
    },
    {
        path:'orders',component:Orders
    },
    {
        path:'cart',component:Cart
    }
];
