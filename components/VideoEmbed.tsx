'use client'

import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'

interface VideoEmbedProps {
  videoId: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
  isNew?: boolean
  onAskAI?: (question: string) => void
}

export default function VideoEmbed({
  videoId,
  title,
  description,
  duration,
  category,
  thumbnail,
  isNew = false,
  onAskAI
}: VideoEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false)

  const handlePlay = () => {
    setShowEmbed(true)
  }

  const handleAskAI = () => {
    if (onAskAI) {
      onAskAI(`Tell me more about ${title.toLowerCase()}`)
    }
  }

  return (
    <div className="group">
      <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-lg overflow-hidden hover:border-vaulto-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-vaulto-primary/10">
        {/* Video Thumbnail/Embed */}
        <div className="relative aspect-video bg-gradient-to-br from-vaulto-primary/20 to-vaulto-secondary">
          <img 
            src={thumbnail} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {!showEmbed ? (
            // Thumbnail View
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="w-10 h-10 bg-vaulto-primary/80 rounded-full flex items-center justify-center group-hover:bg-vaulto-primary transition-colors hover:scale-110 transform duration-200"
                >
                  <Play className="w-5 h-5 text-vaulto-dark ml-0.5" />
                </button>
              </div>
              {/* Video Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-vaulto-dark/90 text-vaulto-light text-xs px-2 py-1 rounded flex items-center space-x-1">
                <span>{duration}</span>
              </div>
              {/* New Badge */}
              {isNew && (
                <div className="absolute top-2 left-2 bg-vaulto-primary text-vaulto-dark text-xs font-bold px-1.5 py-0.5 rounded text-[10px]">
                  NEW
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-2 right-2 bg-vaulto-dark/90 text-vaulto-light text-[10px] px-1.5 py-0.5 rounded">
                {category}
              </div>
            </>
          ) : (
            // Embedded Video
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
        
        {/* Video Content */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-vaulto-light mb-2 group-hover:text-vaulto-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-vaulto-light/70 mb-3 leading-relaxed text-xs line-clamp-2">
            {description}
          </p>
          
          {/* Video Actions */}
          <div className="flex items-center justify-between">
            {onAskAI && (
              <button 
                onClick={handleAskAI}
                className="bg-vaulto-primary/20 text-vaulto-primary hover:bg-vaulto-primary hover:text-vaulto-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 flex items-center space-x-1 text-xs"
              >
                <span>Ask AI</span>
              </button>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vaulto-light/60 hover:text-vaulto-primary transition-colors flex items-center space-x-1"
            >
              <span className="text-xs">YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
