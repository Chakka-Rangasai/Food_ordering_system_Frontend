import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // <-- important
import { CartService } from '../Services/cart-service';

interface CartItem {
  restaurantId: number;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  foodType: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],   // <-- include FormsModule
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = [
      { restaurantId: 1, itemId: 103, name: "Veg Biryani", price: 220, quantity: 1, foodType: "Veg" },
      { restaurantId: 1, itemId: 104, name: "Mutton Rogan Josh", price: 350, quantity: 1, foodType: "NonVeg" },
      { restaurantId: 1, itemId: 105, name: "Butter Naan", price: 40, quantity: 4, foodType: "Veg" },
      { restaurantId: 1, itemId: 106, name: "Paneer Tikka", price: 180, quantity: 2, foodType: "Veg" },
      { restaurantId: 1, itemId: 107, name: "Fish Fry", price: 300, quantity: 1, foodType: "NonVeg" }
    ];
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeItem(item.itemId);
    } else {
      item.quantity = newQuantity;
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
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
    if (!this.deliveryAddress.name || !this.deliveryAddress.phone || !this.deliveryAddress.street || !this.deliveryAddress.pincode) {
      alert('Please fill in all delivery address details.');
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
