import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Restaurant {
  restaurants = [
{
  "id": 1,
  "name": "Spice Garden",
  "rating": 4.5,
  "address": "MG Road, Pune",
  "deliveryTime": "30-40 mins",
  "foodType": "veg",
  "description": "A cozy vegetarian restaurant serving authentic Indian flavors with quick delivery.",
  "menu": [
    { "id": 101, "name": "Paneer Butter Masala", "price": 250, "foodType": "Veg", "rating": 4.6, "image": "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a" },
    { "id": 102, "name": "Veg Biryani", "price": 200, "foodType": "Veg", "rating": 4.4, "image": "https://images.unsplash.com/photo-1630409346824-4f0e7b080087" },
    { "id": 103, "name": "Butter Naan", "price": 40, "foodType": "Veg", "rating": 4.3, "image": "https://images.unsplash.com/photo-1599232288126-7dbd2127db14" },
    { "id": 104, "name": "Dal Tadka", "price": 180, "foodType": "Veg", "rating": 4.5, "image": "https://images.unsplash.com/photo-1626500155537-93690c24099e" },
    { "id": 105, "name": "Chicken Curry", "price": 280, "foodType": "NonVeg", "rating": 4.2, "image": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d" },
    { "id": 106, "name": "Jeera Rice", "price": 120, "foodType": "Veg", "rating": 4.1, "image": "https://images.unsplash.com/photo-1733414717515-d997dafb7341" },
    { "id": 107, "name": "Gulab Jamun", "price": 90, "foodType": "Veg", "rating": 4.7, "image": "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12" },
    { "id": 108, "name": "Fish Fry", "price": 300, "foodType": "NonVeg", "rating": 4.5, "image": "https://images.unsplash.com/photo-1656389863341-1dfd38ee6edc" },
    { "id": 109, "name": "Mix Veg Curry", "price": 220, "foodType": "Veg", "rating": 4.2, "image": "https://images.unsplash.com/photo-1716959669858-11d415bdead6" },
    { "id": 110, "name": "Mutton Biryani", "price": 350, "foodType": "NonVeg", "rating": 4.6, "image": "https://images.unsplash.com/photo-1696265350630-efa107c33990" }
  ]
}
,
  {
    id: 2,
    name: 'Ocean Breeze',
    rating: 4.2,
    address: 'FC Road, Pune',
    deliveryTime: "30-40 mins",
    foodType: "veg",
    description: "A cozy vegetarian restaurant serving authentic Indian flavors with quick delivery.",
    menu: [
      { id: 201, name: 'Grilled Fish', price: 350 },
      { id: 202, name: 'Prawns Curry', price: 400 },
      { id: 203, name: 'Rice Plate', price: 120 },
      { id: 204, name: 'Fish Fry', price: 320 },
      { id: 205, name: 'Lemon Butter Fish', price: 380 },
      { id: 206, name: 'Crab Masala', price: 450 },
      { id: 207, name: 'Tawa Pomfret', price: 420 }
    ]
  },
  {
    id: 3,
    name: 'Pizza Hub',
    rating: 4.8,
    address: 'Baner, Pune',
    menu: [
      { id: 301, name: 'Margherita Pizza', price: 299 },
      { id: 302, name: 'Farmhouse Pizza', price: 399 },
      { id: 303, name: 'Garlic Bread', price: 150 },
      { id: 304, name: 'Veg Supreme Pizza', price: 449 },
      { id: 305, name: 'Cheese Burst Pizza', price: 499 },
      { id: 306, name: 'Tandoori Paneer Pizza', price: 459 },
      { id: 307, name: 'Choco Lava Cake', price: 129 }
    ]
  },
  {
    id: 4,
    name: 'Royal Tandoor',
    rating: 4.0,
    address: 'Kothrud, Pune',
    menu: [
      { id: 401, name: 'Chicken Tandoori', price: 320 },
      { id: 402, name: 'Mutton Rogan Josh', price: 450 },
      { id: 403, name: 'Tandoori Roti', price: 30 },
      { id: 404, name: 'Malai Tikka', price: 340 },
      { id: 405, name: 'Seekh Kebab', price: 360 },
      { id: 406, name: 'Butter Chicken', price: 370 },
      { id: 407, name: 'Nalli Nihari', price: 500 }
    ]
  },
  {
    id: 5,
    name: 'Green Leaf',
    rating: 4.3,
    address: 'JM Road, Pune',
    menu: [
      { id: 501, name: 'Greek Salad', price: 220 },
      { id: 502, name: 'Caesar Salad', price: 240 },
      { id: 503, name: 'Hummus & Pita', price: 180 },
      { id: 504, name: 'Quinoa Bowl', price: 260 },
      { id: 505, name: 'Falafel Wrap', price: 200 },
      { id: 506, name: 'Veg Buddha Bowl', price: 270 },
      { id: 507, name: 'Spinach Soup', price: 150 }
    ]
  },
  {
    id: 6,
    name: 'Urban Masala',
    rating: 4.6,
    address: 'Viman Nagar, Pune',
    menu: [
      { id: 601, name: 'Chicken Tikka Masala', price: 320 },
      { id: 602, name: 'Mutton Biryani', price: 380 },
      { id: 603, name: 'Butter Naan', price: 40 },
      { id: 604, name: 'Kadhai Paneer', price: 260 },
      { id: 605, name: 'Dal Makhani', price: 220 },
      { id: 606, name: 'Jeera Rice', price: 120 },
      { id: 607, name: 'Raita', price: 60 }
    ]
  },
  {
    id: 7,
    name: 'Golden Dragon',
    rating: 4.1,
    address: 'Camp, Pune',
    menu: [
      { id: 701, name: 'Chicken Manchurian', price: 280 },
      { id: 702, name: 'Hakka Noodles', price: 220 },
      { id: 703, name: 'Schezwan Fried Rice', price: 230 },
      { id: 704, name: 'Veg Spring Rolls', price: 180 },
      { id: 705, name: 'Kung Pao Chicken', price: 300 },
      { id: 706, name: 'Cantonese Chowmein', price: 240 },
      { id: 707, name: 'Honey Chili Potato', price: 190 }
    ]
  },
  {
    id: 8,
    name: 'Cafe Delight',
    rating: 4.7,
    address: 'Koregaon Park, Pune',
    menu: [
      { id: 801, name: 'Cappuccino', price: 160 },
      { id: 802, name: 'Iced Latte', price: 180 },
      { id: 803, name: 'Chocolate Brownie', price: 140 },
      { id: 804, name: 'Veg Sandwich', price: 150 },
      { id: 805, name: 'Pasta Alfredo', price: 280 },
      { id: 806, name: 'Pasta Arrabbiata', price: 270 },
      { id: 807, name: 'Cheesecake', price: 220 }
    ]
  },
  {
    id: 9,
    name: 'BBQ Nation',
    rating: 4.4,
    address: 'Senapati Bapat Road, Pune',
    menu: [
      { id: 901, name: 'BBQ Chicken Wings', price: 320 },
      { id: 902, name: 'Smoked Ribs', price: 520 },
      { id: 903, name: 'Grilled Paneer Skewers', price: 280 },
      { id: 904, name: 'Corn on the Cob', price: 150 },
      { id: 905, name: 'BBQ Veg Platter', price: 350 },
      { id: 906, name: 'Peri Peri Chicken', price: 360 },
      { id: 907, name: 'BBQ Garlic Bread', price: 160 }
    ]
  },
  {
    id: 10,
    name: 'Burger Shack',
    rating: 4.0,
    address: 'Aundh, Pune',
    menu: [
      { id: 1001, name: 'Classic Veg Burger', price: 160 },
      { id: 1002, name: 'Cheese Chicken Burger', price: 220 },
      { id: 1003, name: 'Double Patty Burger', price: 250 },
      { id: 1004, name: 'French Fries', price: 100 },
      { id: 1005, name: 'Onion Rings', price: 120 },
      { id: 1006, name: 'Chocolate Shake', price: 180 },
      { id: 1007, name: 'Strawberry Shake', price: 170 }
    ]
  },
  {
    id: 11,
    name: 'Tandoor Treats',
    rating: 4.2,
    address: 'Hinjewadi, Pune',
    menu: [
      { id: 1101, name: 'Tangdi Kebab', price: 300 },
      { id: 1102, name: 'Paneer Tikka', price: 260 },
      { id: 1103, name: 'Chicken Malai Tikka', price: 320 },
      { id: 1104, name: 'Roomali Roti', price: 35 },
      { id: 1105, name: 'Bhuna Gosht', price: 420 },
      { id: 1106, name: 'Tandoori Chicken Half', price: 220 },
      { id: 1107, name: 'Mint Chutney', price: 40 }
    ]
  },
  {
    id: 12,
    name: 'Royal Feast',
    rating: 4.5,
    address: 'Shivaji Nagar, Pune',
    menu: [
      { id: 1201, name: 'Shahi Paneer', price: 270 },
      { id: 1202, name: 'Mutton Korma', price: 480 },
      { id: 1203, name: 'Lachha Paratha', price: 45 },
      { id: 1204, name: 'Chicken Kadai', price: 340 },
      { id: 1205, name: 'Veg Pulao', price: 190 },
      { id: 1206, name: 'Rasmalai', price: 130 },
      { id: 1207, name: 'Boondi Raita', price: 70 }
    ]
  },
  {
    id: 13,
    name: 'Veggie Delight',
    rating: 4.3,
    address: 'Kalyani Nagar, Pune',
    menu: [
      { id: 1301, name: 'Veg Lasagna', price: 320 },
      { id: 1302, name: 'Stuffed Bell Peppers', price: 260 },
      { id: 1303, name: 'Grilled Veg Sandwich', price: 170 },
      { id: 1304, name: 'Tomato Basil Soup', price: 150 },
      { id: 1305, name: 'Zoodles in Pesto', price: 280 },
      { id: 1306, name: 'Veg Tacos', price: 220 },
      { id: 1307, name: 'Fruit Bowl', price: 160 }
    ]
  },
  {
    id: 14,
    name: 'Seafood Bay',
    rating: 4.6,
    address: 'Camp, Pune',
    menu: [
      { id: 1401, name: 'Butter Garlic Prawns', price: 420 },
      { id: 1402, name: 'Goan Fish Curry', price: 380 },
      { id: 1403, name: 'Calamari Rings', price: 340 },
      { id: 1404, name: 'Seafood Platter', price: 650 },
      { id: 1405, name: 'Fish Tacos', price: 300 },
      { id: 1406, name: 'Crab Garlic Masala', price: 520 },
      { id: 1407, name: 'Coconut Rice', price: 160 }
    ]
  },
  {
    id: 15,
    name: 'Italiano Pizza',
    rating: 4.7,
    address: 'Baner, Pune',
    menu: [
      { id: 1501, name: 'Quattro Formaggi', price: 499 },
      { id: 1502, name: 'Pepperoni Pizza', price: 520 },
      { id: 1503, name: 'Pesto Pasta', price: 320 },
      { id: 1504, name: 'Bruschetta', price: 190 },
      { id: 1505, name: 'Tiramisu', price: 250 },
      { id: 1506, name: 'Minestrone Soup', price: 180 },
      { id: 1507, name: 'Risotto Funghi', price: 360 }
    ]
  },
  {
    id: 16,
    name: 'Mughal Darbar',
    rating: 4.1,
    address: 'Kondhwa, Pune',
    menu: [
      { id: 1601, name: 'Hyderabadi Dum Biryani', price: 320 },
      { id: 1602, name: 'Nihari Gosht', price: 520 },
      { id: 1603, name: 'Galouti Kebab', price: 420 },
      { id: 1604, name: 'Warqi Paratha', price: 40 },
      { id: 1605, name: 'Shami Kebab', price: 360 },
      { id: 1606, name: 'Badam Kheer', price: 160 },
      { id: 1607, name: 'Mutton Paya', price: 500 }
    ]
  },
  {
    id: 17,
    name: 'Street Eats',
    rating: 4.0,
    address: 'Swargate, Pune',
    menu: [
      { id: 1701, name: 'Pav Bhaji', price: 140 },
      { id: 1702, name: 'Vada Pav', price: 40 },
      { id: 1703, name: 'Misal Pav', price: 120 },
      { id: 1704, name: 'Sev Puri', price: 90 },
      { id: 1705, name: 'Dabeli', price: 60 },
      { id: 1706, name: 'Tawa Pulao', price: 150 },
      { id: 1707, name: 'Kulfi', price: 80 }
    ]
  },
  {
    id: 18,
    name: 'Cafe Aroma',
    rating: 4.5,
    address: 'Koregaon Park, Pune',
    menu: [
      { id: 1801, name: 'Espresso', price: 120 },
      { id: 1802, name: 'Mocha', price: 180 },
      { id: 1803, name: 'Blueberry Muffin', price: 140 },
      { id: 1804, name: 'Veg Panini', price: 170 },
      { id: 1805, name: 'Banoffee Pie', price: 220 },
      { id: 1806, name: 'Herbed Garlic Bread', price: 140 },
      { id: 1807, name: 'Hot Chocolate', price: 160 }
    ]
  },
  {
    id: 19,
    name: 'Grill House',
    rating: 4.4,
    address: 'Magarpatta, Pune',
    menu: [
      { id: 1901, name: 'Grilled Chicken Steak', price: 380 },
      { id: 1902, name: 'BBQ Paneer Steak', price: 320 },
      { id: 1903, name: 'Mashed Potatoes', price: 160 },
      { id: 1904, name: 'Grilled Veg Platter', price: 300 },
      { id: 1905, name: 'Chicken Sausages', price: 240 },
      { id: 1906, name: 'Coleslaw', price: 120 },
      { id: 1907, name: 'Chicken Schnitzel', price: 360 }
    ]
  },
  {
    id: 20,
    name: 'Royal Curry',
    rating: 4.2,
    address: 'Hadapsar, Pune',
    menu: [
      { id: 2001, name: 'Korma Chicken', price: 340 },
      { id: 2002, name: 'Paneer Lababdar', price: 270 },
      { id: 2003, name: 'Garlic Naan', price: 45 },
      { id: 2004, name: 'Veg Kadai', price: 240 },
      { id: 2005, name: 'Chicken Handi', price: 360 },
      { id: 2006, name: 'Curd Rice', price: 120 },
      { id: 2007, name: 'Gajar Halwa', price: 150 }
    ]
  },
  {
    id: 21,
    name: 'Urban Tandoor',
    rating: 4.6,
    address: 'Wakad, Pune',
    menu: [
      { id: 2101, name: 'Afghani Chicken', price: 360 },
      { id: 2102, name: 'Paneer Achari Tikka', price: 280 },
      { id: 2103, name: 'Roomali Roti', price: 35 },
      { id: 2104, name: 'Chicken Reshmi Kebab', price: 340 },
      { id: 2105, name: 'Dal Bukhara', price: 240 },
      { id: 2106, name: 'Veg Tandoori Platter', price: 360 },
      { id: 2107, name: 'Phirni', price: 130 }
    ]
  },
  {
    id: 22,
    name: 'Desi Zaika',
    rating: 4.3,
    address: 'Nigdi, Pune',
    menu: [
      { id: 2201, name: 'Rajma Chawal', price: 190 },
      { id: 2202, name: 'Chole Bhature', price: 180 },
      { id: 2203, name: 'Aloo Paratha', price: 140 },
      { id: 2204, name: 'Kadhi Pakora', price: 170 },
      { id: 2205, name: 'Bhindi Masala', price: 180 },
      { id: 2206, name: 'Lassi', price: 100 },
      { id: 2207, name: 'Kheer', price: 120 }
    ]
  },
  {
    id: 23,
    name: 'Spicy Affair',
    rating: 4.1,
    address: 'Camp, Pune',
    menu: [
      { id: 2301, name: 'Spicy Chicken Curry', price: 340 },
      { id: 2302, name: 'Mirchi Paneer', price: 260 },
      { id: 2303, name: 'Masala Kulcha', price: 55 },
      { id: 2304, name: 'Schezwan Paneer', price: 280 },
      { id: 2305, name: 'Chili Garlic Noodles', price: 220 },
      { id: 2306, name: 'Spicy Veg Momos', price: 160 },
      { id: 2307, name: 'Red Hot Soup', price: 150 }
    ]
  },
  {
    id: 24,
    name: 'Punjabi Rasoi',
    rating: 4.5,
    address: 'Kothrud, Pune',
    menu: [
      { id: 2401, name: 'Amritsari Chole', price: 200 },
      { id: 2402, name: 'Butter Chicken', price: 360 },
      { id: 2403, name: 'Makki di Roti', price: 40 },
      { id: 2404, name: 'Sarson da Saag', price: 220 },
      { id: 2405, name: 'Paneer Tikka Masala', price: 280 },
      { id: 2406, name: 'Lachha Paratha', price: 45 },
      { id: 2407, name: 'Kesar Lassi', price: 120 }
    ]
  },
  {
    id: 25,
    name: 'South Spice',
    rating: 4.4,
    address: 'Karve Nagar, Pune',
    menu: [
      { id: 2501, name: 'Masala Dosa', price: 120 },
      { id: 2502, name: 'Idli Sambar', price: 100 },
      { id: 2503, name: 'Chicken Chettinad', price: 340 },
      { id: 2504, name: 'Prawn Gassi', price: 380 },
      { id: 2505, name: 'Curd Rice', price: 110 },
      { id: 2506, name: 'Appam with Stew', price: 180 },
      { id: 2507, name: 'Filter Coffee', price: 90 }
    ]
  },
  {
    id: 26,
    name: 'Chinese Wok',
    rating: 4.2,
    address: 'FC Road, Pune',
    menu: [
      { id: 2601, name: 'Triple Schezwan Rice', price: 260 },
      { id: 2602, name: 'Chicken Lollipop', price: 240 },
      { id: 2603, name: 'Veg Manchow Soup', price: 150 },
      { id: 2604, name: 'Paneer Chili', price: 260 },
      { id: 2605, name: 'Veg Momos', price: 160 },
      { id: 2606, name: 'Butter Garlic Noodles', price: 230 },
      { id: 2607, name: 'Honey Sesame Chicken', price: 300 }
    ]
  },
  {
    id: 27,
    name: 'Biryani House',
    rating: 4.6,
    address: 'Hadapsar, Pune',
    menu: [
      { id: 2701, name: 'Chicken Dum Biryani', price: 320 },
      { id: 2702, name: 'Mutton Dum Biryani', price: 420 },
      { id: 2703, name: 'Veg Dum Biryani', price: 280 },
      { id: 2704, name: 'Egg Biryani', price: 260 },
      { id: 2705, name: 'Raita', price: 60 },
      { id: 2706, name: 'Chicken 65', price: 260 },
      { id: 2707, name: 'Double Ka Meetha', price: 120 }
    ]
  },
  {
    id: 28,
    name: 'Cafe Mocha',
    rating: 4.3,
    address: 'Koregaon Park, Pune',
    menu: [
      { id: 2801, name: 'Cafe Mocha', price: 180 },
      { id: 2802, name: 'Hazelnut Latte', price: 190 },
      { id: 2803, name: 'Choco Chip Cookie', price: 90 },
      { id: 2804, name: 'Penne Arrabbiata', price: 270 },
      { id: 2805, name: 'Veg Wrap', price: 160 },
      { id: 2806, name: 'Tiramisu Slice', price: 220 },
      { id: 2807, name: 'Iced Americano', price: 160 }
    ]
  },
  {
    id: 29,
    name: 'Royal Zaika',
    rating: 4.1,
    address: 'Swargate, Pune',
    menu: [
      { id: 2901, name: 'Chicken Mughlai', price: 360 },
      { id: 2902, name: 'Paneer Pasanda', price: 280 },
      { id: 2903, name: 'Butter Roti', price: 25 },
      { id: 2904, name: 'Veg Jalfrezi', price: 240 },
      { id: 2905, name: 'Kashmiri Pulao', price: 260 },
      { id: 2906, name: 'Malai Kofta', price: 270 },
      { id: 2907, name: 'Kulfi Falooda', price: 150 }
    ]
  },
  {
    id: 30,
    name: 'Urban Eats',
    rating: 4.5,
    address: 'Viman Nagar, Pune',
    menu: [
      { id: 3001, name: 'Club Sandwich', price: 180 },
      { id: 3002, name: 'Cold Coffee', price: 120 },
      { id: 3003, name: 'French Fries', price: 100 },
      { id: 3004, name: 'Chicken Wrap', price: 220 },
      { id: 3005, name: 'Veg Loaded Fries', price: 140 },
      { id: 3006, name: 'BBQ Chicken Sandwich', price: 240 },
      { id: 3007, name: 'Oreo Shake', price: 170 }
    ]
  }
];


  getRestaurantById(id: number) {
    return this.restaurants.find(r => r.id === id);
  }
}
