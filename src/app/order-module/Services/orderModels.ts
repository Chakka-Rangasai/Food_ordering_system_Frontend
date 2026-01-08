
export interface DeliveryAddress {
  name: string;
  phone: string;
  street: string;
  pincode: string;
}

/** Payload we send to backend (NO restaurantId) */
export interface CreateOrderRequest {
  deliveryAddress: DeliveryAddress;
  items: {
    restaurantId: number;
    itemId: number;  // backend expects menuItemId
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  idempotencyKey: string;
}

/** Response item */
export interface OrderItemResponse {
  orderItemId: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
}

/** Backend response after placing order */
export interface OrderResponse {
  orderId: number;
  userId: number;
  restaurantId: number; // sent by backend
  status: 'PENDING' | 'PLACED' | 'FAILED' | 'PENDING_PAYMENT';
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  createdAt: string;
  updatedAt: string;
  idempotencyKey: string | null;
  items: OrderItemResponse[];
}


// {
//         "orderId": 38,
//         "restaurantName": "The Green Spoon",
//         "restaurantLocation": "500 Central Ave, Silicon Valley",
//         "items": 5,
//         "status": "PENDING",
//         "totalAmount": 1464.60,
//         "createdAt": "2026-01-05T17:46:57.413910Z",
//         "updatedAt": "2026-01-05T17:46:57.382078Z"
//     },

export interface OrderDto {
  orderId: number;
  restaurantName:string;
  restaurantLocation:string;
  items:number;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderResponseDto {
  orderId: number;
  restaurantName:string;
  restaurantLocation:string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  deliveryAddress?: DeliveryAddress;
  items?: OrderItemResponse[];
}


