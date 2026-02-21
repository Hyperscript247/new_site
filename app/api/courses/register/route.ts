import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getDefaultSender, getReplyToAddress, getAdminEmail } from '@/lib/zeptomail';
import {
  courseRegistrationConfirmation,
  courseRegistrationAdminNotification,
} from '@/lib/email-templates';

/**
 * POST /api/courses/register
 * Handles course registration emails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, studentEmail, studentPhone, courseName, courseId, registrationId } = body;

    // Validate required fields
    if (!studentName || !studentEmail || !courseName || !courseId || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const sender = getDefaultSender();
    const replyTo = getReplyToAddress();
    const adminEmail = getAdminEmail();

    // Send confirmation email to student
    const studentEmailTemplates = courseRegistrationConfirmation({
      name: studentName,
      courseName,
      courseId,
    });
    const studentEmailResult = await sendEmail({
      from: sender,
      reply_to: replyTo,
      to: [{ address: studentEmail, name: studentName }],
      subject: `Course Registration Confirmation - ${courseName}`,
      htmlbody: studentEmailTemplates.html,
      textbody: studentEmailTemplates.text,
    });

    // Send notification to admin
    const adminEmailTemplates = courseRegistrationAdminNotification({
      studentName,
      studentEmail,
      studentPhone,
      courseName,
      courseId,
      registrationId,
    });
    const adminEmailResult = await sendEmail({
      from: sender,
      reply_to: { address: studentEmail, name: studentName },
      to: [{ address: adminEmail, name: 'Admin' }],
      subject: `New Course Registration: ${courseName}`,
      htmlbody: adminEmailTemplates.html,
      textbody: adminEmailTemplates.text,
    });

    // Return success even if one email fails
    if (!studentEmailResult.success && !adminEmailResult.success) {
      console.error('[COURSE REGISTRATION API] Both emails failed');
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration emails sent successfully!',
      studentEmailSent: studentEmailResult.success,
      adminEmailSent: adminEmailResult.success,
    });
  } catch (error) {
    console.error('[COURSE REGISTRATION API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
