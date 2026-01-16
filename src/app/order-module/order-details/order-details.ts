import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponseDto } from '../Services/orderModels';
import { OrderService } from '../Services/order-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnInit {
  order?: OrderResponseDto;
  loading = false;
  errorMessage?: string; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id')); // expects ?id=123
    if (!id) {
      this.errorMessage = 'Order ID not provided in query params.';
      return;
    }

    this.loading = true;
    this.orderService.getOrderById(id).subscribe({
      next: (o) => {
        this.order = o;
        this.loading = false;
        this.errorMessage = undefined;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load order details', err);
        this.loading = false;
        // backend sends {status, message}
        this.errorMessage = err.error?.message || 'Something went wrong while fetching order.';
        this.cdr.markForCheck();
      }
    });
  }

  back(): void {
    this.router.navigate(['/orders']);
  }

  orderItemsTotal(): number {
    return (this.order?.items ?? []).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  timelineSteps(order: OrderResponseDto | undefined): { label: string; done: boolean }[] {
    if (!order) return [];

    const steps = [
      { label: 'Order Placed', done: true },
      { label: 'Preparing', done: false },
      { label: 'Out for Delivery', done: false },
      { label: 'Delivered', done: false }
    ];

    switch (order.status) {
      case 'PLACED': break;
      case 'PREPARING': steps[1].done = true; break;
      case 'OUT_FOR_DELIVERY': steps[1].done = true; steps[2].done = true; break;
      case 'DELIVERED': steps.forEach(step => (step.done = true)); break;
      default: console.warn('Unknown order status:', order.status); break;
    }

    return steps;
  }
}
