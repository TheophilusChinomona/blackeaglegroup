import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const isEventPath = () => {
    return location.pathname.startsWith('/events')
  }

  // Close menu when route changes
  useEffect(() => {
    setExpanded(false)
    // Remove any forced hide classes from dropdowns so they can show on hover again
    const dropdowns = document.querySelectorAll('.events-dropdown-menu')
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('force-hide')
    })
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/property-services', label: 'Property Services' },
    { path: '/services', label: 'Services' },
    { path: '/clients', label: 'Clients' },
    { path: '/strategic-partners', label: 'Strategic Partners' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ]

  const eventLinks = [
    { path: '/events/cot', label: 'COT Golf Day' },
    { path: '/events/csir', label: 'CSIR Golf Day' },
  ]

  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#main-content" className="skip-link visually-hidden-focusable position-absolute" style={{ left: '-9999px', zIndex: 9999 }}>
        Skip to main content
      </a>
    <Navbar
      expand="lg"
      className={`navbar-light ftco_navbar ftco-navbar-light bg-white ${expanded ? 'menu-open' : 'menu-closed'}`}
      id="ftco-navbar"
      expanded={expanded}
      onToggle={setExpanded}
      role="navigation"
      aria-label="Main navigation"
      style={{ position: 'relative', zIndex: 1000, width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
        <Container fluid className="px-3 px-md-4">
          <Link to="/" className="navbar-brand me-auto" aria-label="Black Eagle Group Home" style={{ marginLeft: 0 }}>
            <img
              src="/images/Website Logo.png"
              className="img-responsive"
              alt="Black Eagle Group Logo"
              style={{ height: '50px' }}
            />
          </Link>
          <Navbar.Toggle 
            aria-controls="ftco-nav"
            aria-expanded={expanded}
            aria-label="Toggle navigation menu"
            className="ms-auto"
          >
            <span aria-hidden="true">☰</span> <span className="visually-hidden">Menu</span>
          </Navbar.Toggle>
        <Navbar.Collapse id="ftco-nav">
          <Nav className="ms-auto" role="menubar">
            {navLinks.slice(0, 3).map((link) => (
              <Nav.Item key={link.path} role="none" className="nav-item-spaced">
                <Nav.Link
                  as={Link}
                  to={link.path}
                  className={isActive(link.path) ? 'active' : ''}
                  onClick={() => setExpanded(false)}
                  role="menuitem"
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Nav.Link>
              </Nav.Item>
            ))}
            
            {/* Events with Hover Dropdown */}
            <Nav.Item 
              role="none" 
              className="nav-item-spaced events-nav-item"
              onMouseEnter={(e) => {
                // Remove force-hide class when hovering so dropdown can show
                const dropdown = e.currentTarget.querySelector('.events-dropdown-menu')
                if (dropdown) {
                  dropdown.classList.remove('force-hide')
                }
              }}
            >
              <Nav.Link
                as={Link}
                to="/events"
                className={isEventPath() ? 'active' : ''}
                onClick={() => setExpanded(false)}
                role="menuitem"
                aria-current={isEventPath() ? 'page' : undefined}
              >
                Events
              </Nav.Link>
              <div className="events-dropdown-menu">
                {eventLinks.map((eventLink) => (
                  <Link
                    key={eventLink.path}
                    to={eventLink.path}
                    className={`events-dropdown-item ${isActive(eventLink.path) ? 'active' : ''}`}
                    onClick={(e) => {
                      setExpanded(false)
                      // Hide dropdown immediately on click using class
                      const dropdown = e.currentTarget.closest('.events-nav-item')?.querySelector('.events-dropdown-menu')
                      if (dropdown) {
                        dropdown.classList.add('force-hide')
                      }
                    }}
                    role="menuitem"
                  >
                    {eventLink.label}
                  </Link>
                ))}
              </div>
            </Nav.Item>

            {navLinks.slice(3).map((link) => (
              <Nav.Item key={link.path} role="none" className="nav-item-spaced">
                <Nav.Link
                  as={Link}
                  to={link.path}
                  className={isActive(link.path) ? 'active' : ''}
                  onClick={() => setExpanded(false)}
                  role="menuitem"
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header

