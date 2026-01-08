import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../services/restaurant';
import { CartService } from '../../order-module/Services/cart-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
export interface CartItem {
  restaurantId: number;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  foodType: string;
}

@Component({
  selector: 'app-restaurant-menu-list',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './restaurant-menu-list.html',
  styleUrls: ['./restaurant-menu-list.css'],
})
export class RestaurantMenuList {
  restaurant: any;
  filteredMenu: any[] = [];
  selectedType = '';
  selectedPrice = '';
  selectedRating = 0;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: Restaurant,
    private cart: CartService,
    private snackBar:MatSnackBar
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      this.restaurant = this.restaurantService.getRestaurantById(id);
      this.filteredMenu = this.restaurant?.menu || [];
    });
  }
  increaseQuantity(item: any): void {
    if (!item.quantity) item.quantity = 0;
    if (item.quantity < 5) item.quantity++;
  }
  decreaseQuantity(item: any): void {
    if (item.quantity > 0) item.quantity--;
  }
 addToCart(item: any): void {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Please login to add items to cart");
    return;
  }
  const cartItem: CartItem = {
    restaurantId: this.restaurant.id,
    itemId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
    foodType: item.foodType
  };
this.cart.addToCart(cartItem).subscribe({
  next: (res) => {
    this.snackBar.open('Item added to cart!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  },
  error: (err) => {
    const errorMessage = err.error?.message || "You can only order from one restaurant at a time. Please clear your cart first.";
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['warning-snackbar'] 
    });
  }
});
}
  filterMenu(): void {
    this.filteredMenu = this.restaurant.menu.filter((item: any) => {
      if (this.selectedType && item.foodType !== this.selectedType) return false;
      if (this.selectedPrice === 'low' && item.price > 100) return false;
      if (this.selectedPrice === 'medium' && (item.price <= 100 || item.price > 250)) return false;
      if (this.selectedPrice === 'high' && item.price <= 250) return false;
      if (this.selectedRating > 0 && item.rating < this.selectedRating) return false;
      return true;
    });
  }
  filterByPrice(range: string): void {
    this.selectedPrice = range;
    this.filterMenu();
  }
  filterByRating(minRating: number): void {
    this.selectedRating = minRating;
    this.filterMenu();
  }
  filterByType(type: string): void {
    this.selectedType = type;
    this.filterMenu();
  }
  resetFilter(): void {
    this.selectedType = '';
    this.selectedPrice = '';
    this.selectedRating = 0;
    this.filteredMenu = this.restaurant.menu;
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
