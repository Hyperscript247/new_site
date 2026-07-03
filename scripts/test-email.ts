/**
 * Test script: Send a community welcome email via ZeptoMail
 * Uses the raw ZeptoMail SDK directly (no path alias) for standalone execution.
 */

const { SendMailClient } = require('zeptomail');

// Load env
require('dotenv').config ? require('dotenv').config() : null;

const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';
const token = process.env.ZEPTOMAIL_API_KEY;

if (!token) {
  console.error('❌ ZEPTOMAIL_API_KEY not found in environment');
  process.exit(1);
}

const client = new SendMailClient({ url, token });

const BRAND_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const BRAND_COLOR = '#667eea';

const htmlbody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hyperscript</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background: ${BRAND_GRADIENT}; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Hyperscript</h1>
  </div>
  <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: ${BRAND_COLOR}; margin-top: 0;">Welcome Test User!</p>
    <p style="font-size: 16px; line-height: 1.8;">
      Thank you for joining the <strong>Hyperscript Community</strong>! We're thrilled to have you as part of our vibrant network of tech professionals.
    </p>
    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 30px 0; border-radius: 5px;">
      <p style="margin: 0; font-size: 16px; color: #15803d;">
        Your registration has been <strong>received and is being processed</strong>. Our team will review your application and get back to you shortly.
      </p>
    </div>
    <h3 style="color: ${BRAND_COLOR}; font-size: 20px;">What's Next?</h3>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li style="margin: 10px 0; line-height: 1.6;">You'll receive a confirmation email once your application is approved</li>
      <li style="margin: 10px 0; line-height: 1.6;">Access to exclusive job opportunities and networking events</li>
      <li style="margin: 10px 0; line-height: 1.6;">Invitations to workshops, mentorship programs, and community gatherings</li>
      <li style="margin: 10px 0; line-height: 1.6;">Support for your professional growth and wellness</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hyperscript.ng" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
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
    <p style="margin: 5px 0;">© ${new Date().getFullYear()} Hyperscript. All rights reserved.</p>
  </div>
</body>
</html>
`;

console.log('Sending test community welcome email to tdboy59@gmail.com...');

client.sendMail({
  from: {
    address: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@hyperscript.ng',
    name: process.env.ZEPTOMAIL_FROM_NAME || 'Hyperscript',
  },
  to: [{
    email_address: {
      address: 'tdboy59@gmail.com',
      name: 'Test User',
    },
  }],
  subject: 'Welcome to the Hyperscript Community!',
  htmlbody: htmlbody,
}).then((resp) => {
  console.log('\n✅ Email sent successfully!');
  console.log('Response:', JSON.stringify(resp, null, 2));
}).catch((error) => {
  console.error('\n❌ Email failed!');
  console.error('Error:', error);
});
