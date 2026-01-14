
import { Component, OnDestroy /* Optional: OnInit */ } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { RestaurantsService } from '../services/restaurant';

@Component({
  selector: 'app-restaurant-list',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.css'],
})
export class RestaurantList implements OnDestroy {
  constructor(
    private router: Router,
    private restaurantsService: RestaurantsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  // ---- UI State ----
  searchText: string = '';
  selectedFoodType: 'veg' | 'nonveg' | 'both' = 'both';

  currentPage: number = 1;             // 1-based page index for UI
  pageSize: number = 51;               // default page size
  pageSizeOptions: number[] = [51, 100, 200, 500, 1000]; // new

  totalPages: number = 0;
  totalElements: number = 0;

  // ---- Data & Flags ----
  restaurants: any[] = [];
  loading = true;
  errorMsg = '';

  // ---- Skeleton ----
  skeletonItems = Array.from({ length: 12 });

  // ---- Search stream ----
  private search$ = new Subject<string>();
  private sub = new Subscription();

  ngOnInit(): void {
    // 🔹 (Optional) Restore page size from localStorage
    const savedSize = localStorage.getItem('restaurants_page_size');
    if (savedSize) {
      const n = Number(savedSize);
      if (this.pageSizeOptions.includes(n)) {
        this.pageSize = n;
      }
    }

    // ✅ Initial fetch
    this.fetchRestaurants();

    // ✅ Debounced search
    this.sub.add(
      this.search$
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((text) => {
          this.searchText = text ?? '';
          this.currentPage = 1;
          this.fetchRestaurants();
        })
    );
     this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // ---- Core fetch ----
  private fetchRestaurants(): void {
    this.zone.run(() => {
      this.loading = true;
      this.errorMsg = '';
      this.cdr.markForCheck();
    });

    this.restaurantsService
      .getRestaurants({
        search: this.searchText,
        type: this.selectedFoodType,
        page: this.currentPage - 1, // backend expects 0-based
        size: this.pageSize,        //  uses the selected page size
        sort: 'name,asc',
      })
      .pipe(
        finalize(() => {
          this.zone.run(() => {
            this.loading = false;
            this.cdr.markForCheck();
            // this.cdr.detectChanges();  //This is also we can use but not recommended when the need initial refresh
          });
        })
      )
      .subscribe({
        next: (res: any) => {
          this.zone.run(() => {
            this.restaurants = Array.isArray(res?.content) ? res.content : [];
            this.totalPages = Number(res?.totalPages || Math.ceil((Number(res?.totalElements || 0)) / this.pageSize));
            this.totalElements = Number(res?.totalElements || 0);
            // this.cdr.detectChanges();
            this.cdr.markForCheck();
          });
        },
        error: (err: HttpErrorResponse | any) => {
          console.error('Failed to load restaurants', err);
          this.zone.run(() => {
            // this.errorMsg = 'Failed to load restaurants. Please try again.';
            this.loading = false;
            this.errorMsg = this.httpErrorToMessage(err);
            this.restaurants = [];
            this.totalPages = 0;
            this.totalElements = 0;
      const snackRef = this.snackBar.open(
          typeof err.error === 'string' ? err.error : this.errorMsg,
          'Close',
          {
            duration: 9000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );

    snackRef.onAction().subscribe(() => {
      // example: refresh page
      window.location.reload();
      this.router.navigate(['/restaurantlist']);
    });

            this.cdr.detectChanges();
            
          });
        },
      });
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
  // ---- Handlers ----
  onSearchInput(text: string): void {
    this.search$.next(text ?? '');
  }

  onTypeChange(): void {
    this.currentPage = 1;
    this.fetchRestaurants();
  }

  // 🔹 NEW: Page-size change handler
  onPageSizeChange(size: number): void {
    this.pageSize = Number(size);
    // (Optional) Persist choice
    localStorage.setItem('restaurants_page_size', String(this.pageSize));
    // Reset to first page and refetch
    this.currentPage = 1;
    this.fetchRestaurants();
  }

  // ---- Pagination ----
  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages || p === this.currentPage) return;
    this.currentPage = p;
    this.fetchRestaurants();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRestaurants();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRestaurants();
    }
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxButtons = 6;

    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

    const start = Math.max(1, current - 3);
    const normalizedStart = Math.max(1, Math.min(start, total - maxButtons + 1));
    return Array.from({ length: maxButtons }, (_, i) => normalizedStart + i);
  }

  // ---- Helpers ----
  formatRating(r: any): string {
    const n = typeof r === 'string' ? parseFloat(r) : r;
    if (isNaN(n)) return String(r ?? '');
    return Number(n).toFixed(1);
  }

  trackById = (_: number, r: any) => r?.id;

  viewDetails(restaurant: any): void {
    this.router.navigate(['/restaurantdetails'], { queryParams: { id: restaurant?.id } });
  }

  clearSearch(): void {
    if (!this.searchText) return;
    this.searchText = '';
    this.currentPage = 1;
    this.fetchRestaurants();
  }
}