import readingTime from 'reading-time'

/**
 * Calculate reading time from HTML content
 * @param content - HTML content string
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadingTime(content: string): number {
  // Strip HTML tags to get plain text
  const plainText = content.replace(/<[^>]*>/g, '')

  const stats = readingTime(plainText)

  // Return reading time in minutes, rounded up
  return Math.ceil(stats.minutes)
}

/**
 * Get formatted reading time text
 * @param minutes - Reading time in minutes
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read'
  }

  return `${minutes} min read`
}
