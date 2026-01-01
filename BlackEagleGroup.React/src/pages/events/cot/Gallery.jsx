import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import GalleryCarousel from '@/components/GalleryCarousel'
import Lightbox from '@/components/Lightbox'
import SEO from '@/components/SEO'

const COTGallery = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const cotEvent = await getEventById('cot-1')
        setEvent(cotEvent)
      } catch (error) {
        console.error('Error loading COT event:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [])

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/cot">Back to COT Event</Link>
      </div>
    )
  }

  const galleryImages = event.gallery?.images || []

  return (
    <div className="cot-theme">
      <SEO
        title={`${event.title} - Gallery`}
        description="COT Golf Day gallery"
        path="/events/cot/gallery"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5">
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">GALLERY</h1>
            <p className="text-white mt-3">
              <Link to="/events/cot" className="text-white">Home</Link>
              <i className="far fa-square text-primary px-2"></i>
              <span>Gallery</span>
            </p>
          </Col>
        </Row>
      </section>

      {/* Gallery Carousel */}
      {galleryImages.length > 0 ? (
        <GalleryCarousel 
          items={galleryImages}
          autoPlay={false}
          showControls={true}
          showIndicators={true}
          onImageClick={(index) => setLightboxIndex(index)}
        />
      ) : (
        <section className="container-fluid py-5">
          <Container>
            <div className="text-center py-5">
              <p className="text-muted">No gallery images available.</p>
            </div>
          </Container>
        </section>
      )}

      {/* Lightbox for carousel images */}
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <Lightbox 
          items={galleryImages} 
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}

export default COTGallery

