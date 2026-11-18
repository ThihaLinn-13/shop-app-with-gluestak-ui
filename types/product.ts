export interface User {
  id: number;
}

export interface Color {
  id: number;
  name: string;
  bgColor: string;
  stock: boolean;
}

export interface Size {
  id: number;
  name: string;
  stock: boolean;
}

export interface ProductType {
  id: number;
  categories_id: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  users: User[];
  colors: Color[];
  sizes: Size[];
  description: string;
}
