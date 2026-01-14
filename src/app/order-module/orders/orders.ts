import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../Services/order-service';
import { OrderDto} from '../Services/orderModels';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {
  orders: OrderDto[] = [];
  loading = false;

  constructor(private store: OrderService, private router: Router,private cdr: ChangeDetectorRef,) {}

  ngOnInit() {
    this.loading = true;
    this.store.getOrders().subscribe(list => {
      console.log('Orders from backend:', list);
      this.orders = list;
      this.loading = false;
      this.cdr.markForCheck();
      
    });
  }

  // viewDetails(order: OrderDto) {
  //   console.log ("ABle to pass the order id"+order.orderId);
  //   // this.router.navigate(['/ordersdetails', order.orderId]);
  //   this.router.navigate(['/ordersdetails', order.orderId]);
  // }
viewDetails(order: OrderDto) {
  this.router.navigate(['/ordersdetails'], { queryParams: { id: order.orderId } });
}

  // itemsCount(order: OrderDto) {
  //   return (order.items ?? []).reduce((s, it) => s + it.quantity, 0);
  // }
}
