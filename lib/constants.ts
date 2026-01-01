
import { Product, Vendor, Category, Blog } from './types';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Software', icon: '💻', isActive: true, itemCount: 12 },
  { id: 'c2', name: 'Telecom', icon: '📞', isActive: true, itemCount: 8 },
  { id: 'c3', name: 'Hardware', icon: '🖥️', isActive: true, itemCount: 15 },
  { id: 'c4', name: 'Cloud', icon: '☁️', isActive: true, itemCount: 6 },
  { id: 'c5', name: 'Security', icon: '🛡️', isActive: true, itemCount: 4 }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Airtel Enterprise',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtel_logo-01.png',
    location: 'Gurgaon, HR',
    performanceScore: 92
  },
  {
    id: 'v2',
    name: 'Zoho Corp',
    logo: 'https://via.placeholder.com/150x50?text=Zoho',
    location: 'Chennai, TN',
    performanceScore: 95
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'enterprise-erp-suite',
    name: 'Enterprise ERP Suite',
    description: 'Complete cloud-based process automation for MSMEs.',
    fullDescription: 'Our Enterprise ERP Suite is designed specifically for Indian MSMEs to manage their end-to-end business processes. From inventory tracking to GST-compliant invoicing, everything is handled seamlessly.',
    price: '10,000',
    category: 'Software',
    rating: 4.8,
    features: ['GST Ready', 'Multi-tenant', 'Mobile App'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v2',
    stockStatus: 'In Stock',
    isActive: true,
  },
  {
    id: '2',
    slug: 'business-crm-pro',
    name: 'Business CRM Pro',
    description: 'Lead management and sales tracking for small teams.',
    fullDescription: 'Boost your sales productivity with CRM Pro. Features pipeline management, lead scoring, and automated follow-ups tailored for the Indian market.',
    price: '5,000',
    category: 'Software',
    rating: 4.6,
    features: ['Pipeline Management', 'WhatsApp Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v2',
    stockStatus: 'In Stock',
    isActive: true,
  },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'Modernizing Procurement with AI',
    slug: 'ai-procurement-2025',
    content: 'Full article content here...',
    category: 'Technology',
    publishedAt: '2025-05-01',
    metaDescription: 'Learn how AI is changing lead qualification.'
  }
];

export const VENDOR_LOGOS = MOCK_VENDORS.map(v => v.logo);
