# Greenbeam Admin Portal API Documentation

## Overview
Simplified API endpoints for Greenbeam admin portal including enquiry management, product management, and comprehensive settings management.

## Base URL
```
https://api.greenbeam.com/v1
```

## Authentication
```http
Authorization: Bearer <your-access-token>
```

## 1. Enquiry Management

### 1.1 Create New Enquiry
```http
POST /enquiries
```
**Request Body:**
```json
{
  "customerName": "John Smith",
  "email": "john.smith@email.com",
  "phone": "+250 788 123 456",
  "product": "Solar Panel Kit 400W",
  "subject": "Product Availability Inquiry",
  "message": "I'm interested in your solar panel kit. Is it available for immediate delivery?",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ENQ-20241201-001",
    "customerName": "John Smith",
    "email": "john.smith@email.com",
    "phone": "+250 788 123 456",
    "product": "Solar Panel Kit 400W",
    "subject": "Product Availability Inquiry",
    "message": "I'm interested in your solar panel kit...",
    "status": "new",
    "priority": "medium",
    "createdAt": "2024-12-01T10:30:00Z"
  }
}
```

### 1.2 Get All Enquiries
```http
GET /enquiries?page=1&limit=20&status=new&priority=high&search=john
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page (max 100)
- `status` (string): Filter by status (new, in_progress, responded, closed)
- `priority` (string): Filter by priority (low, medium, high)
- `search` (string): Search in customer name, email, or subject

**Response:**
```json
{
  "success": true,
  "data": {
    "enquiries": [
      {
        "id": "ENQ-20241201-001",
        "customerName": "John Smith",
        "email": "john.smith@email.com",
        "phone": "+250 788 123 456",
        "product": "Solar Panel Kit 400W",
        "subject": "Product Availability Inquiry",
        "status": "new",
        "priority": "medium",
        "createdAt": "2024-12-01T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### 1.3 Respond to Enquiry
```http
POST /enquiries/{enquiryId}/respond
```
**Request Body:**
```json
{
  "message": "Thank you for your enquiry. Our solar panel kit is currently available...",
  "status": "responded",
  "sendEmail": true
}
```

### 1.4 Update Enquiry Status
```http
PATCH /enquiries/{enquiryId}/status
```
**Request Body:**
```json
{
  "status": "in_progress",
  "notes": "Assigned to sales team"
}
```

## 2. Product Management

### 2.1 Create Product
```http
POST /products
```
**Request Body:**
```json
{
  "name": "Solar Panel Kit 400W",
  "description": "High-efficiency solar panel kit for residential use",
  "category": "Solar Panels",
  "features": [
    "400W output",
    "Weather resistant",
    "25-year warranty",
    "Easy installation"
  ],
  "images": [
    {
      "url": "https://storage.greenbeam.com/products/solar-kit-1.jpg",
      "alt": "Solar Panel Kit Front View",
      "order": 1
    }
  ],
  "availability": "available",
  "specifications": {
    "power": "400W",
    "voltage": "12V",
    "dimensions": "1650 x 992 x 35mm",
    "weight": "18.5kg"
  }
}
```

### 2.2 Get All Products
```http
GET /products?page=1&limit=20&category=solar&availability=available&search=panel
```

### 2.3 Update Product
```http
PUT /products/{productId}
```

### 2.4 Delete Product
```http
DELETE /products/{productId}
```

### 2.5 Upload Product Images
```http
POST /products/{productId}/images
```
**Request Body (multipart/form-data):**
```
images: [file1, file2, file3]
```

## 3. General Settings Management

### 3.1 Get All Settings
```http
GET /settings
```
**Response:**
```json
{
  "success": true,
  "data": {
    "general": {
      "companyName": "Greenbeam",
      "companyEmail": "info@greenbeam.com",
      "companyPhone": "+250 788 123 456",
      "companyAddress": "Kigali, Rwanda",
      "timezone": "Africa/Kigali",
      "currency": "RWF",
      "language": "en",
      "dateFormat": "DD/MM/YYYY",
      "timeFormat": "24h"
    },
    "email": {
      "smtpHost": "smtp.gmail.com",
      "smtpPort": 587,
      "smtpUser": "noreply@greenbeam.com",
      "smtpPassword": "encrypted_password",
      "fromName": "Greenbeam Team",
      "fromEmail": "noreply@greenbeam.com",
      "replyTo": "support@greenbeam.com"
    },
    "notifications": {
      "emailNotifications": true,
      "adminEmail": "admin@greenbeam.com",
      "enquiryNotifications": true,
      "systemNotifications": true,
      "notificationFrequency": "immediate"
    },
    "security": {
      "sessionTimeout": 3600,
      "maxLoginAttempts": 5,
      "passwordPolicy": {
        "minLength": 8,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumbers": true,
        "requireSpecialChars": true
      },
      "twoFactorAuth": false
    },
    "backup": {
      "autoBackup": true,
      "backupFrequency": "daily",
      "backupRetention": 30,
      "backupLocation": "cloud"
    }
  }
}
```

### 3.2 Update General Settings
```http
PUT /settings/general
```
**Request Body:**
```json
{
  "companyName": "Greenbeam Solutions",
  "companyEmail": "info@greenbeam.com",
  "companyPhone": "+250 788 123 456",
  "companyAddress": "Kigali, Rwanda",
  "timezone": "Africa/Kigali",
  "currency": "RWF",
  "language": "en",
  "dateFormat": "DD/MM/YYYY",
  "timeFormat": "24h"
}
```

### 3.3 Update Email Settings
```http
PUT /settings/email
```
**Request Body:**
```json
{
  "smtpHost": "smtp.gmail.com",
  "smtpPort": 587,
  "smtpUser": "noreply@greenbeam.com",
  "smtpPassword": "new_password",
  "fromName": "Greenbeam Team",
  "fromEmail": "noreply@greenbeam.com",
  "replyTo": "support@greenbeam.com"
}
```

### 3.4 Update Notification Settings
```http
PUT /settings/notifications
```
**Request Body:**
```json
{
  "emailNotifications": true,
  "adminEmail": "admin@greenbeam.com",
  "enquiryNotifications": true,
  "systemNotifications": true,
  "notificationFrequency": "immediate"
}
```

### 3.5 Update Security Settings
```http
PUT /settings/security
```
**Request Body:**
```json
{
  "sessionTimeout": 3600,
  "maxLoginAttempts": 5,
  "passwordPolicy": {
    "minLength": 8,
    "requireUppercase": true,
    "requireLowercase": true,
    "requireNumbers": true,
    "requireSpecialChars": true
  },
  "twoFactorAuth": false
}
```

## 4. Website Settings Management

### 4.1 Get Website Settings
```http
GET /settings/website
```
**Response:**
```json
{
  "success": true,
  "data": {
    "branding": {
      "logo": "https://storage.greenbeam.com/logo.png",
      "favicon": "https://storage.greenbeam.com/favicon.ico",
      "primaryColor": "#0a6650",
      "secondaryColor": "#084c3d",
      "accentColor": "#10b981",
      "fontFamily": "Inter",
      "fontSize": "16px",
      "buttonStyle": "rounded",
      "borderRadius": "8px"
    },
    "content": {
      "siteTitle": "Greenbeam - Sustainable Energy Solutions",
      "siteDescription": "Leading provider of solar energy solutions in Rwanda",
      "homepageHero": {
        "title": "Powering Rwanda's Future",
        "subtitle": "Sustainable solar energy solutions for homes and businesses",
        "ctaText": "Explore Products",
        "ctaLink": "/products",
        "backgroundImage": "https://storage.greenbeam.com/hero-bg.jpg",
        "showOverlay": true,
        "overlayOpacity": 0.6
      },
      "aboutSection": {
        "title": "About Greenbeam",
        "content": "We are committed to providing sustainable energy solutions...",
        "showTeam": true,
        "showStats": true,
        "stats": [
          {
            "label": "Projects Completed",
            "value": "500+",
            "icon": "check-circle"
          },
          {
            "label": "Happy Customers",
            "value": "1000+",
            "icon": "users"
          }
        ]
      },
      "contactInfo": {
        "address": "Kigali, Rwanda",
        "phone": "+250 788 123 456",
        "email": "info@greenbeam.com",
        "workingHours": "Mon-Fri: 8AM-6PM",
        "mapLocation": {
          "latitude": -1.9441,
          "longitude": 30.0619,
          "zoom": 15
        },
        "showMap": true,
        "showContactForm": true
      },
      "footer": {
        "showNewsletter": true,
        "newsletterTitle": "Stay Updated",
        "newsletterDescription": "Get the latest updates on our products and services",
        "showSocialLinks": true,
        "copyrightText": "© 2024 Greenbeam. All rights reserved."
      }
    },
    "seo": {
      "metaTitle": "Greenbeam - Solar Energy Solutions Rwanda",
      "metaDescription": "Leading solar energy provider in Rwanda. Sustainable solutions for homes and businesses.",
      "metaKeywords": "solar energy, Rwanda, renewable energy, solar panels",
      "ogImage": "https://storage.greenbeam.com/og-image.jpg",
      "twitterCard": "summary_large_image",
      "googleAnalyticsId": "GA-123456789",
      "googleTagManagerId": "GTM-ABCDEF",
      "sitemapEnabled": true,
      "robotsTxt": "User-agent: *\nAllow: /"
    },
    "social": {
      "facebook": "https://facebook.com/greenbeam",
      "twitter": "https://twitter.com/greenbeam",
      "linkedin": "https://linkedin.com/company/greenbeam",
      "instagram": "https://instagram.com/greenbeam",
      "youtube": "https://youtube.com/greenbeam",
      "showSocialIcons": true,
      "socialIconsPosition": "footer",
      "socialShareEnabled": true
    },
    "features": {
      "enableBlog": true,
      "enableNewsletter": true,
      "enableReviews": false,
      "enableChat": true,
      "enableSearch": true,
      "enableFilters": true,
      "productsPerPage": 12,
      "enablePagination": true,
      "enableRelatedProducts": true,
      "enableProductComparison": false,
      "enableWishlist": false,
      "enableProductCategories": true,
      "enableProductTags": true
    },
    "layout": {
      "headerStyle": "fixed",
      "showBreadcrumbs": true,
      "sidebarPosition": "right",
      "productGridColumns": 3,
      "showProductImages": true,
      "imageAspectRatio": "16:9",
      "enableLazyLoading": true,
      "showLoadingSpinner": true
    },
    "performance": {
      "enableCaching": true,
      "cacheDuration": 3600,
      "enableCompression": true,
      "enableCDN": true,
      "cdnUrl": "https://cdn.greenbeam.com",
      "imageOptimization": true,
      "lazyLoadImages": true
    },
    "customization": {
      "customCSS": "",
      "customJS": "",
      "enableCustomThemes": false,
      "themeMode": "light",
      "enableDarkMode": false,
      "customFonts": [],
      "enableAnimations": true,
      "animationSpeed": "normal"
    }
  }
}
```

### 4.2 Update Branding Settings
```http
PUT /settings/website/branding
```
**Request Body:**
```json
{
  "logo": "https://storage.greenbeam.com/new-logo.png",
  "favicon": "https://storage.greenbeam.com/new-favicon.ico",
  "primaryColor": "#0a6650",
  "secondaryColor": "#084c3d",
  "accentColor": "#10b981",
  "fontFamily": "Inter",
  "fontSize": "16px",
  "buttonStyle": "rounded",
  "borderRadius": "8px"
}
```

### 4.3 Update Content Settings
```http
PUT /settings/website/content
```
**Request Body:**
```json
{
  "siteTitle": "Greenbeam - Sustainable Energy Solutions",
  "siteDescription": "Leading provider of solar energy solutions in Rwanda",
  "homepageHero": {
    "title": "Powering Rwanda's Future",
    "subtitle": "Sustainable solar energy solutions for homes and businesses",
    "ctaText": "Explore Products",
    "ctaLink": "/products",
    "backgroundImage": "https://storage.greenbeam.com/hero-bg.jpg",
    "showOverlay": true,
    "overlayOpacity": 0.6
  },
  "aboutSection": {
    "title": "About Greenbeam",
    "content": "We are committed to providing sustainable energy solutions...",
    "showTeam": true,
    "showStats": true,
    "stats": [
      {
        "label": "Projects Completed",
        "value": "500+",
        "icon": "check-circle"
      }
    ]
  },
  "contactInfo": {
    "address": "Kigali, Rwanda",
    "phone": "+250 788 123 456",
    "email": "info@greenbeam.com",
    "workingHours": "Mon-Fri: 8AM-6PM",
    "mapLocation": {
      "latitude": -1.9441,
      "longitude": 30.0619,
      "zoom": 15
    },
    "showMap": true,
    "showContactForm": true
  },
  "footer": {
    "showNewsletter": true,
    "newsletterTitle": "Stay Updated",
    "newsletterDescription": "Get the latest updates on our products and services",
    "showSocialLinks": true,
    "copyrightText": "© 2024 Greenbeam. All rights reserved."
  }
}
```

### 4.4 Update SEO Settings
```http
PUT /settings/website/seo
```
**Request Body:**
```json
{
  "metaTitle": "Greenbeam - Solar Energy Solutions Rwanda",
  "metaDescription": "Leading solar energy provider in Rwanda. Sustainable solutions for homes and businesses.",
  "metaKeywords": "solar energy, Rwanda, renewable energy, solar panels",
  "ogImage": "https://storage.greenbeam.com/og-image.jpg",
  "twitterCard": "summary_large_image",
  "googleAnalyticsId": "GA-123456789",
  "googleTagManagerId": "GTM-ABCDEF",
  "sitemapEnabled": true,
  "robotsTxt": "User-agent: *\nAllow: /"
}
```

### 4.5 Update Social Media Settings
```http
PUT /settings/website/social
```
**Request Body:**
```json
{
  "facebook": "https://facebook.com/greenbeam",
  "twitter": "https://twitter.com/greenbeam",
  "linkedin": "https://linkedin.com/company/greenbeam",
  "instagram": "https://instagram.com/greenbeam",
  "youtube": "https://youtube.com/greenbeam",
  "showSocialIcons": true,
  "socialIconsPosition": "footer",
  "socialShareEnabled": true
}
```

### 4.6 Update Feature Settings
```http
PUT /settings/website/features
```
**Request Body:**
```json
{
  "enableBlog": true,
  "enableNewsletter": true,
  "enableReviews": false,
  "enableChat": true,
  "enableSearch": true,
  "enableFilters": true,
  "productsPerPage": 12,
  "enablePagination": true,
  "enableRelatedProducts": true,
  "enableProductComparison": false,
  "enableWishlist": false,
  "enableProductCategories": true,
  "enableProductTags": true
}
```

### 4.7 Update Layout Settings
```http
PUT /settings/website/layout
```
**Request Body:**
```json
{
  "headerStyle": "fixed",
  "showBreadcrumbs": true,
  "sidebarPosition": "right",
  "productGridColumns": 3,
  "showProductImages": true,
  "imageAspectRatio": "16:9",
  "enableLazyLoading": true,
  "showLoadingSpinner": true
}
```

### 4.8 Update Performance Settings
```http
PUT /settings/website/performance
```
**Request Body:**
```json
{
  "enableCaching": true,
  "cacheDuration": 3600,
  "enableCompression": true,
  "enableCDN": true,
  "cdnUrl": "https://cdn.greenbeam.com",
  "imageOptimization": true,
  "lazyLoadImages": true
}
```

### 4.9 Update Customization Settings
```http
PUT /settings/website/customization
```
**Request Body:**
```json
{
  "customCSS": "",
  "customJS": "",
  "enableCustomThemes": false,
  "themeMode": "light",
  "enableDarkMode": false,
  "customFonts": [],
  "enableAnimations": true,
  "animationSpeed": "normal"
}
```

## 5. File Upload Management

### 5.1 Upload File
```http
POST /upload
```
**Request Body (multipart/form-data):**
```
file: [file]
type: product_image
folder: products
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file-123",
    "filename": "solar-panel.jpg",
    "url": "https://storage.greenbeam.com/products/solar-panel.jpg",
    "size": 2048576,
    "mimeType": "image/jpeg",
    "dimensions": {"width": 1920, "height": 1080}
  }
}
```

### 5.2 Delete File
```http
DELETE /upload/{fileId}
```

## 6. Dashboard Statistics

### 6.1 Get Dashboard Stats
```http
GET /dashboard/stats?period=30d
```
**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalProducts": 45,
      "availableProducts": 38,
      "totalEnquiries": 450,
      "newEnquiries": 45
    },
    "recentActivity": {
      "enquiries": [
        {
          "id": "ENQ-20241201-001",
          "customerName": "John Smith",
          "product": "Solar Panel Kit 400W",
          "status": "new",
          "createdAt": "2024-12-01T10:30:00Z"
        }
      ],
      "products": [
        {
          "id": "prod-123",
          "name": "Solar Panel Kit 400W",
          "action": "updated",
          "updatedAt": "2024-12-01T09:15:00Z"
        }
      ]
    }
  }
}
```

## Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  },
  "timestamp": "2024-12-01T10:30:00Z"
}
```

## Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `INTERNAL_SERVER_ERROR`: Server error

## Database Schema

### Core Tables
1. **enquiries** - Store all customer enquiries
2. **products** - Store product information
3. **enquiry_responses** - Store admin responses to enquiries
4. **users** - Store admin users
5. **settings** - Store system settings
6. **files** - Store uploaded files

### Settings Table Structure
```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  type VARCHAR(20) DEFAULT 'string',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, key)
);
```

## Security Considerations
1. **Input Validation**: Validate all input data
2. **SQL Injection**: Use parameterized queries
3. **XSS Protection**: Sanitize user input
4. **CSRF Protection**: Implement CSRF tokens
5. **HTTPS**: Use HTTPS for all communications
6. **Data Encryption**: Encrypt sensitive data
7. **Access Control**: Implement proper authorization
8. **Audit Logging**: Log all admin actions
9. **Backup**: Regular database backups

## Performance Optimization
1. **Caching**: Implement Redis caching for settings
2. **Database Optimization**: Use proper indexing
3. **CDN**: Use CDN for static assets
4. **Image Optimization**: Compress and resize images
5. **Pagination**: Implement proper pagination 