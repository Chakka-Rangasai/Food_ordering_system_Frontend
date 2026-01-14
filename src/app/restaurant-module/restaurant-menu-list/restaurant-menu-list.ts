import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RestaurantsService } from '../services/restaurant';
import { CartService } from '../../order-module/Services/cart-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
 
export interface CartItem {
  restaurantId: number;
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  foodType: string;
}
 
type FoodTypeFilter = 'ALL' | 'VEG' | 'NON_VEG';
type PriceRange = '' | 'low' | 'medium' | 'high';
 
@Component({
  selector: 'app-restaurant-menu-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-menu-list.html',
  styleUrls: ['./restaurant-menu-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantMenuList {
  restaurant: any = null;
 
  /** Base menu loaded from API (kept untouched) */
  private originalMenu: any[] = [];
 
  /** Visible list after applying filters */
  filteredMenu: any[] = [];
 
  /** Show skeletons while loading */
  loading = true;
 
  /** Error text (404/500/CORS/etc.) */
  errorMsg = '';
 
  /** Backend returned no menu (null/undefined/[]) */
  menuEmpty = false;
 
  /** Skeleton card placeholders */
  skeletonCards = Array.from({ length: 6 });
 
  /** Filter state */
  selectedFoodType: FoodTypeFilter = 'ALL';
  selectedPrice: PriceRange = '';
  selectedMinRating: number | null = null;
 
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}
 
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const idParam = params['id'];
 
        // Start loading -> show skeleton
        this.loading = true;
        this.errorMsg = '';
        this.menuEmpty = false;
        this.cdr.markForCheck(); // OnPush: notify view
 
        if (!idParam || isNaN(+idParam)) {
          this.loading = false;
          this.errorMsg = 'Invalid or missing restaurant id in the URL.';
          this.restaurant = null;
          this.originalMenu = [];
          this.filteredMenu = [];
          this.menuEmpty = true;
          this.cdr.markForCheck();
          return;
        }
 
        const id = +idParam;
        const result = this.restaurantService.getRestaurantById(id);
 
        if (this.isObservable(result)) {
          (result as Observable<any>).subscribe({
            next: (rest) => {
              this.restaurant = rest || null;
 
              // Normalize menu
              this.originalMenu = Array.isArray(rest?.menu) ? [...rest.menu] : [];
              this.menuEmpty = this.originalMenu.length === 0;
 
              this.applyFilters();
 
              this.loading = false;
              this.errorMsg = this.restaurant ? '' : 'Restaurant not found.';
              this.cdr.markForCheck();
            },
            error: (err: HttpErrorResponse | any) => {
              console.error('Error loading restaurant:', err);
              this.loading = false;
              this.errorMsg = this.httpErrorToMessage(err);
              this.restaurant = null;
              this.originalMenu = [];
              this.filteredMenu = [];
              this.menuEmpty = true;
              this.cdr.markForCheck();
            }
          });
        } else {
          // Synchronous service (mock/in-memory)
          this.restaurant = result || null;
          this.originalMenu = Array.isArray(this.restaurant?.menu) ? [...this.restaurant.menu] : [];
          this.menuEmpty = this.originalMenu.length === 0;
 
          this.applyFilters();
 
          this.loading = false;
          this.errorMsg = this.restaurant ? '' : 'Restaurant not found.';
          this.cdr.markForCheck();
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to read route parameters.';
        this.menuEmpty = true;
        this.cdr.markForCheck();
      }
    });
  }
 
  // ---------- Filtering ----------
  private applyFilters(): void {
    if (this.menuEmpty) {
      this.filteredMenu = [];
      this.cdr.markForCheck();
      return;
    }
 
    let list = [...this.originalMenu];
 
    if (this.selectedFoodType !== 'ALL') {
      const ft = this.selectedFoodType; // 'VEG' or 'NON_VEG'
      list = list.filter(i => (i?.foodType ?? '').toUpperCase() === ft);
    }
 
    switch (this.selectedPrice) {
      case 'low':
        list = list.filter(i => this.num(i.price) <= 100);
        break;
      case 'medium':
        list = list.filter(i => {
          const p = this.num(i.price);
          return p >= 101 && p <= 250;
        });
        break;
      case 'high':
        list = list.filter(i => this.num(i.price) >= 251);
        break;
      default:
        break;
    }
 
    if (this.selectedMinRating !== null) {
      const min = this.num(this.selectedMinRating);
      list = list.filter(i => this.num(i.rating) >= min);
    }
 
    this.filteredMenu = list;
    this.cdr.markForCheck();
  }
 
  filterByType(type: 'Veg' | 'NonVeg'): void {
    if (this.menuEmpty) return;
    this.selectedFoodType = type === 'Veg' ? 'VEG' : 'NON_VEG';
    this.applyFilters();
  }
 
  filterByPrice(range: '' | 'low' | 'medium' | 'high'): void {
    if (this.menuEmpty) return;
    this.selectedPrice = range;
    this.applyFilters();
  }
 
  filterByRating(minRating: number): void {
    if (this.menuEmpty) return;
    this.selectedMinRating = minRating;
    this.applyFilters();
  }
 
  resetFilter(): void {
    if (this.menuEmpty) return;
    this.selectedFoodType = 'ALL';
    this.selectedPrice = '';
    this.selectedMinRating = null;
    this.applyFilters();
  }
 
  // ---------- Quantity & Cart ----------
  increaseQuantity(item: any): void {
    if (this.menuEmpty) return;
    const newQty = Math.min((item.quantity || 0) + 1, 5);
    this.originalMenu = this.originalMenu.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
    this.applyFilters();
  }
 
  decreaseQuantity(item: any): void {
    if (this.menuEmpty) return;
    const newQty = Math.max((item.quantity || 0) - 1, 0);
    this.originalMenu = this.originalMenu.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
    this.applyFilters();
  }
 
  addToCart(item: any): void {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    alert("Please login to add items to cart");
    return;
  }
  const cartItem: CartItem = {
    restaurantId: item.restaurantId,
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
 
  // ---------- Navigation ----------
  /** Back to restaurants listing page (adjust path if needed) */
  goBack(): void {
    this.router.navigate(['/restaurantlist']);
  }
 
  // ---------- Utils ----------
  private num(v: any, fallback = 0): number {
    const n = typeof v === 'number' ? v : parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }
 
  private isObservable(obj: any): boolean {
    return !!obj && typeof obj.subscribe === 'function';
  }
 
  private httpErrorToMessage(err: any): string {
    if (err?.status === 0) return 'Network error: server unreachable or CORS blocked.';
    if (err?.status === 401) return 'Un Authorized By using valid key only authorized';
    if (err?.status === 403) { // Use backend-provided message if available
     return err?.error || 'Access denied (403).'; }
    if (err?.status === 404) return 'Restaurant not found (404).';
    if (err?.status === 500) return 'Server error (500).';
    return 'An error occurred while fetching restaurant details.';
  }
 
  trackById(index: number, item: any): number {
    return item?.id ?? index;
  }
}