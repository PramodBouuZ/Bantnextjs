
import { LeadStatus, Product, Blog, Category, Vendor, Lead } from './types';

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
    contactPerson: 'Amit Kumar',
    email: 'amit@airtel.in',
    mobile: '+91 99001 22334',
    location: 'Gurgaon, HR',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtel_logo-01.png',
    status: 'ACTIVE',
    services: ['Telecom', 'Cloud'],
    performanceScore: 92
  },
  {
    id: 'v2',
    name: 'Zoho Corp',
    contactPerson: 'Sridhar V',
    email: 'sridhar@zoho.com',
    mobile: '+91 88776 55443',
    location: 'Chennai, TN',
    logo: 'https://via.placeholder.com/150x50?text=Zoho',
    status: 'ACTIVE',
    services: ['Software'],
    performanceScore: 95
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'L-001',
    title: 'Cloud ERP for 50 Users',
    description: 'Require a cloud-based ERP solution for a manufacturing unit in Pune.',
    budget: 'Medium',
    authority: 'Decision Maker',
    need: 'Automation of inventory and production tracking',
    timing: 'Next 3 Months',
    status: LeadStatus.NEW,
    createdAt: '2025-05-10T10:00:00Z',
    posterName: 'Vikas Patil',
    posterEmail: 'vikas@pune-mfg.com',
    posterMobile: '+91 98220 12345',
    location: 'Pune, Maharashtra',
    companyName: 'Pune Manufacturing Co.',
    category: 'Software',
    score: 85,
    assignedVendors: [],
    remarks: '',
    history: [{ status: LeadStatus.NEW, updatedAt: '2025-05-10T10:00:00Z', note: 'Lead created via portal' }]
  },
  {
    id: 'L-002',
    title: 'Dedicated ILL 100Mbps',
    description: 'Dual gateway internet lease line for tech startup.',
    budget: 'High',
    authority: 'Influencer',
    need: 'Stable internet with 1:1 contention ratio',
    timing: 'Immediate',
    status: LeadStatus.ASSIGNED,
    createdAt: '2025-05-09T14:30:00Z',
    posterName: 'Ananya Roy',
    posterEmail: 'ananya@techflow.io',
    posterMobile: '+91 91100 98765',
    location: 'Bangalore, KA',
    companyName: 'TechFlow Solutions',
    category: 'Telecom',
    score: 94,
    assignedVendors: ['v1'],
    remarks: 'Assigned to Airtel for site survey.',
    history: [
      { status: LeadStatus.NEW, updatedAt: '2025-05-09T14:30:00Z', note: 'Lead created' },
      { status: LeadStatus.ASSIGNED, updatedAt: '2025-05-10T09:00:00Z', note: 'Assigned to Airtel' }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Enterprise ERP Suite',
    description: 'Complete cloud-based process automation.',
    fullDescription: 'Our Enterprise ERP Suite is designed specifically for Indian MSMEs to manage their end-to-end business processes. From inventory tracking to GST-compliant invoicing, everything is handled seamlessly.',
    price: '10,000/mo',
    category: 'Software',
    rating: 4.8,
    features: ['GST Ready', 'Multi-tenant', 'Mobile App', 'AI Reports'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v2',
    stockStatus: 'In Stock',
    isActive: true,
    similarProducts: ['2', '3']
  },
  {
    id: '2',
    name: 'Business CRM Pro',
    description: 'Customer relationship management for sales teams.',
    fullDescription: 'Boost your sales productivity with CRM Pro. Features pipeline management, lead scoring, and automated follow-ups tailored for the Indian market.',
    price: '5,000/mo',
    category: 'Software',
    rating: 4.6,
    features: ['Pipeline View', 'WhatsApp Integration', 'Team Lead Assign', 'Call Logs'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v2',
    stockStatus: 'In Stock',
    isActive: true
  },
  {
    id: '3',
    name: 'Cloud Accounting Suite',
    description: 'Automated bookkeeping and GST filings.',
    fullDescription: 'Simplify your accounts with our Cloud Accounting Suite. Automated bank reconciliations and direct filing for GSTR-1 and GSTR-3B.',
    price: '2,500/mo',
    category: 'Software',
    rating: 4.9,
    features: ['Auto GST Filing', 'Invoice Customization', 'Inventory Control', 'Multi-user'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v2',
    stockStatus: 'In Stock',
    isActive: true
  },
  {
    id: '4',
    name: 'Dedicated Fiber Internet',
    description: 'High-speed 1:1 contention internet lease line.',
    fullDescription: 'Get enterprise-grade connectivity with our Dedicated Fiber Internet. 99.9% uptime SLA and 24/7 proactive monitoring.',
    price: '15,000/mo',
    category: 'Telecom',
    rating: 4.7,
    features: ['1:1 Contention', 'Static IP', 'Dual Path', 'managed Router'],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v1',
    stockStatus: 'In Stock',
    isActive: true
  },
  {
    id: '5',
    name: 'Cloud Voice PBX',
    description: 'Virtual phone system for distributed teams.',
    fullDescription: 'Modernize your business communication with Cloud Voice. IVR, call recording, and softphone support included.',
    price: '3,000/mo',
    category: 'Telecom',
    rating: 4.5,
    features: ['Smart IVR', 'Call Recording', 'Conference Bridge', 'CRM Sync'],
    imageUrl: 'https://images.unsplash.com/photo-1516387784550-59a3c9e82110?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516387784550-59a3c9e82110?auto=format&fit=crop&q=80&w=800'],
    vendorId: 'v1',
    stockStatus: 'In Stock',
    isActive: true
  }
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'Modernizing Procurement with AI',
    slug: 'ai-procurement-2025',
    content: 'Full article content here...',
    category: 'Technology',
    publishedAt: '2025-05-01',
    isPublished: true,
    metaTitle: 'AI in B2B Procurement',
    metaDescription: 'Learn how AI is changing lead qualification.'
  }
];

export const VENDOR_LOGOS = MOCK_VENDORS.map(v => v.logo);
