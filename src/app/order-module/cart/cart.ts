import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../Services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, MatSnackBarModule,RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];

  deliveryFee = 12;
  packingCost = 7;
  gstRate = 0.04;

  deliveryAddress = {
    name: '',
    phone: '',
    street: '',
    pincode: ''
  };

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Load cart items from backend via CartService
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

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
    // Validation with snackbar
    if (!this.deliveryAddress.name ||
        !this.deliveryAddress.phone ||
        !this.deliveryAddress.street ||
        !this.deliveryAddress.pincode) {
      this.snackBar.open('Please fill all delivery address details.', 'Close', { duration: 9000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }

    if (this.deliveryAddress.phone.length !== 10 || !/^\d{10}$/.test(this.deliveryAddress.phone)) {
      this.snackBar.open('Phone number must be 10 digits.', 'Close', {
        duration: 9000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    if (this.deliveryAddress.pincode.length !== 6 || !/^\d{6}$/.test(this.deliveryAddress.pincode)) {
      this.snackBar.open('Pincode must be 6 digits.', 'Close', { duration: 9000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }

    console.log('Order placed:', {
      items: this.cartItems,
      total: this.getGrandTotal(),
      deliveryAddress: this.deliveryAddress
    });

    alert('✅ Order placed successfully!');
  }
}
