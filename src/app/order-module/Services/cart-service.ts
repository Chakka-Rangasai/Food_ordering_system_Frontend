import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment';
export interface CartItem {
  id?: number;
  restaurantId: number;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  foodType: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private readonly apiUrl = `${environment.apiUrl}/cart-api/cart`;

  constructor(private http: HttpClient) {} 
  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/add`, item).pipe(
      tap(() => this.updateCount())
    );
  }
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/user`).pipe(
      tap(items => {
        this.cartCountSubject.next(items.length); // Broadcast the new count
      })
    );
  }
  updateCartQuantity(dbId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/update/${dbId}`, { quantity }).pipe(
      tap(() => this.updateCount()) 
    );
  }
  private updateCount() {
    this.getCart().subscribe(items => {
        this.cartCountSubject.next(items.length);
    });
  }
  removeFromCart(dbId: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/remove/${dbId}`, { responseType: 'text' }).pipe(
    tap(() => this.updateCount()) 
  );
}
  clearCart(): Observable<string> {
  return this.http.delete(`${this.apiUrl}/clear`, { responseType: 'text' }).pipe(
    tap(() => {
      this.cartCountSubject.next(0);
    })
  );
}
  private getCartCount(): number {
    return this.cartItems.length;
  }
  clearInternalCart() {
  this.cartItems = [];
  this.cartCountSubject.next(0); 
}

refreshCartCount(): void {
    this.getCart().subscribe(items => {
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartCountSubject.next(count);
    });
  }

}





