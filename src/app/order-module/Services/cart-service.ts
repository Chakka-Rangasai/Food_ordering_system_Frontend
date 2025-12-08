import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface for cart items
export interface CartItem {
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
  private apiUrl = 'https://dummyapi.com/cart'; // replace with real backend URL

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(item: CartItem): Observable<CartItem> {
    console.log('Sending to backend:', item);
    return this.http.post<CartItem>(this.apiUrl, item);
  }

  // Get all cart items
  getCart(): Observable<CartItem[]> {
    console.log('Fetching cart items...');
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  // Update cart item
  updateCart(itemId: number, updatedItem: CartItem): Observable<CartItem> {
    console.log(`Updating item ${itemId}`, updatedItem);
    return this.http.put<CartItem>(`${this.apiUrl}/${itemId}`, updatedItem);
  }

  // Remove cart item
  removeFromCart(itemId: number): Observable<void> {
    console.log(`Removing item ${itemId}`);
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}
