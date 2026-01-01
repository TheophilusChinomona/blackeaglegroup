import { useState } from 'react'
import ReactPlayer from 'react-player'
import { cn } from '@/utils'

/**
 * VideoPlayer Component
 * Reusable video player component for YouTube videos
 * Maintains responsive aspect ratios and includes video controls
 * 
 * @param {string} url - YouTube video URL
 * @param {string} className - Additional CSS classes
 * @param {boolean} controls - Show video controls (default: true)
 * @param {boolean} playing - Auto-play video (default: false)
 * @param {boolean} loop - Loop video (default: false)
 * @param {string} width - Player width (default: '100%')
 * @param {string} height - Player height (default: 'auto')
 */
const VideoPlayer = ({
  url,
  className,
  controls = true,
  playing = false,
  loop = false,
  width = '100%',
  height = 'auto'
}) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState(null)

  if (!url) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">No video URL provided</p>
      </div>
    )
  }

  // Validate YouTube URL
  const isValidYouTubeUrl = ReactPlayer.canPlay(url)
  if (!isValidYouTubeUrl) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-red-500">Invalid video URL. Please provide a valid YouTube URL.</p>
      </div>
    )
  }

  return (
    <div
      className={cn('video-player-container relative', className)}
      role="region"
      aria-label="Video player"
    >
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
        <div className="absolute inset-0">
          <ReactPlayer
            url={url}
            controls={controls}
            playing={playing}
            loop={loop}
            width="100%"
            height="100%"
            onReady={() => setIsReady(true)}
            onError={(error) => {
              console.error('Video player error:', error)
              setError('Failed to load video')
            }}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                }
              }
            }}
          />
        </div>
      </div>
      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Loading video...</div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer

