import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { cn } from '@/utils'

/**
 * BlogPostCard Component
 * Displays a blog post with image, title, excerpt, and read more link
 * Matches styling from public_html/blog.html
 */
const BlogPostCard = ({ image, title, excerpt, slug, date, className }) => {
  const fallbackImage = "linear-gradient(135deg, rgba(26, 28, 25, 0.9), rgba(75, 148, 0, 0.35))"
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (event) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const cardContent = (
    <article className={cn('blog-card', className)}>
      <Link to={`/blog/${slug}`} className="blog-card-media">
        <div
          className="blog-card-image"
          style={{ backgroundImage: image ? `url(${image})` : fallbackImage }}
          role="img"
          aria-label={title}
        />
        <span className="blog-card-tag">Insight</span>
      </Link>
      <div className="blog-card-body">
        <div className="blog-meta">
          <span>{date}</span>
          <span>Black Eagle Group</span>
        </div>
        <h3 className="blog-card-title">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        <Link className="blog-cta" to={`/blog/${slug}`}>
          Read the story
        </Link>
      </div>
    </article>
  )

  const shouldAnimate = isVisible && !prefersReducedMotion

  if (shouldAnimate) {
    return (
      <div ref={cardRef}>
        <CardSpotlight className="rounded-[22px]">
          {cardContent}
        </CardSpotlight>
      </div>
    )
  }

  return (
    <div ref={cardRef}>
      {cardContent}
    </div>
  )
}

export default BlogPostCard

