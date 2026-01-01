import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'
import { trackPageView } from './utils/analytics'
import 'bootstrap/dist/css/bootstrap.min.css'

// Component to track page views on route changes
const PageViewTracker = () => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Clients = lazy(() => import('./pages/Clients'))
const StrategicPartners = lazy(() => import('./pages/StrategicPartners'))
const PropertyServices = lazy(() => import('./pages/PropertyServices'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const GolfEvents = lazy(() => import('./pages/GolfEvents'))

// Event pages - COT
const COTIndex = lazy(() => import('./pages/events/cot/Index'))
const COTAbout = lazy(() => import('./pages/events/cot/About'))
const COTContact = lazy(() => import('./pages/events/cot/Contact'))
const COTTeam = lazy(() => import('./pages/events/cot/Team'))
const COTGallery = lazy(() => import('./pages/events/cot/Gallery'))

// Event pages - CSIR
const CSIRIndex = lazy(() => import('./pages/events/csir/Index'))
const CSIRAbout = lazy(() => import('./pages/events/csir/About'))
const CSIREventDetail = lazy(() => import('./pages/events/csir/EventDetail'))
const CSIRAideMemoire = lazy(() => import('./pages/events/csir/AideMemoire'))
const CSIRContact = lazy(() => import('./pages/events/csir/Contact'))
const CSIRGallery = lazy(() => import('./pages/events/csir/Gallery'))

// CASSI pages
const CASSIIndex = lazy(() => import('./pages/cassi/Index'))
const CASSIGallery = lazy(() => import('./pages/cassi/Gallery'))

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <div className="App">
        <Header />
        <main id="main-content" role="main">
          <ErrorBoundary>
            <Suspense fallback={<Spinner size="lg" className="py-5" />}>
              <Routes>
                <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                <Route path="/services" element={<ErrorBoundary><Services /></ErrorBoundary>} />
                <Route path="/clients" element={<ErrorBoundary><Clients /></ErrorBoundary>} />
                <Route path="/strategic-partners" element={<ErrorBoundary><StrategicPartners /></ErrorBoundary>} />
                <Route path="/property-services" element={<ErrorBoundary><PropertyServices /></ErrorBoundary>} />
                <Route path="/blog" element={<ErrorBoundary><Blog /></ErrorBoundary>} />
                <Route path="/blog/:slug" element={<ErrorBoundary><BlogPost /></ErrorBoundary>} />
                <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
                <Route path="/events" element={<ErrorBoundary><GolfEvents /></ErrorBoundary>} />
                
                {/* COT nested routes */}
                <Route path="/events/cot" element={<ErrorBoundary><COTIndex /></ErrorBoundary>} />
                <Route path="/events/cot/about" element={<ErrorBoundary><COTAbout /></ErrorBoundary>} />
                <Route path="/events/cot/contact" element={<ErrorBoundary><COTContact /></ErrorBoundary>} />
                <Route path="/events/cot/team" element={<ErrorBoundary><COTTeam /></ErrorBoundary>} />
                <Route path="/events/cot/gallery" element={<ErrorBoundary><COTGallery /></ErrorBoundary>} />
                
                {/* CSIR nested routes */}
                <Route path="/events/csir" element={<ErrorBoundary><CSIRIndex /></ErrorBoundary>} />
                <Route path="/events/csir/about" element={<ErrorBoundary><CSIRAbout /></ErrorBoundary>} />
                <Route path="/events/csir/event-detail" element={<ErrorBoundary><CSIREventDetail /></ErrorBoundary>} />
                <Route path="/events/csir/aide-memoire" element={<ErrorBoundary><CSIRAideMemoire /></ErrorBoundary>} />
                <Route path="/events/csir/contact" element={<ErrorBoundary><CSIRContact /></ErrorBoundary>} />
                <Route path="/events/csir/gallery" element={<ErrorBoundary><CSIRGallery /></ErrorBoundary>} />
                
                {/* CASSI routes */}
                <Route path="/cassi" element={<ErrorBoundary><CASSIIndex /></ErrorBoundary>} />
                <Route path="/cassi/:galleryId" element={<ErrorBoundary><CASSIGallery /></ErrorBoundary>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
