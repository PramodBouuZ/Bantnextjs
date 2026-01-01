
export interface Product {
  id: string;
  slug: string; // Required for dynamic routing
  name: string;
  description: string;
  fullDescription?: string;
  // Fix: Add database schema fields to Product interface
  full_description?: string; 
  short_description?: string;
  price: string;
  category: string;
  rating: number;
  features: string[];
  imageUrl: string;
  // Fix: Add database schema image_url
  image_url?: string;
  images?: string[];
  vendorId?: string;
  stockStatus?: string;
  isActive: boolean;
  // Fix: Add database schema pricing_unit
  pricing_unit?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  itemCount: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location?: string;
  performanceScore?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  category?: string;
  publishedAt?: string;
  metaDescription?: string;
}
