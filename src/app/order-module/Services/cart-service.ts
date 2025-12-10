import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
  // In-memory cart items (replace with backend later)
  private cartItems: CartItem[] = [
    { restaurantId: 1, itemId: 103, name: "Veg Biryani", price: 220, quantity: 1, foodType: "Veg" },
    { restaurantId: 1, itemId: 104, name: "Mutton Rogan Josh", price: 350, quantity: 1, foodType: "NonVeg" },
    { restaurantId: 1, itemId: 105, name: "Butter Naan", price: 40, quantity: 4, foodType: "Veg" },
    { restaurantId: 1, itemId: 106, name: "Paneer Tikka", price: 180, quantity: 2, foodType: "Veg" },
    { restaurantId: 1, itemId: 107, name: "Fish Fry", price: 300, quantity: 1, foodType: "NonVeg" }
  ];

  // BehaviorSubject to hold cart count
  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  // Add item to cart
  addToCart(item: CartItem): Observable<CartItem> {
    this.cartItems.push(item);
    this.updateCount();
    return of(item); // simulate backend response
  }

  // Get all cart items
  getCart(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  // Update cart item
  updateCart(itemId: number, updatedItem: CartItem): Observable<CartItem> {
    const index = this.cartItems.findIndex(i => i.itemId === itemId);
    if (index !== -1) {
      this.cartItems[index] = updatedItem;
      this.updateCount();
    }
    return of(updatedItem);
  }

  // Remove cart item
  removeFromCart(itemId: number): Observable<void> {
    this.cartItems = this.cartItems.filter(i => i.itemId !== itemId);
    this.updateCount();
    return of(undefined);
  }

  // Helper: update cart count
  private updateCount() {
    this.cartCountSubject.next(this.getCartCount());
  }

  // Helper: calculate cart count (distinct items)
  private getCartCount(): number {
    return this.cartItems.length;
  }
}
