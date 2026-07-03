/**
 * Email Service — ZeptoMail Integration
 *
 * Centralized, reusable email service built on the official ZeptoMail SDK.
 * All app emails flow through this module. Each helper function pairs with
 * a branded template from `email-templates.ts` and handles both the user-
 * facing email and (where applicable) an admin notification.
 *
 * @see https://www.npmjs.com/package/zeptomail
 * @see lib/email-templates.ts for HTML/text template functions
 */

import { SendMailClient } from 'zeptomail';
import {
  communityWelcomeEmail,
  communityMembershipAdminNotification,
  courseRegistrationConfirmation,
  courseRegistrationAdminNotification,
  contactFormUserConfirmation,
  contactFormAdminNotification,
} from '@/lib/email-templates';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EmailAddress {
  address: string;
  name?: string;
}

interface SendMailOptions {
  /** Recipient(s) */
  to: EmailAddress[];
  /** Subject line */
  subject: string;
  /** HTML body — prefer using a template from email-templates.ts */
  htmlbody: string;
  /** Plain-text fallback (optional but recommended) */
  textbody?: string;
  /** Override the default sender */
  from?: EmailAddress;
  /** Reply-to address */
  replyTo?: EmailAddress;
  /** CC recipients */
  cc?: EmailAddress[];
  /** BCC recipients */
  bcc?: EmailAddress[];
}

interface EmailResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Lazily-initialised singleton client */
let _client: InstanceType<typeof SendMailClient> | null = null;

function getClient(): InstanceType<typeof SendMailClient> {
  if (_client) return _client;

  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';
  const token = process.env.ZEPTOMAIL_API_KEY;

  if (!token) {
    throw new Error('[EMAIL] ZEPTOMAIL_API_KEY is not configured in environment variables.');
  }

  _client = new SendMailClient({ url, token });
  return _client;
}

/** Default "from" address pulled from env */
function getDefaultSender(): { address: string; name: string } {
  return {
    address: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@hyperscript.ng',
    name: process.env.ZEPTOMAIL_FROM_NAME || 'Hyperscript',
  };
}

/** Admin email pulled from env */
function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'admin@hyperscript.ng';
}

/** Map our flat EmailAddress[] → ZeptoMail's nested payload shape */
function toRecipients(addresses: EmailAddress[]) {
  return addresses.map((addr) => ({
    email_address: {
      address: addr.address,
      name: addr.name || addr.address, // SDK requires name as string
    },
  }));
}

/** Map a single EmailAddress to the SDK reply_to format (array) */
function toReplyTo(addr: EmailAddress) {
  return [{ address: addr.address, name: addr.name || addr.address }];
}

// ---------------------------------------------------------------------------
// Core send function
// ---------------------------------------------------------------------------

/**
 * Send an email using the ZeptoMail SDK.
 *
 * This is the **lowest-level** function — all typed helpers below delegate to it.
 * You can also call it directly for one-off or custom emails.
 *
 * @example
 * ```ts
 * await sendMail({
 *   to: [{ address: 'user@example.com', name: 'Jane' }],
 *   subject: 'Hello',
 *   htmlbody: '<p>Hi Jane!</p>',
 * });
 * ```
 */
export async function sendMail(options: SendMailOptions): Promise<EmailResult> {
  try {
    const client = getClient();
    const sender = options.from ?? getDefaultSender();

    const payload: Record<string, unknown> = {
      from: {
        address: sender.address,
        name: sender.name || 'Hyperscript',
      },
      to: toRecipients(options.to),
      subject: options.subject,
      htmlbody: options.htmlbody,
    };

    if (options.textbody) {
      payload.textbody = options.textbody;
    }
    if (options.replyTo) {
      payload.reply_to = toReplyTo(options.replyTo);
    }
    if (options.cc && options.cc.length > 0) {
      payload.cc = toRecipients(options.cc);
    }
    if (options.bcc && options.bcc.length > 0) {
      payload.bcc = toRecipients(options.bcc);
    }

    const resp = await client.sendMail(payload);
    console.log('[EMAIL] Sent successfully:', options.subject);
    return { success: true, data: resp };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[EMAIL] Failed to send:', options.subject, '—', message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Typed helper: Community Welcome
// ---------------------------------------------------------------------------

interface CommunityWelcomeEmailParams {
  /** Recipient email */
  to: string;
  /** Recipient's full name */
  name: string;
  /** Community member's phone (optional — for admin notification) */
  phone?: string;
  /** Member's profession (optional — for admin notification) */
  profession?: string;
  /** Database membership ID (optional — for admin notification) */
  membershipId?: string;
}

/**
 * Send a branded welcome email to a new community member, with an
 * optional admin notification.
 */
export async function sendCommunityWelcomeEmail(
  params: CommunityWelcomeEmailParams,
): Promise<EmailResult> {
  const { html, text } = communityWelcomeEmail({ name: params.name });

  const memberResult = await sendMail({
    to: [{ address: params.to, name: params.name }],
    subject: 'Welcome to the Hyperscript Community!',
    htmlbody: html,
    textbody: text,
  });

  // Fire-and-forget admin notification (don't block the main result)
  if (params.membershipId) {
    const adminTemplate = communityMembershipAdminNotification({
      name: params.name,
      email: params.to,
      phone: params.phone,
      profession: params.profession,
      membershipId: params.membershipId,
    });

    sendMail({
      to: [{ address: getAdminEmail(), name: 'Admin' }],
      replyTo: { address: params.to, name: params.name },
      subject: `New Community Membership Application — ${params.name}`,
      htmlbody: adminTemplate.html,
      textbody: adminTemplate.text,
    }).catch((err) => console.error('[EMAIL] Admin notification failed:', err));
  }

  return memberResult;
}

// ---------------------------------------------------------------------------
// Typed helper: Course Registration
// ---------------------------------------------------------------------------

interface CourseRegistrationEmailParams {
  /** Student email */
  to: string;
  /** Student name */
  name: string;
  /** Course title */
  courseName: string;
  /** Course slug/ID for the link */
  courseId: string;
  /** Registration record ID */
  registrationId: string;
  /** Student phone (optional) */
  phone?: string;
}

/**
 * Send a course registration confirmation to the student and notify admin.
 */
export async function sendCourseRegistrationEmail(
  params: CourseRegistrationEmailParams,
): Promise<EmailResult> {
  const { html, text } = courseRegistrationConfirmation({
    name: params.name,
    courseName: params.courseName,
    courseId: params.courseId,
  });

  const studentResult = await sendMail({
    to: [{ address: params.to, name: params.name }],
    subject: `Registration Confirmed — ${params.courseName}`,
    htmlbody: html,
    textbody: text,
  });

  // Admin notification (fire-and-forget)
  const adminTemplate = courseRegistrationAdminNotification({
    studentName: params.name,
    studentEmail: params.to,
    studentPhone: params.phone,
    courseName: params.courseName,
    courseId: params.courseId,
    registrationId: params.registrationId,
  });

  sendMail({
    to: [{ address: getAdminEmail(), name: 'Admin' }],
    replyTo: { address: params.to, name: params.name },
    subject: `New Course Registration — ${params.courseName}`,
    htmlbody: adminTemplate.html,
    textbody: adminTemplate.text,
  }).catch((err) => console.error('[EMAIL] Admin course notification failed:', err));

  return studentResult;
}

// ---------------------------------------------------------------------------
// Typed helper: Contact Form
// ---------------------------------------------------------------------------

interface ContactFormEmailParams {
  /** Sender's name */
  name: string;
  /** Sender's email */
  email: string;
  /** Message subject */
  subject: string;
  /** Message body */
  message: string;
}

/**
 * Handle a contact form submission: send a confirmation to the user
 * and notify admin with the full message.
 */
export async function sendContactFormEmail(
  params: ContactFormEmailParams,
): Promise<{ userResult: EmailResult; adminResult: EmailResult }> {
  const userTemplate = contactFormUserConfirmation({
    name: params.name,
    subject: params.subject,
  });

  const userResult = await sendMail({
    to: [{ address: params.email, name: params.name }],
    subject: 'Thank you for contacting Hyperscript',
    htmlbody: userTemplate.html,
    textbody: userTemplate.text,
  });

  const adminTemplate = contactFormAdminNotification({
    name: params.name,
    email: params.email,
    subject: params.subject,
    message: params.message,
  });

  const adminResult = await sendMail({
    to: [{ address: getAdminEmail(), name: 'Admin' }],
    replyTo: { address: params.email, name: params.name },
    subject: `New Contact Form: ${params.subject}`,
    htmlbody: adminTemplate.html,
    textbody: adminTemplate.text,
  });

  return { userResult, adminResult };
}

// ---------------------------------------------------------------------------
// Re-export types for consumers
// ---------------------------------------------------------------------------

export type { EmailAddress, SendMailOptions, EmailResult };
