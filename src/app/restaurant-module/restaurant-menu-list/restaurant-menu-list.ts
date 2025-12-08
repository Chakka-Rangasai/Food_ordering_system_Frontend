import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../services/restaurant';
import { CartService } from '../../order-module/Services/cart-service';


// Define a CartItem interface for type safety
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
  imports: [CommonModule],
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
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      this.restaurant = this.restaurantService.getRestaurantById(id);
      this.filteredMenu = this.restaurant?.menu || [];
    });
  }

  // Quantity controls
  increaseQuantity(item: any): void {
    if (!item.quantity) item.quantity = 0;
    if (item.quantity < 5) item.quantity++;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) item.quantity--;
  }

  // Add to cart (send to backend via service)
  addToCart(item: any): void {
    const cartItem: CartItem = {
      restaurantId: this.restaurant.id,
      itemId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      foodType: item.foodType
    };

    this.cart.addToCart(cartItem).subscribe({
      next: (res: any) => {
        console.log('Backend response:', res);
        alert(`${item.name} added to cart with quantity ${cartItem.quantity}`);
      },
      error: (err: any) => {
        console.error('Error sending to backend:', err);
        alert('Failed to add item to cart');
      }
    });
  }

  // Filtering logic
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
