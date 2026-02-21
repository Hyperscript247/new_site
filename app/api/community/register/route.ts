import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getDefaultSender, getReplyToAddress, getCommunityEmail } from '@/lib/zeptomail';
import {
  communityWelcomeEmail,
  communityMembershipAdminNotification,
} from '@/lib/email-templates';

/**
 * POST /api/community/register
 * Handles community membership registration emails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, profession, membershipId } = body;

    // Validate required fields
    if (!name || !email || !membershipId) {
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
    const communityEmail = getCommunityEmail();

    // Send welcome email to new member
    const memberEmailTemplates = communityWelcomeEmail({ name });
    const memberEmailResult = await sendEmail({
      from: sender,
      reply_to: replyTo,
      to: [{ address: email, name }],
      subject: 'Welcome to the Hyperscript Community!',
      htmlbody: memberEmailTemplates.html,
      textbody: memberEmailTemplates.text,
    });

    // Send notification to community admin
    const adminEmailTemplates = communityMembershipAdminNotification({
      name,
      email,
      phone,
      profession,
      membershipId,
    });
    const adminEmailResult = await sendEmail({
      from: sender,
      reply_to: { address: email, name },
      to: [{ address: communityEmail, name: 'Community Team' }],
      subject: `New Community Membership Application - ${name}`,
      htmlbody: adminEmailTemplates.html,
      textbody: adminEmailTemplates.text,
    });

    // Return success even if one email fails
    if (!memberEmailResult.success && !adminEmailResult.success) {
      console.error('[COMMUNITY REGISTRATION API] Both emails failed');
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome emails sent successfully!',
      memberEmailSent: memberEmailResult.success,
      adminEmailSent: adminEmailResult.success,
    });
  } catch (error) {
    console.error('[COMMUNITY REGISTRATION API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
