# Greenbeam E-commerce Complete API Documentation

## Overview

This document provides comprehensive API endpoints and data structures for the complete Greenbeam system including enquiry management, product management, system monitoring, logging, user interactivity tracking, and settings management.

## Base URL
```
https://api.greenbeam.com/v1
```

## Authentication

All API requests require authentication using Bearer tokens:

```http
Authorization: Bearer <your-access-token>
```

## API Endpoints

### 1. Enquiry Management

#### 1.1 Create New Enquiry
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
  "priority": "medium",
  "source": "website",
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1",
  "referrer": "https://greenbeam.com/products"
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
    "createdAt": "2024-12-01T10:30:00Z",
    "updatedAt": "2024-12-01T10:30:00Z"
  },
  "message": "Enquiry created successfully"
}
```

#### 1.2 Get All Enquiries
```http
GET /enquiries?page=1&limit=20&status=new&priority=high&search=john
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page (max 100)
- `status` (string): Filter by status (new, in_progress, responded, closed)
- `priority` (string): Filter by priority (low, medium, high)
- `search` (string): Search in customer name, email, or subject
- `dateFrom` (string): Filter from date (ISO format)
- `dateTo` (string): Filter to date (ISO format)

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
        "message": "I'm interested in your solar panel kit...",
        "status": "new",
        "priority": "medium",
        "createdAt": "2024-12-01T10:30:00Z",
        "updatedAt": "2024-12-01T10:30:00Z",
        "responseCount": 0
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    },
    "stats": {
      "total": 150,
      "new": 45,
      "inProgress": 30,
      "responded": 60,
      "closed": 15
    }
  }
}
```

#### 1.3 Get Single Enquiry
```http
GET /enquiries/{enquiryId}
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
    "createdAt": "2024-12-01T10:30:00Z",
    "updatedAt": "2024-12-01T10:30:00Z",
    "responses": [
      {
        "id": "RES-001",
        "adminId": "admin-123",
        "adminName": "Admin User",
        "message": "Thank you for your enquiry...",
        "createdAt": "2024-12-01T11:00:00Z"
      }
    ],
    "activityLog": [
      {
        "action": "enquiry_created",
        "timestamp": "2024-12-01T10:30:00Z",
        "details": "Enquiry submitted via website"
      },
      {
        "action": "email_sent",
        "timestamp": "2024-12-01T10:31:00Z",
        "details": "Confirmation email sent to customer"
      }
    ]
  }
}
```

#### 1.4 Respond to Enquiry
```http
POST /enquiries/{enquiryId}/respond
```

**Request Body:**
```json
{
  "message": "Thank you for your enquiry. Our solar panel kit is currently available...",
  "status": "responded",
  "sendEmail": true,
  "internalNotes": "Customer seems interested in bulk purchase"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "responseId": "RES-002",
    "enquiryId": "ENQ-20241201-001",
    "message": "Thank you for your enquiry...",
    "status": "responded",
    "emailSent": true,
    "createdAt": "2024-12-01T12:00:00Z"
  },
  "message": "Response sent successfully"
}
```

#### 1.5 Update Enquiry Status
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

### 2. Product Management

#### 2.1 Create Product
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
    },
    {
      "url": "https://storage.greenbeam.com/products/solar-kit-2.jpg",
      "alt": "Solar Panel Kit Side View",
      "order": 2
    }
  ],
  "availability": "available",
  "specifications": {
    "power": "400W",
    "voltage": "12V",
    "dimensions": "1650 x 992 x 35mm",
    "weight": "18.5kg"
  },
  "tags": ["solar", "renewable", "residential"]
}
```

#### 2.2 Get All Products
```http
GET /products?page=1&limit=20&category=solar&availability=available&search=panel
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `category` (string): Filter by category
- `availability` (string): Filter by availability (available, not_available)
- `search` (string): Search in name or description
- `sortBy` (string): Sort by field (name, createdAt, updatedAt)
- `sortOrder` (string): Sort order (asc, desc)

#### 2.3 Update Product
```http
PUT /products/{productId}
```

#### 2.4 Delete Product
```http
DELETE /products/{productId}
```

#### 2.5 Upload Product Images
```http
POST /products/{productId}/images
```

**Request Body (multipart/form-data):**
```
images: [file1, file2, file3]
```

### 3. System Monitoring & Analytics

#### 3.1 User Activity Tracking
```http
POST /analytics/track
```

**Request Body:**
```json
{
  "event": "page_view",
  "page": "/products",
  "userId": "visitor-123",
  "sessionId": "session-456",
  "timestamp": "2024-12-01T10:30:00Z",
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1",
  "referrer": "https://google.com",
  "deviceInfo": {
    "type": "desktop",
    "os": "Windows 10",
    "browser": "Chrome",
    "screenResolution": "1920x1080"
  },
  "location": {
    "country": "Rwanda",
    "city": "Kigali",
    "latitude": -1.9441,
    "longitude": 30.0619
  },
  "customData": {
    "productId": "prod-123",
    "category": "solar"
  }
}
```

#### 3.2 Get Analytics Dashboard
```http
GET /analytics/dashboard?period=30d
```

**Query Parameters:**
- `period` (string): Time period (7d, 30d, 90d, 1y)

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalVisitors": 15420,
      "uniqueVisitors": 8920,
      "pageViews": 45680,
      "bounceRate": 23.5,
      "avgSessionDuration": 245,
      "conversionRate": 2.8
    },
    "traffic": {
      "sources": [
        {
          "source": "organic",
          "visitors": 6500,
          "percentage": 42.2
        },
        {
          "source": "direct",
          "visitors": 4200,
          "percentage": 27.2
        },
        {
          "source": "social",
          "visitors": 3200,
          "percentage": 20.8
        }
      ],
      "trends": [
        {
          "date": "2024-11-25",
          "visitors": 520,
          "pageViews": 1240
        }
      ]
    },
    "pages": [
      {
        "page": "/",
        "views": 12500,
        "uniqueViews": 8900,
        "avgTimeOnPage": 180
      },
      {
        "page": "/products",
        "views": 8900,
        "uniqueViews": 6500,
        "avgTimeOnPage": 320
      }
    ],
    "enquiries": {
      "total": 450,
      "conversionRate": 3.2,
      "byProduct": [
        {
          "product": "Solar Panel Kit 400W",
          "enquiries": 120,
          "percentage": 26.7
        }
      ]
    }
  }
}
```

#### 3.3 Get Real-time Analytics
```http
GET /analytics/realtime
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currentVisitors": 45,
    "activeSessions": 23,
    "recentActivity": [
      {
        "timestamp": "2024-12-01T12:30:00Z",
        "event": "page_view",
        "page": "/products",
        "visitor": "visitor-789"
      }
    ],
    "topPages": [
      {
        "page": "/",
        "activeUsers": 12
      },
      {
        "page": "/products",
        "activeUsers": 8
      }
    ]
  }
}
```

### 4. System Logging

#### 4.1 Create System Log
```http
POST /logs/system
```

**Request Body:**
```json
{
  "level": "info",
  "message": "User enquiry submitted",
  "category": "enquiry",
  "userId": "admin-123",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "metadata": {
    "enquiryId": "ENQ-20241201-001",
    "action": "create"
  },
  "timestamp": "2024-12-01T10:30:00Z"
}
```

#### 4.2 Get System Logs
```http
GET /logs/system?level=error&category=enquiry&startDate=2024-12-01&endDate=2024-12-01&page=1&limit=50
```

**Query Parameters:**
- `level` (string): Log level (debug, info, warn, error, fatal)
- `category` (string): Log category
- `startDate` (string): Start date filter
- `endDate` (string): End date filter
- `page` (number): Page number
- `limit` (number): Items per page

#### 4.3 Get Error Logs
```http
GET /logs/errors?severity=high&resolved=false
```

#### 4.4 Mark Log as Resolved
```http
PATCH /logs/system/{logId}/resolve
```

### 5. User Interactivity Tracking

#### 5.1 Track User Interaction
```http
POST /tracking/interaction
```

**Request Body:**
```json
{
  "event": "button_click",
  "element": "enquire_now",
  "page": "/products",
  "productId": "prod-123",
  "userId": "visitor-123",
  "sessionId": "session-456",
  "timestamp": "2024-12-01T10:30:00Z",
  "coordinates": {
    "x": 150,
    "y": 200
  },
  "timeOnPage": 45,
  "scrollDepth": 75
}
```

#### 5.2 Track Form Interactions
```http
POST /tracking/form
```

**Request Body:**
```json
{
  "formId": "enquiry_form",
  "action": "started",
  "fields": ["name", "email"],
  "userId": "visitor-123",
  "sessionId": "session-456",
  "timestamp": "2024-12-01T10:30:00Z",
  "timeSpent": 120
}
```

#### 5.3 Get User Journey
```http
GET /tracking/journey/{userId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "visitor-123",
    "sessions": [
      {
        "sessionId": "session-456",
        "startTime": "2024-12-01T10:00:00Z",
        "endTime": "2024-12-01T10:45:00Z",
        "duration": 2700,
        "pages": [
          {
            "page": "/",
            "entryTime": "2024-12-01T10:00:00Z",
            "exitTime": "2024-12-01T10:15:00Z",
            "timeOnPage": 900
          },
          {
            "page": "/products",
            "entryTime": "2024-12-01T10:15:00Z",
            "exitTime": "2024-12-01T10:45:00Z",
            "timeOnPage": 1800
          }
        ],
        "interactions": [
          {
            "event": "button_click",
            "element": "view_details",
            "timestamp": "2024-12-01T10:20:00Z"
          },
          {
            "event": "form_submit",
            "formId": "enquiry_form",
            "timestamp": "2024-12-01T10:40:00Z"
          }
        ]
      }
    ]
  }
}
```

### 6. General Settings Management

#### 6.1 Get All Settings
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

#### 6.2 Update General Settings
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

#### 6.3 Update Email Settings
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

#### 6.4 Update Notification Settings
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
  "notificationFrequency": "immediate",
  "notificationChannels": ["email", "sms", "webhook"]
}
```

#### 6.5 Update Security Settings
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
  "twoFactorAuth": false,
  "ipWhitelist": ["192.168.1.0/24"],
  "allowedDomains": ["greenbeam.com"]
}
```

### 7. Website Settings Management

#### 7.1 Get Website Settings
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
      "fontSize": "16px"
    },
    "content": {
      "siteTitle": "Greenbeam - Sustainable Energy Solutions",
      "siteDescription": "Leading provider of solar energy solutions in Rwanda",
      "homepageHero": {
        "title": "Powering Rwanda's Future",
        "subtitle": "Sustainable solar energy solutions for homes and businesses",
        "ctaText": "Explore Products",
        "ctaLink": "/products",
        "backgroundImage": "https://storage.greenbeam.com/hero-bg.jpg"
      },
      "aboutSection": {
        "title": "About Greenbeam",
        "content": "We are committed to providing sustainable energy solutions...",
        "showTeam": true,
        "showStats": true
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
        }
      }
    },
    "seo": {
      "metaTitle": "Greenbeam - Solar Energy Solutions Rwanda",
      "metaDescription": "Leading solar energy provider in Rwanda. Sustainable solutions for homes and businesses.",
      "metaKeywords": "solar energy, Rwanda, renewable energy, solar panels",
      "ogImage": "https://storage.greenbeam.com/og-image.jpg",
      "twitterCard": "summary_large_image",
      "googleAnalyticsId": "GA-123456789",
      "googleTagManagerId": "GTM-ABCDEF"
    },
    "social": {
      "facebook": "https://facebook.com/greenbeam",
      "twitter": "https://twitter.com/greenbeam",
      "linkedin": "https://linkedin.com/company/greenbeam",
      "instagram": "https://instagram.com/greenbeam",
      "youtube": "https://youtube.com/greenbeam"
    },
    "features": {
      "enableBlog": true,
      "enableNewsletter": true,
      "enableReviews": false,
      "enableChat": true,
      "enableSearch": true,
      "enableFilters": true,
      "productsPerPage": 12,
      "enablePagination": true
    },
    "performance": {
      "enableCaching": true,
      "cacheDuration": 3600,
      "enableCompression": true,
      "enableCDN": true,
      "cdnUrl": "https://cdn.greenbeam.com"
    }
  }
}
```

#### 7.2 Update Branding Settings
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
  "fontSize": "16px"
}
```

#### 7.3 Update Content Settings
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
    "backgroundImage": "https://storage.greenbeam.com/hero-bg.jpg"
  },
  "aboutSection": {
    "title": "About Greenbeam",
    "content": "We are committed to providing sustainable energy solutions...",
    "showTeam": true,
    "showStats": true
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
    }
  }
}
```

#### 7.4 Update SEO Settings
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

#### 7.5 Update Social Media Settings
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
  "socialIconsPosition": "footer"
}
```

#### 7.6 Update Feature Settings
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
  "enableWishlist": false
}
```

### 8. File Upload Management

#### 8.1 Upload File
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
    "originalName": "solar-panel.jpg",
    "url": "https://storage.greenbeam.com/products/solar-panel.jpg",
    "size": 2048576,
    "mimeType": "image/jpeg",
    "dimensions": {
      "width": 1920,
      "height": 1080
    },
    "uploadedAt": "2024-12-01T10:30:00Z"
  }
}
```

#### 8.2 Delete File
```http
DELETE /upload/{fileId}
```

### 9. Notification Management

#### 9.1 Get Notifications
```http
GET /notifications?unread=true&type=enquiry&page=1&limit=20
```

**Query Parameters:**
- `unread` (boolean): Filter unread notifications
- `type` (string): Filter by type (enquiry, system, alert)
- `page` (number): Page number
- `limit` (number): Items per page

#### 9.2 Mark Notification as Read
```http
PATCH /notifications/{notificationId}/read
```

#### 9.3 Mark All Notifications as Read
```http
PATCH /notifications/read-all
```

#### 9.4 Delete Notification
```http
DELETE /notifications/{notificationId}
```

### 10. Dashboard Statistics

#### 10.1 Get Dashboard Stats
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
      "newEnquiries": 45,
      "totalVisitors": 15420,
      "conversionRate": 2.8
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
    },
    "charts": {
      "enquiriesByDay": [
        {
          "date": "2024-11-25",
          "count": 12
        }
      ],
      "visitorsBySource": [
        {
          "source": "organic",
          "count": 6500
        }
      ]
    }
  }
}
```

## Error Responses

All API endpoints return consistent error responses:

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
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

## Rate Limiting

- **General endpoints**: 1000 requests per hour
- **Analytics endpoints**: 100 requests per hour
- **File upload**: 50 requests per hour
- **Authentication**: 10 requests per minute

## Webhooks

### 10.1 Configure Webhook
```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["enquiry.created", "enquiry.responded"],
  "secret": "webhook_secret_key",
  "active": true
}
```

### 10.2 Webhook Events

- `enquiry.created`: New enquiry submitted
- `enquiry.responded`: Enquiry responded to
- `enquiry.status_changed`: Enquiry status updated
- `product.created`: New product created
- `product.updated`: Product updated
- `product.deleted`: Product deleted
- `user.registered`: New user registered
- `system.error`: System error occurred

## Database Schema Recommendations

### Core Tables

1. **enquiries** - Store all customer enquiries
2. **products** - Store product information
3. **enquiry_responses** - Store admin responses to enquiries
4. **users** - Store admin users
5. **settings** - Store system settings
6. **analytics_events** - Store user activity
7. **system_logs** - Store system logs
8. **notifications** - Store system notifications
9. **files** - Store uploaded files
10. **webhooks** - Store webhook configurations

### Indexing Recommendations

- Index on `enquiries.created_at` for date filtering
- Index on `enquiries.status` for status filtering
- Index on `enquiries.email` for customer lookup
- Index on `analytics_events.timestamp` for analytics queries
- Index on `system_logs.level` and `system_logs.category` for log filtering

## Security Considerations

1. **Input Validation**: Validate all input data
2. **SQL Injection**: Use parameterized queries
3. **XSS Protection**: Sanitize user input
4. **CSRF Protection**: Implement CSRF tokens
5. **Rate Limiting**: Implement rate limiting
6. **HTTPS**: Use HTTPS for all communications
7. **Data Encryption**: Encrypt sensitive data
8. **Access Control**: Implement proper authorization
9. **Audit Logging**: Log all admin actions
10. **Backup**: Regular database backups

## Performance Optimization

1. **Caching**: Implement Redis caching for frequently accessed data
2. **Database Optimization**: Use proper indexing and query optimization
3. **CDN**: Use CDN for static assets
4. **Image Optimization**: Compress and resize images
5. **Pagination**: Implement proper pagination for large datasets
6. **Lazy Loading**: Implement lazy loading for images and content
7. **Compression**: Enable gzip compression
8. **Monitoring**: Implement performance monitoring
9. **Load Balancing**: Use load balancers for high traffic
10. **Database Sharding**: Consider sharding for large datasets 