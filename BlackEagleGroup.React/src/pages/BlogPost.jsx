import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug } from '@/data/blogPosts'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return (
      <div className="container mt-5">
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blog">Back to Blog</Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-wrap hero-wrap-2 js-fullheight" 
        style={{ backgroundImage: "url('/images/bg_2.jpg')" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
            <div className="col-md-9 ftco-animate pb-5">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">Home <i className="ion-ios-arrow-forward"></i></a>
                </span>
                <span>
                  <Link to="/blog">Blog <i className="ion-ios-arrow-forward"></i></Link>
                </span>
                <span>{post.title}</span>
              </p>
              <h1 className="mb-3 bread">{post.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <article className="blog-entry">
                {post.videoUrl ? (
                  <div className="mb-4">
                    <iframe
                      width="100%"
                      height="500"
                      src={post.videoUrl}
                      title={post.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : post.image ? (
                  <div
                    className="block-20 w-100 mb-4"
                    style={{ backgroundImage: `url(${post.image})`, height: '400px' }}
                  ></div>
                ) : null}
                
                <div className="text pt-4">
                  <div className="meta mb-3">
                    <div><a href="#">{post.date}</a></div>
                    <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                  </div>
                  <h2 className="heading">{post.title}</h2>
                  <div className="content mt-4">
                    <p>{post.content}</p>
                  </div>
                  <div className="mt-5">
                    <Link to="/blog" className="btn btn-primary">
                      ← Back to Blog
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPost

