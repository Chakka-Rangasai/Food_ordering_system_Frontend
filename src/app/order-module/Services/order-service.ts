
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CreateOrderRequest, OrderResponse ,OrderDto,OrderResponseDto, OrderCreatedResponse} from './orderModels';

const API_BASE = 'http://localhost:8080/restaurant-order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE}/orders/user/3`;

  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  createOrder(payload: CreateOrderRequest): Observable<OrderCreatedResponse> {
    const idempotencyKey = this.generateIdempotencyKey();
    const headers = this.jsonHeaders.set('Idempotency-Key', idempotencyKey);

    return this.http
      .post<OrderResponse>(this.baseUrl, payload, { headers })
      .pipe(
        timeout(15000),
        catchError((err) => this.handleHttpError(err))
      );
  }

  private handleHttpError(error: HttpErrorResponse) {
    let message = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Network error: ${error.error.message}`;
    } else {
      const backendMsg = (error.error && (error.error.message || error.error.error)) || error.message;
      message = `Server error (${error.status}): ${backendMsg}`;
    }
    console.error('[OrderService] HTTP Error:', error);
    return throwError(() => new Error(message));
  }

  private generateIdempotencyKey(): string {
    return `order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }


  public orders: OrderDto[]=[];

  getOrders( ): Observable<OrderDto[]> { 
    return this.http.get<OrderDto[]>(`${API_BASE}/orders/all/orders`);
   }

private secondUrl = 'http://localhost:8080/restaurant-order/orders';

  getOrderById(orderId: number): Observable<OrderResponseDto> 
  { 
    return this.http.get<OrderResponseDto>(`${this.secondUrl}/${orderId}`);
  }

}


