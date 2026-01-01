
export interface Product {
  id: string;
  slug: string; // Required for SEO-friendly dynamic routing
  name: string;
  description: string;
  fullDescription?: string;
  full_description?: string; 
  short_description?: string;
  price: string;
  category: string;
  rating: number;
  features: string[];
  imageUrl: string;
  image_url?: string;
  images?: string[];
  vendorId?: string;
  stockStatus: 'In Stock' | 'Limited' | 'Out of Stock';
  isActive: boolean;
  pricing_unit?: string;
  similarProducts?: string[]; 
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
  contactPerson?: string;
  email?: string;
  mobile?: string;
  logo: string;
  location?: string;
  status?: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'REJECTED';
  services?: string[];
  performanceScore?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface GlobalSettings {
  siteLogo: string;
  favicon: string;
  whatsappNumber: string;
  footerText: string;
  headerPromo: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  notifications: {
    newLead: boolean;
    leadAssigned: boolean;
    vendorResponse: boolean;
    statusUpdate: boolean;
  };
}
