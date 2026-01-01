import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils'

/**
 * BlogPostCard Component
 * Displays a blog post with image, title, excerpt, and read more link
 * Matches styling from public_html/blog.html
 */
const BlogPostCard = ({ image, title, excerpt, slug, className }) => {
  return (
    <div className={cn('flex justify-center mb-8', className)}>
      <Card className="w-full overflow-hidden border-0 shadow-sm">
        <Link to={`/blog/${slug}`} className="block">
          <div
            className="block-20 w-full h-[270px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={title}
          />
        </Link>
        <CardContent className="pt-4">
          <h3 className="text-lg font-normal mb-4">
            <Link 
              to={`/blog/${slug}`} 
              className="text-black hover:text-[#59B200] transition-colors"
            >
              {title}
            </Link>
          </h3>
          <p className="text-sm leading-6 text-gray-700 mb-4">{excerpt}</p>
          <Link
            to={`/blog/${slug}`}
            className="text-sm font-semibold uppercase text-black hover:text-[#59B200] transition-colors"
          >
            Read More
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogPostCard

