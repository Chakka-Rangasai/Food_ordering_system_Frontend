import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  constructor(private http: HttpClient) {}

// This is the url with the api gateway integration
private readonly baseUrl = `${environment.apiUrl}/restaurant-api/restaurants`;

private readonly secondUrl =  `${environment.apiUrl}/restaurant-api/api/menuitems`;

  getRestaurants(opts: {
    search?: string;                  // optional
    type?: 'veg' | 'nonveg' | 'both';
    page?: number;                    // 0-based
    size?: number;
    sort?: string;                    // e.g., 'name,asc'
  }) {
    let params = new HttpParams()
      .set('type', (opts.type ?? 'both'))
      .set('page', String(opts.page ?? 0))
      .set('size', String(opts.size ?? 50))
    //   .set('sort', opts.sort ?? 'name,asc');

    const q = (opts.search ?? '').trim();
    if (q.length > 0) {
      params = params.set('search', q); // only send when non-empty
    }

  
    return this.http.get<any>(this.baseUrl, { params});
  }



getRestaurantById(restaurantId: number): Observable<any> {
  return this.http.get<any>(`${this.secondUrl}/${restaurantId}`);
}

}