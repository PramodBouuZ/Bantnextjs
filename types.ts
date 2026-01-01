
export enum LeadStatus {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  QUALIFIED = 'QUALIFIED',
  ASSIGNED = 'ASSIGNED',
  IN_DISCUSSION = 'IN_DISCUSSION',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED'
}

export interface Lead {
  id: string;
  title: string;
  description: string;
  budget: string;
  authority: string;
  need: string;
  timing: string;
  status: LeadStatus;
  createdAt: string;
  posterName: string;
  posterEmail: string;
  posterMobile: string;
  location: string;
  companyName?: string;
  category: string;
  score: number;
  assignedVendors: string[];
  remarks: string;
  history: { status: LeadStatus; updatedAt: string; note: string }[];
}

export interface Product {
  id: string;
  // Added slug for SEO-friendly routing and fixed "Property 'slug' does not exist on type 'Product'" errors
  slug: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: string;
  category: string;
  rating: number;
  features: string[];
  imageUrl: string;
  images: string[];
  vendorId?: string;
  stockStatus: 'In Stock' | 'Limited' | 'Out of Stock';
  isActive: boolean;
  similarProducts?: string[]; // Array of product IDs
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  mobile: string;
  location: string;
  logo: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'REJECTED';
  services: string[];
  performanceScore: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  itemCount: number;
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
