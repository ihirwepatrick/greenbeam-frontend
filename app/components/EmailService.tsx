"use client"

interface EmailData {
  to: string
  subject: string
  body: string
  type: "customer_confirmation" | "admin_notification" | "enquiry_response"
}

class EmailService {
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Log the email for demonstration
      console.log("📧 Email sent:", {
        to: emailData.to,
        subject: emailData.subject,
        type: emailData.type,
        timestamp: new Date().toISOString()
      })
      
      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  static async sendCustomerConfirmation(
    customerEmail: string,
    customerName: string,
    productName: string,
    enquiryId: string
  ): Promise<boolean> {
    const subject = "Enquiry Received - Greenbeam"
    const body = `
Dear ${customerName},

Thank you for your enquiry about ${productName}. We have received your message and our team will review it within 24 hours.

Enquiry Details:
- Enquiry ID: ${enquiryId}
- Product: ${productName}
- Submitted: ${new Date().toLocaleString()}

What happens next:
1. Our team will review your requirements
2. We'll contact you with detailed information and pricing
3. We'll schedule a consultation if needed

If you have any urgent questions, please contact us:
- Phone: +250 788 123 456
- Email: info@greenbeam.com

Best regards,
The Greenbeam Team
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      body,
      type: "customer_confirmation"
    })
  }

  static async sendAdminNotification(
    adminEmail: string,
    customerName: string,
    productName: string,
    enquiryId: string
  ): Promise<boolean> {
    const subject = "New Product Enquiry - Admin Notification"
    const body = `
New enquiry received:

Customer: ${customerName}
Product: ${productName}
Enquiry ID: ${enquiryId}
Time: ${new Date().toLocaleString()}

Please review and respond within 24 hours.

Login to admin panel: /admin/enquiries
    `

    return this.sendEmail({
      to: adminEmail,
      subject,
      body,
      type: "admin_notification"
    })
  }

  static async sendEnquiryResponse(
    customerEmail: string,
    customerName: string,
    responseMessage: string,
    enquiryId: string
  ): Promise<boolean> {
    const subject = "Response to Your Enquiry - Greenbeam"
    const body = `
Dear ${customerName},

Thank you for your enquiry. Here is our response:

${responseMessage}

If you have any further questions, please don't hesitate to contact us:
- Phone: +250 788 123 456
- Email: info@greenbeam.com

Best regards,
The Greenbeam Team
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      body,
      type: "enquiry_response"
    })
  }
}

export default EmailService 