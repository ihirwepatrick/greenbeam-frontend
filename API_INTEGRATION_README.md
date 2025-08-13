# Greenbeam API Integration

This document explains how to use the comprehensive API integration system for the Greenbeam ecommerce project.

## Overview

The API integration system provides:
- **API Client**: Centralized HTTP client with authentication and error handling
- **Type Definitions**: Complete TypeScript types for all API responses
- **Service Layer**: Organized service functions for each API endpoint
- **Custom Hooks**: React hooks for easy API integration in components
- **Authentication Context**: Global state management for user authentication
- **Utility Functions**: Helper functions for common API operations

## Quick Start

### 1. Environment Setup

Copy the environment template and configure your API settings:

```bash
cp env.example .env.local
```

Update the values in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://greenbeam-backend.onrender.com/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_ENABLE_API_LOGGING=true
```

### 2. Wrap Your App with AuthProvider

In your root layout or app component:

```tsx
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 3. Use Authentication

```tsx
import { useAuth } from '../contexts/AuthContext';

function LoginComponent() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    const success = await login('user@example.com', 'password');
    if (success) {
      // Redirect or show success message
    }
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

## API Client

The `apiClient` handles all HTTP requests with automatic token management:

```tsx
import apiClient from '../lib/api-client';

// Set authentication token
apiClient.setToken('your-jwt-token');

// Make API calls
const response = await apiClient.get('/products');
const newProduct = await apiClient.post('/products', productData);
```

## Service Layer

Use the organized service functions for specific API operations:

```tsx
import { productService, enquiryService } from '../lib/services/api';

// Get products with filters
const products = await productService.getProducts({
  category: 'electronics',
  page: 1,
  limit: 20
});

// Create an enquiry
const enquiry = await enquiryService.createEnquiry({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Product Question',
  message: 'I have a question about...'
});
```

## Custom Hooks

Use the provided hooks for easy API integration in React components:

```tsx
import { useProducts, useProduct, useEnquiries } from '../hooks/use-api';

function ProductsPage() {
  const { data: products, loading, error, execute } = useProducts({
    category: 'electronics',
    page: 1
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products?.data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductDetail({ id }) {
  const { data: product, loading, error } = useProduct(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ProductView product={product} />;
}
```

## Authentication Context

The `AuthContext` provides global authentication state:

```tsx
import { useAuth } from '../contexts/AuthContext';

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## File Upload

Handle file uploads with progress tracking:

```tsx
import { uploadService } from '../lib/services/api';

function FileUpload() {
  const handleUpload = async (files: FileList) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const result = await uploadService.uploadMultipleFiles(
        { files: Array.from(files) },
        (progress) => {
          console.log(`Upload progress: ${progress}%`);
        }
      );

      console.log('Upload successful:', result.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      multiple
      onChange={(e) => e.target.files && handleUpload(e.target.files)}
    />
  );
}
```

## Error Handling

The system provides comprehensive error handling:

```tsx
import { handleApiError, isApiError } from '../lib/utils/api-utils';

try {
  const response = await productService.getProducts();
  
  if (isApiError(response)) {
    console.error('API Error:', response.error.message);
  } else {
    console.log('Products:', response.data);
  }
} catch (error) {
  const errorMessage = handleApiError(error);
  console.error('Request failed:', errorMessage);
}
```

## Configuration

Customize the API behavior through configuration:

```tsx
import { config, currentConfig } from '../lib/config';

// Access configuration values
console.log('API Base URL:', currentConfig.api.baseUrl);
console.log('Max file size:', currentConfig.upload.maxFileSize);
console.log('Enable notifications:', currentConfig.features.enableNotifications);

// Validate configuration
import { validateConfig } from '../lib/config';
const errors = validateConfig();
if (errors.length > 0) {
  console.error('Configuration errors:', errors);
}
```

## Available API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/change-password` - Change password
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - User logout

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/categories/all` - Get categories
- `POST /products/:id/rate` - Rate product

### Enquiries
- `POST /enquiries` - Create enquiry
- `GET /enquiries` - Get all enquiries
- `GET /enquiries/:id` - Get enquiry by ID
- `PATCH /enquiries/:id/status` - Update status
- `POST /enquiries/:id/respond` - Respond to enquiry
- `DELETE /enquiries/:id` - Delete enquiry

### Dashboard
- `GET /dashboard/stats` - Get statistics
- `GET /dashboard/charts` - Get chart data
- `GET /dashboard/activity` - Get recent activity

### Settings
- `GET /settings` - Get all settings
- `GET /settings/:category` - Get settings by category
- `PUT /settings/:category` - Update settings by category
- `PUT /settings/:category/:key` - Update single setting
- `DELETE /settings/:category/:key` - Delete single setting

### File Upload
- `POST /upload/single` - Upload single file
- `POST /upload/multiple` - Upload multiple files
- `POST /upload/fields` - Upload files with specific fields
- `GET /upload/:id` - Get file by ID
- `GET /upload` - Get files list
- `DELETE /upload/:id` - Delete file
- `PUT /upload/:id` - Update file metadata
- `GET /upload/stats/overview` - Get file statistics

### Notifications
- `GET /notifications` - Get notifications
- `PATCH /notifications/:id/read` - Mark as read
- `PATCH /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification
- `GET /notifications/stats` - Get notification statistics
- `POST /notifications` - Create notification

## Type Safety

All API responses are fully typed:

```tsx
import { Product, Enquiry, User } from '../lib/types/api';

// Type-safe API calls
const products: Product[] = response.data;
const enquiry: Enquiry = response.data;
const user: User = response.data;
```

## Best Practices

1. **Always use the service layer** instead of calling the API client directly
2. **Use the custom hooks** for React components to get loading states and error handling
3. **Handle errors gracefully** using the provided error handling utilities
4. **Use TypeScript** to get full type safety for all API operations
5. **Configure environment variables** for different deployment environments
6. **Use the authentication context** for user state management
7. **Implement proper loading states** using the loading flags from hooks

## Troubleshooting

### Common Issues

1. **Authentication errors**: Check if the token is valid and not expired
2. **CORS issues**: Ensure your backend allows requests from your frontend domain
3. **File upload failures**: Check file size limits and allowed file types
4. **API timeouts**: Increase the timeout value in configuration if needed

### Debug Mode

Enable API logging in development:

```env
NEXT_PUBLIC_ENABLE_API_LOGGING=true
```

This will log all API requests and responses to the console.

## Contributing

When adding new API endpoints:

1. Add types to `lib/types/api.ts`
2. Add service functions to `lib/services/api.ts`
3. Add custom hooks to `hooks/use-api.ts` if needed
4. Update this documentation

## Support

For issues or questions about the API integration:

1. Check the console for error messages
2. Verify your environment configuration
3. Ensure your backend API is running and accessible
4. Check the network tab for failed requests 