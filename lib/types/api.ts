// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Authentication Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Enquiry Types
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt?: string;
  responses?: EnquiryResponse[];
}

export interface EnquiryResponse {
  id: string;
  message: string;
  createdAt: string;
}

export interface CreateEnquiryRequest {
  customerName: string;
  email: string;
  phone?: string;
  product?: string;
  subject: string;
  message: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UpdateEnquiryStatusRequest {
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
}

export interface RespondToEnquiryRequest {
  message: string;
  subject?: string;
  sendEmail?: boolean;
}

// Product Types
export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
  images: string[] | null;
  features?: string[];
  specifications?: any;
  status?: string;
  rating?: number | string;
  reviews?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  category: string;
  status?: string;
  features?: string[];
  specifications?: any;
  image: File; // thumbnail
  images?: File[]; // gallery
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  category?: string;
  status?: string;
  features?: string[];
  specifications?: any;
  image?: File;
  images?: File[];
}

export interface RateProductRequest {
  rating: number;
}

// Dashboard Types
export interface DashboardStats {
  products: {
    total: number;
    available: number;
    categories: number;
    newThisMonth: number;
    categoryBreakdown: Array<{
      category: string;
      count: number;
    }>;
  };
  enquiries: {
    total: number;
    new: number;
    inProgress: number;
    responded: number;
    closed: number;
    responseRate: number;
    priorityBreakdown: Array<{
      priority: 'HIGH' | 'MEDIUM' | 'LOW' | string;
      count: number;
    }>;
    recent: number;
  };
  notifications: {
    total: number;
    unread: number;
    read: number;
  };
  emails: {
    total: number;
    sent: number;
    failed: number;
    successRate: number;
  };
  activity: {
    recentEnquiries: number;
    recentProducts: number;
    recentEnquiryList: Array<{
      id: string;
      customerName: string;
      product: string;
      status: string;
      priority: 'HIGH' | 'MEDIUM' | 'LOW' | string;
      createdAt: string;
    }>;
  };
  system: {
    status: string;
    lastBackup: string;
    storageUsed: string;
    uptime: string;
  };
}

export interface ChartData {
  enquiries: Array<{
    date: string;
    count: number;
  }>;
  products: Array<{
    date: string;
    count: number;
  }>;
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId?: string;
}

// Settings Types
export interface Settings {
  [category: string]: {
    [key: string]: any;
  };
}

export interface UpdateSettingRequest {
  value: any;
}

// File/Upload Types
export interface FileInfo {
  id: string;
  filename: string;
  url: string;
  type: string;
  folder: string;
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UploadFileRequest {
  file: File;
  type?: string;
  folder?: string;
}

export interface UploadMultipleFilesRequest {
  files: File[];
  type?: string;
  folder?: string;
}

export interface UploadFieldsRequest {
  logo?: File;
  favicon?: File;
  heroImage?: File;
  gallery?: File[];
  documents?: File[];
}

export interface FileStats {
  totalFiles: number;
  totalSize: number;
  byType: Record<string, number>;
  byFolder: Record<string, number>;
}

// Notification Types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId?: string;
}

export interface CreateNotificationRequest {
  type: string;
  title: string;
  message: string;
  userId?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
}

// Query Parameters Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ProductQueryParams extends PaginationParams {
  category?: string;
  search?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EnquiryQueryParams extends PaginationParams {
  status?: string;
  search?: string;
}

export interface FileQueryParams extends PaginationParams {
  type?: string;
  folder?: string;
  search?: string;
}

export interface NotificationQueryParams extends PaginationParams {
  read?: boolean;
}

export interface DashboardQueryParams {
  period?: number;
  limit?: number;
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  ENQUIRIES: {
    BASE: '/enquiries',
    BY_ID: (id: string) => `/enquiries/${id}`,
    STATUS: (id: string) => `/enquiries/${id}/status`,
    RESPOND: (id: string) => `/enquiries/${id}/respond`,
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string | number) => `/products/${id}`,
    CATEGORIES: '/products/categories/all',
    RATE: (id: string | number) => `/products/${id}/rate`,
    
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    CHARTS: '/dashboard/charts',
    ACTIVITY: '/dashboard/activity',
  },
  SETTINGS: {
    BASE: '/settings',
    BY_CATEGORY: (category: string) => `/settings/${category}`,
    BY_KEY: (category: string, key: string) => `/settings/${category}/${key}`,
  },
  UPLOAD: {
    SINGLE: '/upload/single',
    MULTIPLE: '/upload/multiple',
    FIELDS: '/upload/fields',
    BY_ID: (id: string) => `/upload/${id}`,
    STATS: '/upload/stats/overview',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    READ: (id: string) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all',
    STATS: '/notifications/stats',
  },
} as const; 