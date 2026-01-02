import { Link } from 'react-router-dom'
import BlogBlock from '@/components/shadcn-studio/blocks/blog-component-01/blog-component-01'
import { blogPosts } from '@/data/blogPosts'

const Blog = () => {
  const [featuredPost, ...remainingPosts] = blogPosts
  const blogCards = remainingPosts.map((post) => ({
    img: post.image,
    alt: post.title,
    title: post.title,
    description: post.excerpt,
    blogLink: `/blog/${post.slug}`
  }))

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <div className="container blog-hero-inner">
          <div className="blog-hero-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="blog-hero-divider">/</span>
            <span>Blog</span>
          </div>
          <div className="blog-hero-text">
            <p className="blog-hero-kicker">Journal</p>
            <h1 className="blog-hero-title">Blog</h1>
            <p className="blog-hero-lede">
              Field notes, partnerships, and community moments from Black Eagle Group Holdings.
            </p>
            <div className="blog-hero-meta">
              <span>{blogPosts.length} stories</span>
              <span>Community + Events</span>
              <span>Updated quarterly</span>
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="blog-featured-section">
          <div className="container">
            <div className="blog-section-head">
              <div>
                <p className="blog-section-kicker">Featured</p>
                <h2 className="blog-section-title">Latest highlight</h2>
              </div>
              <p className="blog-section-description">
                A closer look at our collaborations and the people behind the events.
              </p>
            </div>
            <div className="blog-featured">
              <div className="blog-featured-media">
                {featuredPost.videoUrl ? (
                  <div className="blog-featured-video">
                    <iframe
                      src={featuredPost.videoUrl}
                      title={featuredPost.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div
                    className="blog-featured-image"
                    style={{ backgroundImage: `url(${featuredPost.image})` }}
                    role="img"
                    aria-label={featuredPost.title}
                  />
                )}
              </div>
              <div className="blog-featured-content">
                <div className="blog-meta">
                  <span>{featuredPost.date}</span>
                  <span>Featured story</span>
                </div>
                <h3 className="blog-featured-title">
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h3>
                <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                <Link className="blog-cta" to={`/blog/${featuredPost.slug}`}>
                  Read the story
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <BlogBlock blogCards={blogCards} />
    </>
  )
}

export default Blog
