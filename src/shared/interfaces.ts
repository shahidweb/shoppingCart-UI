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