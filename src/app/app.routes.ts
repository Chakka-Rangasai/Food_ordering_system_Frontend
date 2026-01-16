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
import { OrderSuccessComponent } from './order-module/order-sucess/order-sucess';
import { OrderDetailsComponent } from './order-module/order-details/order-details';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './GuestGuard';


export const routes: Routes = [
    { path:'',component:Landing, canActivate:[GuestGuard]},
    { path:'register',component:UserRegister, canActivate:[GuestGuard]},
    { path:'login',component:UserLogin, canActivate:[GuestGuard]},
    { path:'restaurantlist',component:RestaurantList,canActivate:[AuthGuard]},
    {
        path:'restaurantdetails',component:RestaurantMenuList,canActivate:[AuthGuard]
    },
    
     {
        path:'ordersdetails',component:OrderDetailsComponent,canActivate:[AuthGuard]
    },
    
    {
        path:'orders',component:Orders,canActivate:[AuthGuard]
    },
    {
        path:'cart',component:Cart,canActivate:[AuthGuard]
    },
    {
        path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuard]
    }
];
