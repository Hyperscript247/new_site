'use client'

import { Button } from '@/components/ui/button'
import { Share2, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=600')
    setShowShareMenu(false)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        })
        setShowShareMenu(false)
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed')
      }
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />

          {/* Share Menu */}
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-background p-2 shadow-lg">
            <div className="space-y-1">
              <button
                onClick={() => handleShare('twitter')}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
                Share on X
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <Facebook className="h-4 w-4" />
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" />
                Share on WhatsApp
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
