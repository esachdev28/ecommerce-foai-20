export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  isBestseller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic College Hoodie",
    category: "Hoodies",
    price: 1499,
    image: "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=400&h=500&fit=crop",
    rating: 4.8,
    description: "Premium quality hoodie with college embroidery",
    isBestseller: true,
  },
  {
    id: 2,
    name: "Pride Graphic Tee",
    category: "T-Shirts",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4.6,
    description: "Comfortable cotton t-shirt with college logo",
  },
  {
    id: 3,
    name: "College Baseball Cap",
    category: "Accessories",
    price: 449,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop",
    rating: 4.5,
    description: "Adjustable baseball cap perfect for any occasion",
  },
  {
    id: 4,
    name: "Zip-Up Fleece Jacket",
    category: "Hoodies",
    price: 1999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop",
    rating: 4.9,
    description: "Warm and stylish fleece jacket for college",
    isBestseller: true,
  },
  {
    id: 5,
    name: "College Sweatpants",
    category: "Bottoms",
    price: 999,
    image: "https://images.unsplash.com/photo-1506629082632-11c6099d4033?w=400&h=500&fit=crop",
    rating: 4.7,
    description: "Comfortable and stylish sweatpants",
  },
  {
    id: 6,
    name: "Embroidered Polo",
    category: "T-Shirts",
    price: 799,
    image: "https://images.unsplash.com/photo-1578689998416-2dfa387d27bb?w=400&h=500&fit=crop",
    rating: 4.4,
    description: "Classic polo shirt with college crest",
  },
  {
    id: 7,
    name: "College Tote Bag",
    category: "Accessories",
    price: 599,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    rating: 4.5,
    description: "Spacious tote bag for books and essentials",
  },
  {
    id: 8,
    name: "Varsity Bomber Jacket",
    category: "Hoodies",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop",
    rating: 4.8,
    description: "Bold varsity style bomber jacket",
    isBestseller: true,
  },
];

export const CATEGORIES = ["All", "Hoodies", "T-Shirts", "Bottoms", "Accessories"];
