import apiClient from '../api-client';
import {
  ApiResponse,
  AuthResponse,
  User,
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  Enquiry,
  CreateEnquiryRequest,
  UpdateEnquiryStatusRequest,
  RespondToEnquiryRequest,
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  RateProductRequest,
  DashboardStats,
  ChartData,
  ActivityItem,
  Settings,
  UpdateSettingRequest,
  FileInfo,
  UploadFileRequest,
  UploadMultipleFilesRequest,
  UploadFieldsRequest,
  FileStats,
  Notification,
  CreateNotificationRequest,
  NotificationStats,
  ProductQueryParams,
  EnquiryQueryParams,
  FileQueryParams,
  NotificationQueryParams,
  DashboardQueryParams,
  PaginationResponse,
  API_ENDPOINTS,
} from '../types/api';

// Authentication Services
export const authService = {
  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE);
  },

  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<ApiResponse<{ message: string }>>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  async refreshToken(): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    return apiClient.post<ApiResponse<{ token: string; refreshToken: string }>>(API_ENDPOINTS.AUTH.REFRESH);
  },

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<ApiResponse<{ message: string }>>(API_ENDPOINTS.AUTH.LOGOUT);
  },
};

// Enquiry Services
export const enquiryService = {
  async createEnquiry(data: CreateEnquiryRequest): Promise<ApiResponse<Enquiry>> {
    return apiClient.post<ApiResponse<Enquiry>>(API_ENDPOINTS.ENQUIRIES.BASE, data);
  },

  async getEnquiries(params?: EnquiryQueryParams): Promise<ApiResponse<PaginationResponse<Enquiry>>> {
    return apiClient.get<ApiResponse<PaginationResponse<Enquiry>>>(API_ENDPOINTS.ENQUIRIES.BASE, params);
  },

  async getEnquiryById(id: string): Promise<ApiResponse<Enquiry>> {
    return apiClient.get<ApiResponse<Enquiry>>(API_ENDPOINTS.ENQUIRIES.BY_ID(id));
  },

  async updateEnquiryStatus(id: string, data: UpdateEnquiryStatusRequest): Promise<ApiResponse<{ id: string; status: string; message: string }>> {
    return apiClient.patch<ApiResponse<{ id: string; status: string; message: string }>>(
      API_ENDPOINTS.ENQUIRIES.STATUS(id),
      data
    );
  },

  async respondToEnquiry(id: string, data: RespondToEnquiryRequest): Promise<ApiResponse<{ response: { id: string; message: string; createdAt: string } }>> {
    return apiClient.post<ApiResponse<{ response: { id: string; message: string; createdAt: string } }>>(
      API_ENDPOINTS.ENQUIRIES.RESPOND(id),
      data
    );
  },

  async deleteEnquiry(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.ENQUIRIES.BY_ID(id));
  },
};

// Product Services
export const productService = {
  async getProducts(params?: ProductQueryParams): Promise<ApiResponse<PaginationResponse<Product>>> {
    return apiClient.get<ApiResponse<PaginationResponse<Product>>>(API_ENDPOINTS.PRODUCTS.BASE, params);
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  },

  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    formData.append('image', data.image);
    
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return apiClient.upload<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.BASE, formData);
  },

  async updateProduct(id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.price) formData.append('price', data.price.toString());
    if (data.category) formData.append('category', data.category);
    if (data.image) formData.append('image', data.image);
    
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return apiClient.upload<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.BY_ID(id), formData);
  },

  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  },

  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>(API_ENDPOINTS.PRODUCTS.CATEGORIES);
  },

  async rateProduct(id: string, data: RateProductRequest): Promise<ApiResponse<{ message: string; newRating: number }>> {
    return apiClient.post<ApiResponse<{ message: string; newRating: number }>>(
      API_ENDPOINTS.PRODUCTS.RATE(id),
      data
    );
  },
};

// Dashboard Services
export const dashboardService = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<ApiResponse<DashboardStats>>(API_ENDPOINTS.DASHBOARD.STATS);
  },

  async getChartData(params?: DashboardQueryParams): Promise<ApiResponse<ChartData>> {
    return apiClient.get<ApiResponse<ChartData>>(API_ENDPOINTS.DASHBOARD.CHARTS, params);
  },

  async getRecentActivity(params?: DashboardQueryParams): Promise<ApiResponse<ActivityItem[]>> {
    return apiClient.get<ApiResponse<ActivityItem[]>>(API_ENDPOINTS.DASHBOARD.ACTIVITY, params);
  },
};

// Settings Services
export const settingsService = {
  async getAllSettings(): Promise<ApiResponse<Settings>> {
    return apiClient.get<ApiResponse<Settings>>(API_ENDPOINTS.SETTINGS.BASE);
  },

  async getSettingsByCategory(category: string): Promise<ApiResponse<any>> {
    return apiClient.get<ApiResponse<any>>(API_ENDPOINTS.SETTINGS.BY_CATEGORY(category));
  },

  async updateSettingsByCategory(category: string, data: any): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<ApiResponse<{ message: string }>>(API_ENDPOINTS.SETTINGS.BY_CATEGORY(category), data);
  },

  async updateSingleSetting(category: string, key: string, data: UpdateSettingRequest): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<ApiResponse<{ message: string }>>(API_ENDPOINTS.SETTINGS.BY_KEY(category, key), data);
  },

  async deleteSingleSetting(category: string, key: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.SETTINGS.BY_KEY(category, key));
  },
};

// Upload/File Services
export const uploadService = {
  async uploadSingleFile(data: UploadFileRequest, onProgress?: (progress: number) => void): Promise<ApiResponse<FileInfo>> {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.type) formData.append('type', data.type);
    if (data.folder) formData.append('folder', data.folder);

    return apiClient.upload<ApiResponse<FileInfo>>(API_ENDPOINTS.UPLOAD.SINGLE, formData, onProgress);
  },

  async uploadMultipleFiles(data: UploadMultipleFilesRequest, onProgress?: (progress: number) => void): Promise<ApiResponse<FileInfo[]>> {
    const formData = new FormData();
    data.files.forEach((file) => {
      formData.append('files', file);
    });
    if (data.type) formData.append('type', data.type);
    if (data.folder) formData.append('folder', data.folder);

    return apiClient.upload<ApiResponse<FileInfo[]>>(API_ENDPOINTS.UPLOAD.MULTIPLE, formData, onProgress);
  },

  async uploadFields(data: UploadFieldsRequest, onProgress?: (progress: number) => void): Promise<ApiResponse<any>> {
    const formData = new FormData();
    
    if (data.logo) formData.append('logo', data.logo);
    if (data.favicon) formData.append('favicon', data.favicon);
    if (data.heroImage) formData.append('heroImage', data.heroImage);
    
    if (data.gallery) {
      data.gallery.forEach((file) => {
        formData.append('gallery', file);
      });
    }
    
    if (data.documents) {
      data.documents.forEach((file) => {
        formData.append('documents', file);
      });
    }

    return apiClient.upload<ApiResponse<any>>(API_ENDPOINTS.UPLOAD.FIELDS, formData, onProgress);
  },

  async getFileById(id: string): Promise<ApiResponse<FileInfo>> {
    return apiClient.get<ApiResponse<FileInfo>>(API_ENDPOINTS.UPLOAD.BY_ID(id));
  },

  async getFiles(params?: FileQueryParams): Promise<ApiResponse<PaginationResponse<FileInfo>>> {
    return apiClient.get<ApiResponse<PaginationResponse<FileInfo>>>('/upload', params);
  },

  async deleteFile(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.UPLOAD.BY_ID(id));
  },

  async updateFileMetadata(id: string, data: { type?: string; folder?: string }): Promise<ApiResponse<FileInfo>> {
    return apiClient.put<ApiResponse<FileInfo>>(API_ENDPOINTS.UPLOAD.BY_ID(id), data);
  },

  async getFileStats(): Promise<ApiResponse<FileStats>> {
    return apiClient.get<ApiResponse<FileStats>>(API_ENDPOINTS.UPLOAD.STATS);
  },
};

// Notification Services
export const notificationService = {
  async getNotifications(params?: NotificationQueryParams): Promise<ApiResponse<PaginationResponse<Notification>>> {
    return apiClient.get<ApiResponse<PaginationResponse<Notification>>>(API_ENDPOINTS.NOTIFICATIONS.BASE, params);
  },

  async markAsRead(id: string): Promise<ApiResponse<{ id: string; read: boolean; message: string }>> {
    return apiClient.patch<ApiResponse<{ id: string; read: boolean; message: string }>>(
      API_ENDPOINTS.NOTIFICATIONS.READ(id)
    );
  },

  async markAllAsRead(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<ApiResponse<{ message: string }>>(API_ENDPOINTS.NOTIFICATIONS.READ_ALL);
  },

  async deleteNotification(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.NOTIFICATIONS.BY_ID(id));
  },

  async getNotificationStats(): Promise<ApiResponse<NotificationStats>> {
    return apiClient.get<ApiResponse<NotificationStats>>(API_ENDPOINTS.NOTIFICATIONS.STATS);
  },

  async createNotification(data: CreateNotificationRequest): Promise<ApiResponse<Notification>> {
    return apiClient.post<ApiResponse<Notification>>(API_ENDPOINTS.NOTIFICATIONS.BASE, data);
  },
};

// Export all services
export const apiService = {
  auth: authService,
  enquiry: enquiryService,
  product: productService,
  dashboard: dashboardService,
  settings: settingsService,
  upload: uploadService,
  notification: notificationService,
}; 