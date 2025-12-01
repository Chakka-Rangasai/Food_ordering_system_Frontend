/*
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  imports: [FormsModule],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.css'],
})
export class RestaurantList {
  constructor(private router:Router){

  }
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 6; // number of restaurants per page

  // ✅ Expanded Mock Restaurant Data (30 entries)
restaurants = [
  { id: 1, name: 'Spice Garden', rating: 4.5, address: 'MG Road, Pune', deliveryTime: '30-40 mins', foodType: 'veg' },
  { id: 2, name: 'Ocean Breeze', rating: 4.2, address: 'FC Road, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 3, name: 'Pizza Hub', rating: 4.8, address: 'Baner, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 4, name: 'Royal Tandoor', rating: 4.0, address: 'Kothrud, Pune', deliveryTime: '35-45 mins', foodType: 'nonveg' },
  { id: 5, name: 'Green Leaf', rating: 4.3, address: 'JM Road, Pune', deliveryTime: '30-40 mins', foodType: 'veg' },
  { id: 6, name: 'Urban Masala', rating: 4.6, address: 'Viman Nagar, Pune', deliveryTime: '25-35 mins' },
  { id: 7, name: 'Golden Dragon', rating: 4.1, address: 'Camp, Pune', deliveryTime: '40-50 mins' },
  { id: 8, name: 'Cafe Delight', rating: 4.7, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins' },
  { id: 9, name: 'BBQ Nation', rating: 4.4, address: 'Senapati Bapat Road, Pune', deliveryTime: '35-45 mins' },
  { id: 10, name: 'Burger Shack', rating: 4.0, address: 'Aundh, Pune', deliveryTime: '25-35 mins' },
  { id: 11, name: 'Tandoor Treats', rating: 4.2, address: 'Hinjewadi, Pune', deliveryTime: '30-40 mins' },
  { id: 12, name: 'Royal Feast', rating: 4.5, address: 'Shivaji Nagar, Pune', deliveryTime: '25-35 mins' },
  { id: 13, name: 'Veggie Delight', rating: 4.3, address: 'Kalyani Nagar, Pune', deliveryTime: '20-30 mins' },
  { id: 14, name: 'Seafood Bay', rating: 4.6, address: 'Camp, Pune', deliveryTime: '40-50 mins' },
  { id: 15, name: 'Italiano Pizza', rating: 4.7, address: 'Baner, Pune', deliveryTime: '20-30 mins' },
  { id: 16, name: 'Mughal Darbar', rating: 4.1, address: 'Kondhwa, Pune', deliveryTime: '35-45 mins' },
  { id: 17, name: 'Street Eats', rating: 4.0, address: 'Swargate, Pune', deliveryTime: '25-35 mins' },
  { id: 18, name: 'Cafe Aroma', rating: 4.5, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins' },
  { id: 19, name: 'Grill House', rating: 4.4, address: 'Magarpatta, Pune', deliveryTime: '30-40 mins' },
  { id: 20, name: 'Royal Curry', rating: 4.2, address: 'Hadapsar, Pune', deliveryTime: '35-45 mins' },
  { id: 21, name: 'Urban Tandoor', rating: 4.6, address: 'Wakad, Pune', deliveryTime: '25-35 mins' },
  { id: 22, name: 'Desi Zaika', rating: 4.3, address: 'Nigdi, Pune', deliveryTime: '30-40 mins' },
  { id: 23, name: 'Spicy Affair', rating: 4.1, address: 'Camp, Pune', deliveryTime: '35-45 mins' },
  { id: 24, name: 'Punjabi Rasoi', rating: 4.5, address: 'Kothrud, Pune', deliveryTime: '25-35 mins' },
  { id: 25, name: 'South Spice', rating: 4.4, address: 'Karve Nagar, Pune', deliveryTime: '30-40 mins' },
  { id: 26, name: 'Chinese Wok', rating: 4.2, address: 'FC Road, Pune', deliveryTime: '25-35 mins' },
  { id: 27, name: 'Biryani House', rating: 4.6, address: 'Hadapsar, Pune', deliveryTime: '30-40 mins' },
  { id: 28, name: 'Cafe Mocha', rating: 4.3, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins' },
  { id: 29, name: 'Royal Zaika', rating: 4.1, address: 'Swargate, Pune', deliveryTime: '35-45 mins' },
  { id: 30, name: 'Urban Eats', rating: 4.5, address: 'Viman Nagar, Pune', deliveryTime: '25-35 mins' }
];

  // ✅ Filter + Pagination Logic
  get filteredRestaurants() {
    return this.restaurants.filter(r =>
      r.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredRestaurants.length / this.pageSize);
  }

  get paginatedRestaurants() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRestaurants.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  viewDetails(restaurant: any) {
    alert(`Opening details for ${restaurant.name}`);
    // Later: route to RestaurantDetailsComponent
     this.router.navigate(['/restaurantdetails'], { queryParams: { id: restaurant.id } });
  }
  
}
*/
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  imports: [FormsModule],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.css'],
})
export class RestaurantList {
  constructor(private router: Router) {}

  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 6;

  // 👇 Add this property (default to "both")
  selectedFoodType: string = 'both';

 restaurants = [
  { id: 1, name: 'Spice Garden', rating: 4.5, address: 'MG Road, Pune', deliveryTime: '30-40 mins', foodType: 'veg' },
  { id: 2, name: 'Ocean Breeze', rating: 4.2, address: 'FC Road, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 3, name: 'Pizza Hub', rating: 4.8, address: 'Baner, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 4, name: 'Royal Tandoor', rating: 4.0, address: 'Kothrud, Pune', deliveryTime: '35-45 mins', foodType: 'nonveg' },
  { id: 5, name: 'Green Leaf', rating: 4.3, address: 'JM Road, Pune', deliveryTime: '30-40 mins', foodType: 'veg' },
  { id: 6, name: 'Urban Masala', rating: 4.6, address: 'Viman Nagar, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 7, name: 'Golden Dragon', rating: 4.1, address: 'Camp, Pune', deliveryTime: '40-50 mins', foodType: 'nonveg' },
  { id: 8, name: 'Cafe Delight', rating: 4.7, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 9, name: 'BBQ Nation', rating: 4.4, address: 'Senapati Bapat Road, Pune', deliveryTime: '35-45 mins', foodType: 'both' },
  { id: 10, name: 'Burger Shack', rating: 4.0, address: 'Aundh, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 11, name: 'Tandoor Treats', rating: 4.2, address: 'Hinjewadi, Pune', deliveryTime: '30-40 mins', foodType: 'nonveg' },
  { id: 12, name: 'Royal Feast', rating: 4.5, address: 'Shivaji Nagar, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 13, name: 'Veggie Delight', rating: 4.3, address: 'Kalyani Nagar, Pune', deliveryTime: '20-30 mins', foodType: 'veg' },
  { id: 14, name: 'Seafood Bay', rating: 4.6, address: 'Camp, Pune', deliveryTime: '40-50 mins', foodType: 'nonveg' },
  { id: 15, name: 'Italiano Pizza', rating: 4.7, address: 'Baner, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 16, name: 'Mughal Darbar', rating: 4.1, address: 'Kondhwa, Pune', deliveryTime: '35-45 mins', foodType: 'nonveg' },
  { id: 17, name: 'Street Eats', rating: 4.0, address: 'Swargate, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 18, name: 'Cafe Aroma', rating: 4.5, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 19, name: 'Grill House', rating: 4.4, address: 'Magarpatta, Pune', deliveryTime: '30-40 mins', foodType: 'nonveg' },
  { id: 20, name: 'Royal Curry', rating: 4.2, address: 'Hadapsar, Pune', deliveryTime: '35-45 mins', foodType: 'both' },
  { id: 21, name: 'Urban Tandoor', rating: 4.6, address: 'Wakad, Pune', deliveryTime: '25-35 mins', foodType: 'nonveg' },
  { id: 22, name: 'Desi Zaika', rating: 4.3, address: 'Nigdi, Pune', deliveryTime: '30-40 mins', foodType: 'both' },
  { id: 23, name: 'Spicy Affair', rating: 4.1, address: 'Camp, Pune', deliveryTime: '35-45 mins', foodType: 'both' },
  { id: 24, name: 'Punjabi Rasoi', rating: 4.5, address: 'Kothrud, Pune', deliveryTime: '25-35 mins', foodType: 'nonveg' },
  { id: 25, name: 'South Spice', rating: 4.4, address: 'Karve Nagar, Pune', deliveryTime: '30-40 mins', foodType: 'veg' },
  { id: 26, name: 'Chinese Wok', rating: 4.2, address: 'FC Road, Pune', deliveryTime: '25-35 mins', foodType: 'both' },
  { id: 27, name: 'Biryani House', rating: 4.6, address: 'Hadapsar, Pune', deliveryTime: '30-40 mins', foodType: 'nonveg' },
  { id: 28, name: 'Cafe Mocha', rating: 4.3, address: 'Koregaon Park, Pune', deliveryTime: '20-30 mins', foodType: 'both' },
  { id: 29, name: 'Royal Zaika', rating: 4.1, address: 'Swargate, Pune', deliveryTime: '35-45 mins', foodType: 'nonveg' },
  { id: 30, name: 'Urban Eats', rating: 4.5, address: 'Viman Nagar, Pune', deliveryTime: '25-35 mins', foodType: 'both' }
];

  // ✅ Filter + Pagination Logic
  get filteredRestaurants() {
    return this.restaurants.filter(r =>
      r.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedFoodType === 'both' || r.foodType === this.selectedFoodType)
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredRestaurants.length / this.pageSize);
  }

  get paginatedRestaurants() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRestaurants.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  viewDetails(restaurant: any) {
    alert(`Opening details for ${restaurant.name}`);
    this.router.navigate(['/restaurantdetails'], { queryParams: { id: restaurant.id } });
  }
}
