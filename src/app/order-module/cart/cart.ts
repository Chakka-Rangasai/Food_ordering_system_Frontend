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
    this.loadCartData();
  }
  loadCartData(): void {
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log('Cart items loaded from backend:', items);
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.snackBar.open('Error loading cart. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
 updateQuantity(item: CartItem, change: number): void {
  const newQuantity = item.quantity + change;
  if (newQuantity <= 0) {
    if (item.id) this.removeItem(item.id);
  } else {
    this.cartService.updateCartQuantity(item.id!, newQuantity).subscribe({
      next: (res: CartItem) => {
        item.quantity = res.quantity;
        item.price = res.price; 
        console.log('Backend updated quantity and price:', res);
      },
      error: (err) => {
        this.snackBar.open('Update failed', 'Close', { duration: 2000 });
      }
    });
  }
}
 removeItem(dbId: number): void {
  this.cartService.removeFromCart(dbId).subscribe({
    next: (response) => {
      this.cartItems = this.cartItems.filter(item => item.id !== dbId);
      this.snackBar.open('Item removed successfully', 'Close', { 
        duration: 3000,
        verticalPosition: 'top' 
      });
      console.log(response);
    },
    error: (err) => {
      console.error('Delete failed', err);
      this.snackBar.open('Failed to remove item', 'Close', { duration: 3000 });
    }
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
    this.cartService.clearCart().subscribe({
    next: (response) => {
      this.cartItems = [];
      this.snackBar.open('✅ Order placed Successfully', 'Close', { 
        duration: 5000, 
        horizontalPosition: 'center', 
        verticalPosition: 'top'
      });

      console.log('Backend response:', response);
    },
    error: (err) => {
      console.error('Failed to clear cart after order:', err);
      alert('Order processed, but failed to clear cart in database.');
    }
  });
  }
}