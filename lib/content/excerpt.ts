/**
 * Extract plain text excerpt from HTML content
 * @param content - HTML content string
 * @param maxLength - Maximum length of excerpt (default: 160 for SEO)
 * @returns Plain text excerpt
 */
export function extractExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Strip HTML tags to get plain text
  const plainText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Truncate at the last complete word within maxLength
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}

/**
 * Generate excerpt with custom ending
 * @param content - HTML content string
 * @param maxLength - Maximum length of excerpt
 * @param ending - Custom ending string (default: '...')
 * @returns Plain text excerpt with custom ending
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160,
  ending: string = '...'
): string {
  const plainText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + ending
  }

  return truncated + ending
}
