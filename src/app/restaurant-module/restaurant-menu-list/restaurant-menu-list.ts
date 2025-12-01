import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Restaurant } from '../services/restaurant';

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
  selectedType: string = '';   //vg or non veg
  selectedPrice: string = '';  // low / medium / high / ''
  selectedRating: number = 0;  // minimum rating filter

  constructor(private route: ActivatedRoute, private restaurantService: Restaurant) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      this.restaurant = this.restaurantService.getRestaurantById(id);
      this.filteredMenu = this.restaurant?.menu || [];
    });
  }

  // Quantity controls
  increaseQuantity(item: any) {
    if (!item.quantity) item.quantity = 0;
    if (item.quantity < 5) item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 0) item.quantity--;
  }

  addToCart(item: any) {
    alert(`${item.name} added to cart with quantity ${item.quantity}`);
  }

  // Filtering logic
  filterMenu() {
    this.filteredMenu = this.restaurant.menu.filter((item: any) => {
      // Food type filter
      if (this.selectedType && item.foodType !== this.selectedType) return false;

      // Price filter
      if (this.selectedPrice === 'low' && item.price > 100) return false;
      if (this.selectedPrice === 'medium' && (item.price <= 100 || item.price > 250)) return false;
      if (this.selectedPrice === 'high' && item.price <= 250) return false;

      // Rating filter
      if (this.selectedRating > 0 && item.rating < this.selectedRating) return false;

      return true;
    });
  }

  // Dropdown handlers
  filterByPrice(range: string) {
    this.selectedPrice = range;
    this.filterMenu();
  }

  filterByRating(minRating: number) {
    this.selectedRating = minRating;
    this.filterMenu();
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.filterMenu();
  }

  resetFilter() {
    this.selectedType = '';
    this.selectedPrice = '';
    this.selectedRating = 0;
    this.filteredMenu = this.restaurant.menu;
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
