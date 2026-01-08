import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../Services/cart-service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders {
  
}