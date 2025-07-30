"use client"

import { useState, useEffect, useRef } from "react"

interface SplineViewerProps {
  url: string
  className?: string
  fallback?: React.ReactNode
}

export default function SplineViewer({ url, className = "", fallback }: SplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = () => {
      setHasError(true)
      setIsLoaded(false)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    // Set a timeout to show fallback if Spline takes too long to load
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true)
      }
    }, 10000) // 10 seconds timeout

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
      clearTimeout(timeout)
    }
  }, [isLoaded])

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-400/20`}>
        {fallback || (
          <div className="text-center text-muted-foreground">
            <p>3D Scene Loading...</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {!isLoaded && (
        <div className={`${className} flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-400/20`}>
          <div className="text-center text-muted-foreground">
            <div className="animate-pulse">Loading 3D Experience...</div>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={url}
        frameBorder="0"
        width="100%"
        height="100%"
        title="Hyperscript 3D Background"
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
    </>
  )
}
