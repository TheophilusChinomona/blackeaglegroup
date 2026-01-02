import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getCOTEvents, getCSIREvents, searchAndFilterEvents } from '@/utils/eventData'
import { isFutureEvent } from '@/utils/dateUtils'
import EventCarousel from '@/components/EventCarousel'
import EventCard from '@/components/EventCard'
import EventSearch from '@/components/EventSearch'
import EventFilter from '@/components/EventFilter'
import EventContactModal from '@/components/EventContactModal'
import { initScrollAnimations } from '@/utils/scrollAnimations'

const GolfEvents = () => {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const [cot, csir] = await Promise.all([
          getCOTEvents(),
          getCSIREvents()
        ])
        const events = [...cot, ...csir]
        setAllEvents(events)
        setFilteredEvents(events)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  // Apply search and filter when they change
  useEffect(() => {
    const applyFilters = async () => {
      if (allEvents.length === 0) return
      
      const filtered = await searchAndFilterEvents(searchKeyword, dateFilter, allEvents)
      setFilteredEvents(filtered)
    }
    
    applyFilters()
  }, [searchKeyword, dateFilter, allEvents])

  // Initialize scroll animations on mount
  useEffect(() => {
    initScrollAnimations()
  }, [])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const getEventImage = (event) => {
    // Try to get image from event data
    if (event.images && event.images.length > 0) {
      return event.images[0].original
    }
    if (event.hero?.carousel && event.hero.carousel.length > 0) {
      return event.hero.carousel[0].image
    }
    // Fallback images based on event type
    if (event.type === 'cot') {
      return '/cassi/img/projects/CoT.jpg'
    }
    if (event.type === 'csir') {
      return '/cassi/img/projects/WH.png'
    }
    return '/images/bg_1.jpg'
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // Build hero carousel items from all events
  const getHeroCarouselItems = () => {
    const carouselItems = []
    allEvents.forEach(event => {
      if (event.hero && event.hero.carousel) {
        carouselItems.push(...event.hero.carousel)
      }
    })
    // Fallback if no carousel items found
    if (carouselItems.length === 0) {
      return [{
        image: '/images/bg_1.jpg',
        title: 'Events',
        subtitle: 'Golf Events & Corporate Gatherings'
      }]
    }
    return carouselItems
  }

  return (
    <>
      {/* Hero Section */}
      <EventCarousel 
        items={getHeroCarouselItems()}
        showControls={allEvents.length > 1}
        showIndicators={allEvents.length > 1}
      />

      {/* Search and Filter Section */}
      <section className="ftco-section events-search-section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={12} lg={10}>
              <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                <div className="flex-grow-1" style={{ minWidth: '200px', maxWidth: '300px' }}>
                  <EventSearch
                    value={searchKeyword}
                    onChange={setSearchKeyword}
                    placeholder="Search"
                  />
                </div>
                <div className="flex-shrink-0">
                  <EventFilter
                    value={dateFilter}
                    onChange={setDateFilter}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Events Section */}
      <section className="ftco-section featured-events-section">
        <Container>
          {filteredEvents.length === 0 ? (
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <div className="event-no-results">
                  <h3>No events found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                  {(searchKeyword || dateFilter !== 'all') && (
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => {
                        setSearchKeyword('')
                        setDateFilter('all')
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="justify-content-center mb-5">
                <Col md={12} className="heading-section text-center ftco-animate">
                  <span className="subheading">Featured Events</span>
                  <h2 className="mb-2">Golf Events</h2>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {filteredEvents.map((event, index) => {
                  const eventImage = getEventImage(event)
                  const eventRoute = `/events/${event.type}`
                  const futureEvent = isFutureEvent(event.date)

                  return (
                    <Col 
                      key={event.id} 
                      xs={12} 
                      sm={12} 
                      md={6} 
                      lg={filteredEvents.length >= 3 ? 4 : 6}
                      className="mb-4"
                    >
                      <div 
                        className="ftco-animate"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <EventCard
                          image={eventImage}
                          title={event.title}
                          date={event.date}
                          location={event.location}
                          eventType={event.type}
                          isFutureEvent={futureEvent}
                          showRegisterButton={futureEvent}
                          onRegisterClick={() => handleRegisterClick(event)}
                          to={eventRoute}
                        />
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </>
          )}
        </Container>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventContactModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          event={selectedEvent}
          title={`Register Interest: ${selectedEvent.title}`}
          description="Fill out the form below to register your interest in this event. We'll get back to you soon!"
        />
      )}
    </>
  )
}

export default GolfEvents
