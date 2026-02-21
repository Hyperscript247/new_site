/**
 * Email Templates for Hyperscript
 *
 * Professional, branded email templates for all system notifications
 */

const BRAND_COLOR = '#667eea';
const BRAND_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

/**
 * Base email layout wrapper
 */
function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hyperscript</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <!-- Header -->
  <div style="background: ${BRAND_GRADIENT}; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Hyperscript</h1>
  </div>

  <!-- Content -->
  <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    ${content}
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 30px; padding: 20px; color: #999; font-size: 12px;">
    <p style="margin: 5px 0;">© ${new Date().getFullYear()} Hyperscript. All rights reserved.</p>
    <p style="margin: 5px 0;">
      <a href="https://hyperscript.ng" style="color: ${BRAND_COLOR}; text-decoration: none;">Visit Website</a> |
      <a href="https://hyperscript.ng/contact" style="color: ${BRAND_COLOR}; text-decoration: none;">Contact Us</a>
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Contact Form - User Confirmation
 */
export function contactFormUserConfirmation(params: { name: string; subject: string }): { html: string; text: string } {
  const html = emailLayout(`
    <p style="font-size: 18px; color: ${BRAND_COLOR}; margin-top: 0;">Hello ${params.name},</p>

    <p style="font-size: 16px; line-height: 1.8;">
      Thank you for contacting Hyperscript! We've received your message regarding <strong>"${params.subject}"</strong>.
    </p>

    <div style="background: #f9fafb; border-left: 4px solid ${BRAND_COLOR}; padding: 20px; margin: 30px 0; border-radius: 5px;">
      <p style="margin: 0; font-size: 16px; color: #555;">
        Our team will review your inquiry and get back to you within <strong>24 hours</strong>.
      </p>
    </div>

    <p style="font-size: 16px; line-height: 1.8;">
      In the meantime, feel free to explore our courses and community programs on our website.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hyperscript.ng" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        Visit Our Website
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
      Best regards,<br>
      <strong>The Hyperscript Team</strong>
    </p>
  `);

  const text = `
Hello ${params.name},

Thank you for contacting Hyperscript! We've received your message regarding "${params.subject}".

Our team will review your inquiry and get back to you within 24 hours.

In the meantime, feel free to explore our courses and community programs on our website: https://hyperscript.ng

Best regards,
The Hyperscript Team
  `.trim();

  return { html, text };
}

/**
 * Contact Form - Admin Notification
 */
export function contactFormAdminNotification(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { html: string; text: string } {
  const html = emailLayout(`
    <h2 style="color: ${BRAND_COLOR}; margin-top: 0;">New Contact Form Submission</h2>

    <p style="font-size: 16px;">You've received a new message from the website contact form.</p>

    <div style="background: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; width: 100px;">Name:</td>
          <td style="padding: 10px 0;">${params.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 10px 0;"><a href="mailto:${params.email}" style="color: ${BRAND_COLOR};">${params.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Subject:</td>
          <td style="padding: 10px 0;">${params.subject}</td>
        </tr>
      </table>
    </div>

    <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #555;">Message:</p>
      <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${params.message}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="mailto:${params.email}?subject=Re: ${encodeURIComponent(params.subject)}" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        Reply to ${params.name}
      </a>
    </div>
  `);

  const text = `
New Contact Form Submission

Name: ${params.name}
Email: ${params.email}
Subject: ${params.subject}

Message:
${params.message}

Reply to: ${params.email}
  `.trim();

  return { html, text };
}

/**
 * Course Registration - Student Confirmation
 */
export function courseRegistrationConfirmation(params: {
  name: string;
  courseName: string;
  courseId: string;
}): { html: string; text: string } {
  const html = emailLayout(`
    <p style="font-size: 18px; color: ${BRAND_COLOR}; margin-top: 0;">Hello ${params.name},</p>

    <p style="font-size: 16px; line-height: 1.8;">
      Thank you for registering for <strong>${params.courseName}</strong>!
    </p>

    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 30px 0; border-radius: 5px;">
      <h3 style="margin: 0 0 10px 0; color: #166534;">✓ Registration Received</h3>
      <p style="margin: 0; font-size: 16px; color: #15803d;">
        Your registration has been received and is being reviewed by our team.
      </p>
    </div>

    <h3 style="color: ${BRAND_COLOR}; font-size: 20px;">What Happens Next?</h3>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li style="margin: 10px 0; line-height: 1.6;">Our team will review your application</li>
      <li style="margin: 10px 0; line-height: 1.6;">You'll receive a confirmation email once approved</li>
      <li style="margin: 10px 0; line-height: 1.6;">Course materials and schedule will be shared with you</li>
      <li style="margin: 10px 0; line-height: 1.6;">Payment details will be provided if applicable</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hyperscript.ng/courses/${params.courseId}" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        View Course Details
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
      Questions? Reply to this email or contact us at <a href="mailto:info@hyperscript.com" style="color: ${BRAND_COLOR};">info@hyperscript.com</a>
    </p>

    <p style="font-size: 14px; color: #666;">
      Best regards,<br>
      <strong>The Hyperscript Team</strong>
    </p>
  `);

  const text = `
Hello ${params.name},

Thank you for registering for ${params.courseName}!

✓ Registration Received
Your registration has been received and is being reviewed by our team.

What Happens Next?
• Our team will review your application
• You'll receive a confirmation email once approved
• Course materials and schedule will be shared with you
• Payment details will be provided if applicable

View course details: https://hyperscript.ng/courses/${params.courseId}

Questions? Reply to this email or contact us at info@hyperscript.com

Best regards,
The Hyperscript Team
  `.trim();

  return { html, text };
}

/**
 * Course Registration - Admin Notification
 */
export function courseRegistrationAdminNotification(params: {
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  courseName: string;
  courseId: string;
  registrationId: string;
}): { html: string; text: string } {
  const html = emailLayout(`
    <h2 style="color: ${BRAND_COLOR}; margin-top: 0;">New Course Registration</h2>

    <p style="font-size: 16px;">A student has registered for <strong>${params.courseName}</strong>.</p>

    <div style="background: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px 0; color: #555;">Student Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
          <td style="padding: 10px 0;">${params.studentName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 10px 0;"><a href="mailto:${params.studentEmail}" style="color: ${BRAND_COLOR};">${params.studentEmail}</a></td>
        </tr>
        ${params.studentPhone ? `
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td>
          <td style="padding: 10px 0;">${params.studentPhone}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Course:</td>
          <td style="padding: 10px 0;">${params.courseName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Registration ID:</td>
          <td style="padding: 10px 0;">${params.registrationId}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hyperscript.ng/admin/registrations/${params.registrationId}" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">
        Review Registration
      </a>
      <a href="mailto:${params.studentEmail}" style="background: white; border: 2px solid ${BRAND_COLOR}; color: ${BRAND_COLOR}; padding: 10px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">
        Contact Student
      </a>
    </div>
  `);

  const text = `
New Course Registration

A student has registered for ${params.courseName}.

Student Information:
Name: ${params.studentName}
Email: ${params.studentEmail}
${params.studentPhone ? `Phone: ${params.studentPhone}` : ''}
Course: ${params.courseName}
Registration ID: ${params.registrationId}

Review registration: https://hyperscript.ng/admin/registrations/${params.registrationId}
Contact student: ${params.studentEmail}
  `.trim();

  return { html, text };
}

/**
 * Community Membership - Welcome Email
 */
export function communityWelcomeEmail(params: { name: string }): { html: string; text: string } {
  const html = emailLayout(`
    <p style="font-size: 18px; color: ${BRAND_COLOR}; margin-top: 0;">Welcome ${params.name}!</p>

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
  `);

  const text = `
Welcome ${params.name}!

Thank you for joining the Hyperscript Community! We're thrilled to have you as part of our vibrant network of tech professionals.

Your registration has been received and is being processed. Our team will review your application and get back to you shortly.

What's Next?
• You'll receive a confirmation email once your application is approved
• Access to exclusive job opportunities and networking events
• Invitations to workshops, mentorship programs, and community gatherings
• Support for your professional growth and wellness

Visit our website: https://hyperscript.ng

If you have any questions, please don't hesitate to reach out to us.

Best regards,
The Hyperscript Team
  `.trim();

  return { html, text };
}

/**
 * Community Membership - Admin Notification
 */
export function communityMembershipAdminNotification(params: {
  name: string;
  email: string;
  phone?: string;
  profession?: string;
  membershipId: string;
}): { html: string; text: string } {
  const html = emailLayout(`
    <h2 style="color: ${BRAND_COLOR}; margin-top: 0;">New Community Membership Application</h2>

    <p style="font-size: 16px;">A new member has applied to join the Hyperscript Community.</p>

    <div style="background: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px 0; color: #555;">Applicant Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
          <td style="padding: 10px 0;">${params.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 10px 0;"><a href="mailto:${params.email}" style="color: ${BRAND_COLOR};">${params.email}</a></td>
        </tr>
        ${params.phone ? `
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td>
          <td style="padding: 10px 0;">${params.phone}</td>
        </tr>
        ` : ''}
        ${params.profession ? `
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Profession:</td>
          <td style="padding: 10px 0;">${params.profession}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Membership ID:</td>
          <td style="padding: 10px 0;">${params.membershipId}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://hyperscript.ng/admin/community/${params.membershipId}" style="background: ${BRAND_GRADIENT}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">
        Review Application
      </a>
      <a href="mailto:${params.email}" style="background: white; border: 2px solid ${BRAND_COLOR}; color: ${BRAND_COLOR}; padding: 10px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 0 10px 10px 0;">
        Contact Applicant
      </a>
    </div>
  `);

  const text = `
New Community Membership Application

A new member has applied to join the Hyperscript Community.

Applicant Information:
Name: ${params.name}
Email: ${params.email}
${params.phone ? `Phone: ${params.phone}` : ''}
${params.profession ? `Profession: ${params.profession}` : ''}
Membership ID: ${params.membershipId}

Review application: https://hyperscript.ng/admin/community/${params.membershipId}
Contact applicant: ${params.email}
  `.trim();

  return { html, text };
}
