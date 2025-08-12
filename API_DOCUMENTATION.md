# Greenbeam E-commerce Complete API Documentation

## Overview
Complete API endpoints for Greenbeam system including enquiry management, product management, system monitoring, logging, user interactivity tracking, and settings management.

## Base URL
```
https://api.greenbeam.com/v1
```

## Authentication
```http
Authorization: Bearer <your-access-token>
```

## 1. System Monitoring & Analytics

### 1.1 User Activity Tracking
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
    "browser": "Chrome"
  },
  "location": {
    "country": "Rwanda",
    "city": "Kigali"
  }
}
```

### 1.2 Get Analytics Dashboard
```http
GET /analytics/dashboard?period=30d
```
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
      "conversionRate": 2.8
    },
    "traffic": {
      "sources": [
        {"source": "organic", "visitors": 6500, "percentage": 42.2}
      ]
    },
    "enquiries": {
      "total": 450,
      "conversionRate": 3.2
    }
  }
}
```

### 1.3 Get Real-time Analytics
```http
GET /analytics/realtime
```

## 2. System Logging

### 2.1 Create System Log
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
  "metadata": {
    "enquiryId": "ENQ-20241201-001",
    "action": "create"
  }
}
```

### 2.2 Get System Logs
```http
GET /logs/system?level=error&category=enquiry&startDate=2024-12-01&endDate=2024-12-01
```

### 2.3 Get Error Logs
```http
GET /logs/errors?severity=high&resolved=false
```

## 3. User Interactivity Tracking

### 3.1 Track User Interaction
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
  "coordinates": {"x": 150, "y": 200},
  "timeOnPage": 45,
  "scrollDepth": 75
}
```

### 3.2 Track Form Interactions
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
  "timeSpent": 120
}
```

### 3.3 Get User Journey
```http
GET /tracking/journey/{userId}
```

## 4. General Settings Management

### 4.1 Get All Settings
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
      "language": "en"
    },
    "email": {
      "smtpHost": "smtp.gmail.com",
      "smtpPort": 587,
      "smtpUser": "noreply@greenbeam.com",
      "fromName": "Greenbeam Team",
      "fromEmail": "noreply@greenbeam.com"
    },
    "notifications": {
      "emailNotifications": true,
      "adminEmail": "admin@greenbeam.com",
      "enquiryNotifications": true,
      "systemNotifications": true
    },
    "security": {
      "sessionTimeout": 3600,
      "maxLoginAttempts": 5,
      "passwordPolicy": {
        "minLength": 8,
        "requireUppercase": true,
        "requireNumbers": true
      }
    },
    "backup": {
      "autoBackup": true,
      "backupFrequency": "daily",
      "backupRetention": 30
    }
  }
}
```

### 4.2 Update General Settings
```http
PUT /settings/general
```

### 4.3 Update Email Settings
```http
PUT /settings/email
```

### 4.4 Update Notification Settings
```http
PUT /settings/notifications
```

### 4.5 Update Security Settings
```http
PUT /settings/security
```

## 5. Website Settings Management

### 5.1 Get Website Settings
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
      "fontFamily": "Inter"
    },
    "content": {
      "siteTitle": "Greenbeam - Sustainable Energy Solutions",
      "siteDescription": "Leading provider of solar energy solutions in Rwanda",
      "homepageHero": {
        "title": "Powering Rwanda's Future",
        "subtitle": "Sustainable solar energy solutions for homes and businesses",
        "ctaText": "Explore Products",
        "ctaLink": "/products"
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
      "metaDescription": "Leading solar energy provider in Rwanda",
      "metaKeywords": "solar energy, Rwanda, renewable energy",
      "googleAnalyticsId": "GA-123456789"
    },
    "social": {
      "facebook": "https://facebook.com/greenbeam",
      "twitter": "https://twitter.com/greenbeam",
      "linkedin": "https://linkedin.com/company/greenbeam",
      "instagram": "https://instagram.com/greenbeam"
    },
    "features": {
      "enableBlog": true,
      "enableNewsletter": true,
      "enableReviews": false,
      "enableChat": true,
      "enableSearch": true,
      "productsPerPage": 12
    }
  }
}
```

### 5.2 Update Branding Settings
```http
PUT /settings/website/branding
```

### 5.3 Update Content Settings
```http
PUT /settings/website/content
```

### 5.4 Update SEO Settings
```http
PUT /settings/website/seo
```

### 5.5 Update Social Media Settings
```http
PUT /settings/website/social
```

### 5.6 Update Feature Settings
```http
PUT /settings/website/features
```

## 6. File Upload Management

### 6.1 Upload File
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

### 6.2 Delete File
```http
DELETE /upload/{fileId}
```

## 7. Notification Management

### 7.1 Get Notifications
```http
GET /notifications?unread=true&type=enquiry&page=1&limit=20
```

### 7.2 Mark Notification as Read
```http
PATCH /notifications/{notificationId}/read
```

### 7.3 Mark All Notifications as Read
```http
PATCH /notifications/read-all
```

## 8. Dashboard Statistics

### 8.1 Get Dashboard Stats
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
      ]
    },
    "charts": {
      "enquiriesByDay": [
        {"date": "2024-11-25", "count": 12}
      ],
      "visitorsBySource": [
        {"source": "organic", "count": 6500}
      ]
    }
  }
}
```

## 9. Webhooks

### 9.1 Configure Webhook
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

### 9.2 Webhook Events
- `enquiry.created`: New enquiry submitted
- `enquiry.responded`: Enquiry responded to
- `enquiry.status_changed`: Enquiry status updated
- `product.created`: New product created
- `product.updated`: Product updated
- `product.deleted`: Product deleted
- `system.error`: System error occurred

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
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

## Rate Limiting
- **General endpoints**: 1000 requests per hour
- **Analytics endpoints**: 100 requests per hour
- **File upload**: 50 requests per hour
- **Authentication**: 10 requests per minute

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