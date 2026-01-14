import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../Services/cart-service';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../Services/order-service';
import { CreateOrderRequest } from '../Services/orderModels';
import { getOrCreateIdempotencyKey, clearIdempotencyKey, idempotencyKey } from '../utilis/idempotent';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true, // Assuming Angular 17+ based on 'imports' array
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  deliveryFee = 12;
  packingCost = 7;
  gstRate = 0.04;
  errorMsg = '';
  isPlacing = false;

  deliveryAddress = {
    name: '',
    phone: '',
    street: '',
    pincode: ''
  };

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(): void {
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log('Cart items loaded:', items);
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.snackBar.open('Error loading cart.', 'Close', { duration: 3000 });
      }
    });
  }

  // Keep temporary remove/update exactly as before
  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      if (item.id) this.removeItem(item.id);
    } else {
      this.cartService.updateCartQuantity(item.id!, newQuantity).subscribe({
        next: (res: CartItem) => {
          item.quantity = res.quantity;
          item.price = res.price;
        },
        error: (err) => this.snackBar.open('Update failed', 'Close', { duration: 2000 })
      });
    }
  }

  removeItem(dbId: number): void {
    this.cartService.removeFromCart(dbId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== dbId);
        this.snackBar.open('Item removed', 'Close', { duration: 3000, verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Failed to remove item', 'Close', { duration: 3000 })
    });
  }

  getItemsCost(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  getGST(): number {
    return this.getItemsCost() * this.gstRate;
  }

  getGrandTotal(): number {
    return this.getItemsCost() + this.deliveryFee + this.packingCost + this.getGST();
  }

  placeOrder() {
    // 1. Validation Logic
    if (!this.deliveryAddress.name || !this.deliveryAddress.phone || !this.deliveryAddress.street || !this.deliveryAddress.pincode) {
      this.snackBar.open('Please fill all delivery details.', 'Close', { duration: 5000, verticalPosition: 'top' });
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackBar.open('Your cart is empty.', 'Close', { duration: 5000, verticalPosition: 'top' });
      return;
    }

   
const key = getOrCreateIdempotencyKey('create-order');

    // 2) Build payload WITH idempotencyKey (no headers)
    // 2. Prepare Payload
    const payload: CreateOrderRequest = {
      deliveryAddress: this.deliveryAddress,
      items: this.cartItems.map(ci => ({
        restaurantId: ci.restaurantId,
        itemId: ci.itemId,
        name: ci.name,
        price: ci.price,
        quantity: ci.quantity
      })),
      totalAmount: parseFloat(this.getGrandTotal().toFixed(2)),
      idempotencyKey: key
    };

    this.isPlacing = true;

    // 3. Execution
    this.orderService.createOrder(payload).subscribe({
      next: (order) => {
        clearIdempotencyKey('create-order');
        
        // Success Logic: Clear cart and Navigate
        this.cartService.clearCart().subscribe({
          next: () => {
            this.cartItems = [];
            this.router.navigate(['/order-success'], { state: { order } });
          },
          error: (err) => {
            console.error('Order placed, but cart clear failed', err);
            this.router.navigate(['/order-success'], { state: { order } });
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Order failed:', err);
  
        // Keep the key in localStorage so user can retry without duplication
        
        
        this.snackBar.open(`${err.message}`, 'Close', {
          duration: 9000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.isPlacing = false;
        this.snackBar.open(`❌ Failed to place order: ${err.message}`, 'Close', { duration: 9000, verticalPosition: 'top' });
      },
      complete: () => {
        this.isPlacing = false;
      }
         


    });
  }
}