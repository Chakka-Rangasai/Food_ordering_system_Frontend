import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CreateOrderRequest, OrderResponse ,OrderDto,OrderResponseDto, OrderCreatedResponse} from './orderModels';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  //This is the url related to order service in Backend.
  private readonly baseUrl = `${environment.apiUrl}/restaurant-order/orders`;
 
  private generateIdempotencyKey(): string {
    return `order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }


  createOrder(payload: CreateOrderRequest): Observable<OrderCreatedResponse> {
    const idempotencyKey = this.generateIdempotencyKey();

    return this.http
      .post<OrderResponse>(`${this.baseUrl}/user/create`, payload)
      .pipe(
        timeout(15000),
        catchError((err) => this.handleHttpError(err))
      );
  }


  //This is related to the errors that are comming form the Backend.
  private handleHttpError(error: HttpErrorResponse) {
    let message = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Network error: ${error.error.message}`;
    } else {
      const backendMsg = (error.error && (error.error.message || error.error.error)) || error.message;
      message = `${backendMsg}`;
    }
    console.error('[OrderService] HTTP Error:', error);
    return throwError(() => new Error(message));
  }

 
  public orders: OrderDto[]=[];

  getOrders( ): Observable<OrderDto[]> { 
    return this.http.get<OrderDto[]>(`${this.baseUrl}/all/orders`);
  }



  //This Backend Url is used to get the data of particular order by using order id.
  getOrderById(orderId: number): Observable<OrderResponseDto> 
  { 
    return this.http.get<OrderResponseDto>(`${this.baseUrl}/${orderId}`);
  }

}


