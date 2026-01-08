import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');

    // use this for the future to should not send the token to the particular use this approach 

    // const publicEndpoints = [ '/restaurant-api','/users'];
    // if (publicEndpoints.some(endpoint => req.url.includes(endpoint))) { 
    //     return next.handle(req);
    //  }




//This is for the single endpoint if there are multiple endpoints that does not requried the use above approach.
    //  if (req.url.includes('/restaurant-api/restaurants')) {
    //      return next.handle(req);
    //     }

    

    if (token) {
      console.log('Attaching token:', token);
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
