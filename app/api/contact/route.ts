import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getDefaultSender, getReplyToAddress, getAdminEmail } from '@/lib/zeptomail';
import { contactFormUserConfirmation, contactFormAdminNotification } from '@/lib/email-templates';

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const sender = getDefaultSender();
    const replyTo = getReplyToAddress();
    const adminEmail = getAdminEmail();

    // Send confirmation email to user
    const userEmailTemplates = contactFormUserConfirmation({ name, subject });
    const userEmailResult = await sendEmail({
      from: sender,
      reply_to: replyTo,
      to: [{ address: email, name }],
      subject: 'Thank you for contacting Hyperscript',
      htmlbody: userEmailTemplates.html,
      textbody: userEmailTemplates.text,
    });

    // Send notification to admin
    const adminEmailTemplates = contactFormAdminNotification({
      name,
      email,
      subject,
      message,
    });
    const adminEmailResult = await sendEmail({
      from: sender,
      reply_to: { address: email, name },
      to: [{ address: adminEmail, name: 'Admin' }],
      subject: `New Contact Form: ${subject}`,
      htmlbody: adminEmailTemplates.html,
      textbody: adminEmailTemplates.text,
    });

    // Return success even if one email fails (don't block user)
    if (!userEmailResult.success && !adminEmailResult.success) {
      console.error('[CONTACT API] Both emails failed');
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      userEmailSent: userEmailResult.success,
      adminEmailSent: adminEmailResult.success,
    });
  } catch (error) {
    console.error('[CONTACT API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
