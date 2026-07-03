/**
 * ZeptoMail Low-Level Client
 *
 * Provides the raw `sendEmail` function used by API routes that need full
 * control over the email payload (e.g. custom from/reply-to per request).
 *
 * For server actions and most application code, prefer the higher-level
 * helpers in `lib/email.ts` instead.
 *
 * @see https://www.npmjs.com/package/zeptomail
 */

import { SendMailClient } from 'zeptomail';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EmailAddress {
  address: string;
  name?: string;
}

interface EmailAttachment {
  content: string; // Base64 encoded content
  mime_type: string;
  name: string;
}

interface SendEmailParams {
  to: EmailAddress[];
  from: EmailAddress;
  reply_to?: EmailAddress;
  subject: string;
  htmlbody: string;
  textbody?: string;
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  attachments?: EmailAttachment[];
}

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------

let _client: InstanceType<typeof SendMailClient> | null = null;

function getClient(): InstanceType<typeof SendMailClient> {
  if (_client) return _client;

  const url = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';
  const token = process.env.ZEPTOMAIL_API_KEY;

  if (!token) {
    throw new Error('[ZEPTOMAIL] API key not configured');
  }

  _client = new SendMailClient({ url, token });
  return _client;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Transform flat EmailAddress[] → ZeptoMail's nested recipient shape */
function transformToZeptoMailFormat(
  addresses: EmailAddress[],
): Array<{ email_address: { address: string; name: string } }> {
  return addresses.map((addr) => ({
    email_address: {
      address: addr.address,
      name: addr.name || addr.address, // SDK requires name as string
    },
  }));
}

// ---------------------------------------------------------------------------
// Core send
// ---------------------------------------------------------------------------

/**
 * Send an email via the ZeptoMail SDK.
 *
 * This is the low-level function consumed by API routes that assemble their
 * own payloads. For typed, template-aware helpers see `lib/email.ts`.
 */
export async function sendEmail(
  params: SendEmailParams,
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const apiKey = process.env.ZEPTOMAIL_API_KEY;

  if (!apiKey) {
    console.error('[ZEPTOMAIL] API key not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const client = getClient();

    const payload: Record<string, unknown> = {
      from: {
        address: params.from.address,
        name: params.from.name || 'Hyperscript',
      },
      to: transformToZeptoMailFormat(params.to),
      subject: params.subject,
      htmlbody: params.htmlbody,
    };

    if (params.textbody) {
      payload.textbody = params.textbody;
    }
    if (params.reply_to) {
      payload.reply_to = [{
        address: params.reply_to.address,
        name: params.reply_to.name || params.reply_to.address,
      }];
    }
    if (params.cc && params.cc.length > 0) {
      payload.cc = transformToZeptoMailFormat(params.cc);
    }
    if (params.bcc && params.bcc.length > 0) {
      payload.bcc = transformToZeptoMailFormat(params.bcc);
    }
    if (params.attachments && params.attachments.length > 0) {
      payload.attachments = params.attachments;
    }

    const data = await client.sendMail(payload);
    console.log('[ZEPTOMAIL] Email sent successfully:', data?.message || 'OK');
    return { success: true, data };
  } catch (error) {
    console.error('[ZEPTOMAIL] Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ---------------------------------------------------------------------------
// Config accessors (unchanged API surface)
// ---------------------------------------------------------------------------

/** Get default sender email address */
export function getDefaultSender(): EmailAddress {
  return {
    address: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@hyperscript.ng',
    name: process.env.ZEPTOMAIL_FROM_NAME || 'Hyperscript',
  };
}

/** Get reply-to email address */
export function getReplyToAddress(): EmailAddress {
  return {
    address: process.env.EMAIL_REPLY_TO || 'info@hyperscript.ng',
    name: process.env.ZEPTOMAIL_FROM_NAME || 'Hyperscript',
  };
}

/** Get admin email address */
export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'admin@hyperscript.ng';
}

/** Get community email address */
export function getCommunityEmail(): string {
  return process.env.COMMUNITY_EMAIL || 'community@hyperscript.ng';
}
