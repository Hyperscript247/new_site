import sanitizeHtmlLib from 'sanitize-html'

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML content
 * @returns Sanitized HTML content
 */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'a',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'img',
      'hr',
      'mark',
      'span',
      'div',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
      '*': ['class', 'style'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
    },
  })
}

/**
 * Sanitize HTML content with more lenient settings for trusted content
 * @param html - Raw HTML content
 * @returns Sanitized HTML content
 */
export function sanitizeHtmlLenient(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(['iframe']),
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      iframe: ['src', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  })
}

/**
 * Strip all HTML tags from content
 * @param html - HTML content
 * @returns Plain text content
 */
export function stripHtml(html: string): string {
  const sanitized = sanitizeHtmlLib(html, {
    allowedTags: [],
    allowedAttributes: {},
  })

  return sanitized.replace(/\s+/g, ' ').trim()
}
