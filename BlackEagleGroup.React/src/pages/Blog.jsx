import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import BlogPostCard from '@/components/BlogPostCard'
import { blogPosts } from '@/data/blogPosts'

const Blog = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-wrap hero-wrap-2" 
        style={{ backgroundImage: "url('/images/bg_2.jpg')" }}
      >
        <div className="overlay"></div>
        <Container className="hero-content">
        </Container>
        <Col lg={12} className="hero-text-col">
          {/* Breadcrumbs */}
          <div className="hero-breadcrumbs">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <i className="ion-ios-arrow-forward"></i>
              <span>Blog</span>
            </span>
          </div>

          {/* Title */}
          <div className="hero-text text-center">
            <h1 className="hero-heading">Blog</h1>
          </div>
        </Col>
      </section>

      {/* Blog Posts Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row d-flex justify-content-center">
            {blogPosts.map((post) => (
              <div key={post.slug} className="col-md-10 text-center d-flex ftco-animate">
                {post.videoUrl ? (
                  <div className="blog-entry justify-content-end w-100">
                    <iframe
                      width="560"
                      height="315"
                      src={post.videoUrl}
                      title={post.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-100"
                      style={{ maxWidth: '560px', margin: '0 auto' }}
                    ></iframe>
                    <div className="text pt-4">
                      <div className="meta mb-3">
                        <div><a href="#">{post.date}</a></div>
                        <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                      </div>
                      <h3 className="heading mt-2">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p>{post.excerpt}</p>
                    </div>
                  </div>
                ) : (
                  <BlogPostCard
                    image={post.image}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog

