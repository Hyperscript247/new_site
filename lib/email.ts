/**
 * Email utility for sending notifications
 *
 * This module handles sending email notifications to community members.
 * You can configure it to use any SMTP provider (Zoho, Gmail, Mailgun, etc.)
 *
 * OPTION 1: Use Resend (uncomment the code below)
 * OPTION 2: Use Nodemailer with any SMTP provider (recommended)
 * OPTION 3: Use another service like SendGrid, Mailgun, etc.
 */

interface CommunityWelcomeEmailParams {
  to: string;
  name: string;
}

export async function sendCommunityWelcomeEmail({ to, name }: CommunityWelcomeEmailParams) {
  try {
    // For now, just log the email (no actual sending)
    console.log('[EMAIL] Email notification (not sent - configure SMTP provider)');
    console.log(`[EMAIL] To: ${to}`);
    console.log(`[EMAIL] Name: ${name}`);
    console.log('[EMAIL] Subject: Welcome to the Hyperscript Community!');

    return { success: true, mode: 'development' };

    /* ====================================================================
     * OPTION 1: RESEND (Commented out - uncomment to use)
     * ====================================================================
     *
     * 1. Ensure resend is installed: npm install resend
     * 2. Set environment variable: RESEND_API_KEY
     * 3. Uncomment the code below:
     *
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log('[EMAIL] No RESEND_API_KEY found. Email notification skipped.');
      return { success: true, mode: 'development' };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Hyperscript Community <onboarding@hyperscript.ng>',
      to: [to],
      subject: 'Welcome to the Hyperscript Community!',
      html: generateWelcomeEmailHTML(name),
    });

    if (error) {
      console.error('[EMAIL] Failed to send email:', error);
      throw error;
    }

    console.log('[EMAIL] Welcome email sent successfully to:', to);
    return { success: true, data };
    */

    /* ====================================================================
     * OPTION 2: NODEMAILER WITH SMTP (Recommended for Zoho, Gmail, etc.)
     * ====================================================================
     *
     * 1. Install nodemailer: npm install nodemailer
     * 2. Set environment variables:
     *    SMTP_HOST=smtp.zoho.com (or your SMTP server)
     *    SMTP_PORT=587
     *    SMTP_USER=your-email@yourdomain.com
     *    SMTP_PASS=your-password
     *    EMAIL_FROM=Hyperscript Community <onboarding@hyperscript.ng>
     *
     * 3. Uncomment the code below:
     *
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Hyperscript Community <onboarding@hyperscript.ng>',
      to: to,
      subject: 'Welcome to the Hyperscript Community!',
      html: generateWelcomeEmailHTML(name),
    });

    console.log('[EMAIL] Welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    */

  } catch (error) {
    console.error('[EMAIL] Error in sendCommunityWelcomeEmail:', error);
    // Don't throw - just log and return success to not block registration
    return { success: true, mode: 'development', error: String(error) };
  }
}

function generateWelcomeEmailHTML(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Hyperscript Community</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Hyperscript!</h1>
        </div>

        <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #667eea; margin-top: 0;">Hello ${name},</p>

          <p style="font-size: 16px; line-height: 1.8;">
            Thank you for joining the Hyperscript community! We're thrilled to have you as part of our vibrant network of tech professionals.
          </p>

          <p style="font-size: 16px; line-height: 1.8;">
            Your registration has been <strong>received and is being processed</strong>. Our team will review your application and get back to you shortly.
          </p>

          <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 5px;">
            <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">What's Next?</h2>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li style="margin: 10px 0;">You'll receive a confirmation email once your application is approved</li>
              <li style="margin: 10px 0;">Access to exclusive job opportunities and networking events</li>
              <li style="margin: 10px 0;">Invitations to workshops, mentorship programs, and community gatherings</li>
              <li style="margin: 10px 0;">Support for your professional growth and wellness</li>
            </ul>
          </div>

          <p style="font-size: 16px; line-height: 1.8;">
            In the meantime, feel free to explore our website and connect with us on social media to stay updated with the latest from the community.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://hyperscript.ng" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Visit Our Website
            </a>
          </div>

          <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            If you have any questions, please don't hesitate to reach out to us.
          </p>

          <p style="font-size: 14px; color: #666;">
            Best regards,<br>
            <strong>The Hyperscript Team</strong>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Hyperscript. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}
