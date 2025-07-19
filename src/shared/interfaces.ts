export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  description?: string;
  price: number;
}

export interface IAdminOrder {
  id: number;
  email:string;
  address: string;
  card_last4: string;
  total_amount: string;
  status: string;
  payment: string;
  created_at: string;
}
