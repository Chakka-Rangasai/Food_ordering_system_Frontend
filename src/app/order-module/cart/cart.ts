
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../Services/cart-service';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../Services/order-service';
import { CreateOrderRequest } from '../Services/orderModels';
import {getOrCreateIdempotencyKey,clearIdempotencyKey,idempotencyKey } from '../utilis/idempotent';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cart',
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
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  // Keep temporary remove/update exactly as before
  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeItem(item.itemId);
    } else {
      const updatedItem = { ...item, quantity: newQuantity };
      this.cartService.updateCart(item.itemId, updatedItem).subscribe(() => {
        item.quantity = newQuantity;
      });
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
    });
  }

  getItemsCost(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getGST(): number {
    return this.getItemsCost() * this.gstRate;
  }

  getGrandTotal(): number {
    return this.getItemsCost() + this.deliveryFee + this.packingCost + this.getGST();
  }

  placeOrder() {
    // Validations
    if (!this.deliveryAddress.name ||
        !this.deliveryAddress.phone ||
        !this.deliveryAddress.street ||
        !this.deliveryAddress.pincode) {
      this.snackBar.open('Please fill all delivery address details.', 'Close', {
        duration: 9000, horizontalPosition: 'center', verticalPosition: 'top'
      });
      return;
    }

    if (this.deliveryAddress.phone.length !== 10 || !/^\d{10}$/.test(this.deliveryAddress.phone)) {
      this.snackBar.open('Phone number must be 10 digits.', 'Close', {
        duration: 9000, horizontalPosition: 'center', verticalPosition: 'top'
      });
      return;
    }

    if (this.deliveryAddress.pincode.length !== 6 || !/^\d{6}$/.test(this.deliveryAddress.pincode)) {
      this.snackBar.open('Pincode must be 6 digits.', 'Close', {
        duration: 9000, horizontalPosition: 'center', verticalPosition: 'top'
      });
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackBar.open('Your cart is empty.', 'Close', {
        duration: 6000, horizontalPosition: 'center', verticalPosition: 'top'
      });
      return;
    }

   
const key = getOrCreateIdempotencyKey('create-order');

    // 2) Build payload WITH idempotencyKey (no headers)
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

      // include in payload
      idempotencyKey: key
    };

    console.log('[Cart] Sending order payload:', payload);
    console.log('[Cart] Dummy idempotencyKey() returns:', idempotencyKey('create-order'));

    this.isPlacing = true;
   

    this.orderService.createOrder(payload).subscribe({
      next: (order) => {
        console.log('Order placed:', order);

        // Clear the key AFTER a successful placement
        clearIdempotencyKey('create-order');

        // Optionally: pre-generate next key for next order attempt (not required)
        // getOrCreateIdempotencyKey('create-order');

        // Navigate with state
        this.router.navigate(['/order-success'], { state: { order } });
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
      },
      complete: () => {
        this.isPlacing = false;
      }
         


    });
  }
}
