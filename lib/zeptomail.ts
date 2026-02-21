/**
 * ZeptoMail Email Service
 *
 * Handles all email sending via ZeptoMail REST API
 * Documentation: https://www.zoho.com/zeptomail/help/api/
 */

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

interface ZeptoMailAPIPayload {
  from: {
    address: string;
    name?: string;
  };
  to: Array<{
    email_address: {
      address: string;
      name?: string;
    };
  }>;
  subject: string;
  htmlbody: string;
  textbody?: string;
  reply_to?: {
    address: string;
    name?: string;
  };
  cc?: Array<{
    email_address: {
      address: string;
      name?: string;
    };
  }>;
  bcc?: Array<{
    email_address: {
      address: string;
      name?: string;
    };
  }>;
  attachments?: EmailAttachment[];
}

/**
 * Transform email addresses to ZeptoMail API format
 */
function transformToZeptoMailFormat(addresses: EmailAddress[]): Array<{ email_address: { address: string; name?: string } }> {
  return addresses.map(addr => {
    const emailAddress: { address: string; name?: string } = {
      address: addr.address,
    };
    // Only include name if it's present
    if (addr.name) {
      emailAddress.name = addr.name;
    }
    return { email_address: emailAddress };
  });
}

/**
 * Send email via ZeptoMail REST API
 */
export async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; data?: any; error?: string }> {
  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const apiUrl = process.env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  if (!apiKey) {
    console.error('[ZEPTOMAIL] API key not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Transform to ZeptoMail API format
    const payload: ZeptoMailAPIPayload = {
      from: {
        address: params.from.address,
        name: params.from.name || 'Hyperscript', // Ensure name is always present
      },
      to: transformToZeptoMailFormat(params.to),
      subject: params.subject,
      htmlbody: params.htmlbody,
    };

    // Add optional fields
    if (params.textbody) {
      payload.textbody = params.textbody;
    }
    if (params.reply_to) {
      payload.reply_to = {
        address: params.reply_to.address,
        name: params.reply_to.name,
      };
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

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[ZEPTOMAIL] API Error:', data);
      return { success: false, error: data.error?.message || data.message || 'Failed to send email' };
    }

    console.log('[ZEPTOMAIL] Email sent successfully:', data.message || 'Email sent');
    return { success: true, data };
  } catch (error) {
    console.error('[ZEPTOMAIL] Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get default sender email address
 */
export function getDefaultSender(): EmailAddress {
  return {
    address: process.env.EMAIL_FROM_ADDRESS || 'noreply@hyperscript.com',
    name: process.env.EMAIL_FROM_NAME || 'Hyperscript',
  };
}

/**
 * Get reply-to email address
 */
export function getReplyToAddress(): EmailAddress {
  return {
    address: process.env.EMAIL_REPLY_TO || 'info@hyperscript.com',
    name: process.env.EMAIL_FROM_NAME || 'Hyperscript',
  };
}

/**
 * Get admin email address
 */
export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'admin@hyperscript.com';
}

/**
 * Get community email address
 */
export function getCommunityEmail(): string {
  return process.env.COMMUNITY_EMAIL || 'community@hyperscript.com';
}
