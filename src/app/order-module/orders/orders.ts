import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders {
  orders = [
    {
      orderId: 'ORD-1001',
      restaurantId: 1,
      name: 'Veg Biryani',
      price: 220,
      quantity: 1,
      foodType: 'Veg',
      dateTime: new Date('2025-12-08T11:30:00')
    },
    {
      orderId: 'ORD-1002',
      restaurantId: 1,
      name: 'Paneer Butter Masala',
      price: 280,
      quantity: 1,
      foodType: 'Veg',
      dateTime: new Date('2025-12-08T12:00:00')
    },
    {
      orderId: 'ORD-1003',
      restaurantId: 2,
      name: 'Chicken Curry',
      price: 350,
      quantity: 2,
      foodType: 'NonVeg',
      dateTime: new Date('2025-12-08T13:15:00')
    },
    {
      orderId: 'ORD-1004',
      restaurantId: 3,
      name: 'Grilled Sandwich',
      price: 150,
      quantity: 3,
      foodType: 'Veg',
      dateTime: new Date('2025-12-08T14:45:00')
    }
  ];
 
  expandedRestaurant: number | null = null;
 
  get groupedOrders() {
    const groups: { [key: number]: any[] } = {};
    for (const order of this.orders) {
      if (!groups[order.restaurantId]) {
        groups[order.restaurantId] = [];
      }
      groups[order.restaurantId].push(order);
    }
    return Object.entries(groups).map(([id, orders]) => ({
      restaurantId: +id,
      orderId: orders[0].orderId,
      orders
    }));
  }
 
  toggleRestaurant(id: number) {
    this.expandedRestaurant = this.expandedRestaurant === id ? null : id;
  }
}
 