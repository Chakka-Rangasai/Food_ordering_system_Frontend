
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderResponse } from '../Services/orderModels';

const ORDER_CACHE_KEY = 'lastOrderResponse';
const AUTO_REDIRECT_SECONDS = 120;   // 2 minutes

interface CachedOrder {
  order: OrderResponse;
  expiresAt: number; // epoch ms
}

@Component({
  standalone: true,
  selector: 'app-order-success',
  imports: [CommonModule],
  templateUrl: './order-sucess.html',
  styleUrls: ['./order-sucess.css'],
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: OrderResponse | null = null;
  countdown = AUTO_REDIRECT_SECONDS;

  private tickId: number | null = null;
  private cleanupTimeoutId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 1) Try to get order from navigation state (when coming from Cart)
    const stateOrder = (history.state?.['order'] as OrderResponse | undefined) ?? null;
    const now = Date.now();

    if (stateOrder) {
      // If state exists, persist with a fresh expiry (safety)
      const cacheObj: CachedOrder = { order: stateOrder, expiresAt: now + AUTO_REDIRECT_SECONDS * 1000 };
      try {
        localStorage.setItem(ORDER_CACHE_KEY, JSON.stringify(cacheObj));
      } catch { /* ignore */ }
      this.order = stateOrder;
      this.countdown = AUTO_REDIRECT_SECONDS;
    } else {
      // 2) Fallback: localStorage (works on refresh)
      this.order = this.restoreFromCacheAndClampCountdown();
      if (!this.order) {
        // Nothing valid to show; go back to restaurant list
        this.router.navigate(['/restaurantlist']);
        return;
      }
    }

    // 3) Start countdown and auto-redirect
    this.tickId = window.setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.clearOrderCache();
        this.router.navigate(['/restaurantlist']);
      }
    }, 1000);

    // 4) Safety timeout in case interval is throttled
    this.cleanupTimeoutId = window.setTimeout(() => {
      this.clearOrderCache();
      this.router.navigate(['/restaurantlist']);
    }, AUTO_REDIRECT_SECONDS * 1000);
  }

  ngOnDestroy(): void {
    if (this.tickId !== null) {
      clearInterval(this.tickId);
      this.tickId = null;
    }
    if (this.cleanupTimeoutId !== null) {
      clearTimeout(this.cleanupTimeoutId);
      this.cleanupTimeoutId = null;
    }
  }

  goNow(): void {
    this.clearOrderCache();
    this.router.navigate(['/restaurantlist']);
  }

  /** Reads cached order; computes remaining countdown based on expiresAt. */
  private restoreFromCacheAndClampCountdown(): OrderResponse | null {
    try {
      const raw = localStorage.getItem(ORDER_CACHE_KEY);
      if (!raw) return null;

      const cached = JSON.parse(raw) as CachedOrder;
      if (!cached?.order || !cached?.expiresAt) return null;

      const now = Date.now();
      const msLeft = cached.expiresAt - now;
      if (msLeft <= 0) {
        // Expired
        this.clearOrderCache();
        return null;
      }

      // Clamp countdown to remaining seconds
      this.countdown = Math.ceil(msLeft / 1000);
      return cached.order;
    } catch {
      return null;
    }
  }

  private clearOrderCache(): void {
    try {
      localStorage.removeItem(ORDER_CACHE_KEY);
    } catch { /* ignore storage errors */ }
   }
  }