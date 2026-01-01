
export interface Product {
  id: string;
  name: string;
  description: string;
  /** Added fullDescription to fix error in app/products/[id]/page.tsx */
  fullDescription?: string;
  price: string;
  category: string;
  rating: number;
  features: string[];
  imageUrl: string;
  /** Added images for gallery support */
  images?: string[];
  /** Added vendorId to fix error in app/products/[id]/page.tsx */
  vendorId?: string;
  /** Added stockStatus */
  stockStatus?: string;
  isActive: boolean;
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
  /** Added location for display on product details */
  location?: string;
  /** Added performanceScore for trust badge */
  performanceScore?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  /** Added category for display on blog pages */
  category?: string;
  /** Added publishedAt for display on blog pages */
  publishedAt?: string;
  /** Added metaDescription for SEO and summaries */
  metaDescription?: string;
}
