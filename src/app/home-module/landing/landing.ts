import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';

@Component({
  selector: 'app-landing',
  imports: [CommonModule,FormsModule,Header],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

categories = [
  { name: 'Veg Thali', image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80'},
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80' }
];
 


}
