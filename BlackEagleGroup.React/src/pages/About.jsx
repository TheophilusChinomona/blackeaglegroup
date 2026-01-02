import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import ProfileDownloadCard from '@/components/ProfileDownloadCard'
import ComplianceCard from '@/components/ComplianceCard'
import AnimatedElement from '@/components/animations/AnimatedElement'
import EventContactModal from '@/components/EventContactModal'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { cn } from '@/utils'
import '@/styles/about.css'

// Reusable hook for visibility and reduced motion
const useCardEffects = () => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return { cardRef, shouldAnimate: isVisible && !prefersReducedMotion }
}

// Wrapper component for spotlight cards
const SpotlightCard = ({ children, className }) => {
  const { cardRef, shouldAnimate } = useCardEffects()

  if (shouldAnimate) {
    return (
      <div ref={cardRef} className={className}>
        <CardSpotlight className="rounded-xl h-full">
          {children}
        </CardSpotlight>
      </div>
    )
  }

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}

const ABOUT_STATS = [
  {
    value: '20+',
    label: 'Years of leadership',
    note: 'Marketing and stakeholder relations expertise.'
  },
  {
    value: '3',
    label: 'Core service lines',
    note: 'Stakeholder, events, and sponsorship management.'
  },
  {
    value: 'PSIRA',
    label: 'Registered partner',
    note: 'Reg. 3031824.'
  },
  {
    value: '2012',
    label: 'Company registration',
    note: 'Established corporate presence.'
  }
]

const STORY_PARAGRAPHS = [
  'Group Holdings Pty Ltd is a premier provider of stakeholder relations management, golf events management, and sponsorship management and organization. Founded by Mr. Mandla Mndawe, our company is dedicated to delivering exceptional services to both state-owned entities and private sector companies.',
  'At Group Holdings Pty Ltd, we are committed to helping our clients achieve their objectives through strategic stakeholder engagement and expertly managed events. Join us in making a difference, one relationship and one event at a time.',
  'Group Holdings Pty Ltd Company presents a unique marketing, advertising, and promotional opportunity under the leadership of its founder and CEO, Mr. Mandla Mndawe. With over twenty years of marketing experience, Mr. Mndawe offers clients a distinctive advantage through his stakeholder relations management services.',
  'In addition to his marketing expertise, Mr. Mndawe brings valuable security experience from his tenure at the Department of Correctional Services. There, he specialized in internal and external custody, community corrections services, and rehabilitation programs, focusing on order and discipline enforcement.',
  'Moreover, Mr. Mndawe is an experienced new and pre-owned vehicle sales broker, having worked with prestigious brands such as Jaguar Land Rover and Lexus for over twenty years.'
]

const VALUES = [
  {
    title: 'Our Mission',
    description: 'To provide top-tier stakeholder relations and event management services that exceed client expectations, while fostering community development and promoting golf among the youth.'
  },
  {
    title: 'Our Vision',
    description: 'To be the leading company in stakeholder relations and event management in South Africa, recognized for our professionalism, integrity, and positive community impact.'
  }
]

const SERVICES = [
  'Stakeholder Relations Management',
  'Golf Events Management',
  'Sponsorship Management',
  'Post-Event Management',
  'Corporate Services',
  'Youth Golf Development'
]

const COMPLIANCE_CARDS = [
  { icon: '🛡️', title: 'PSIRA Registration', value: '3031824' },
  { icon: '🏢', title: 'Company Registration', value: '2012/086451/07' },
  { icon: '🏦', title: 'FNB Bank Account', value: '63043545110' },
  { icon: '🏦', title: 'ABSA Bank Account', value: '4113233815' }
]

const PROFILES = [
  {
    title: 'Cleaning Services Profile',
    description: 'Comprehensive cleaning services for corporate and commercial clients.',
    file: '/BE Profile2.pdf',
    icon: '🧹'
  },
  {
    title: 'Security Services Profile',
    description: 'Professional security solutions with PSIRA compliance.',
    file: '/BE Profile.pdf',
    icon: '🛡️'
  },
  {
    title: 'CDP & Events Management',
    description: 'Community development and premier event management services.',
    file: '/CDP & Events Management Profile.pdf',
    icon: '🎯'
  }
]

const TEAM_MEMBERS = [
  { name: 'Mandla Mndawe', role: 'CEO', image: '/images/MM.png' },
  { name: 'Siegfried Mboweni', role: 'Brand Manager', image: '/images/SR.png' },
  { name: 'Kabelo Mokoena', role: 'Stakeholder Relations Manager', image: '/images/KM.png' }
]

const AboutIntroSection = ({ onContactClick }) => (
  <section className="about-section about-intro-section">
    <Container className="about-intro-content">
      <Row className="align-items-center g-4">
        <Col lg={6}>
          <AnimatedElement as="div">
            <SectionHeader
              label="About"
              title="Relationships built on trust, delivered with precision"
              description="Black Eagle Group Holdings brings strategic stakeholder relations and event excellence under one disciplined, client-first team."
              align="left"
            />
          </AnimatedElement>
          <AnimatedElement as="p" className="about-intro-lead" delay={0.1}>
            We blend stakeholder engagement, sponsorship strategy, and meticulous event execution to support public sector and corporate partners across South Africa.
          </AnimatedElement>
          <AnimatedElement as="div" className="about-intro-actions" delay={0.15}>
            <button onClick={onContactClick} className="btn-gold">
              Start a Project
            </button>
            <Link to="/services" className="about-text-link">
              Explore Services
            </Link>
          </AnimatedElement>
        </Col>
        <Col lg={6}>
          <div className="about-stat-grid">
            {ABOUT_STATS.map((stat, index) => (
              <AnimatedElement
                as="div"
                delay={0.05 + index * 0.05}
                key={stat.label}
              >
                <SpotlightCard>
                  <div className="about-stat-card">
                    <span className="about-stat-value">{stat.value}</span>
                    <span className="about-stat-label">{stat.label}</span>
                    <p className="about-stat-note">{stat.note}</p>
                  </div>
                </SpotlightCard>
              </AnimatedElement>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

const AboutStorySection = () => (
  <section className="about-section about-story-section">
    <Container>
      <Row className="align-items-center g-5">
        <Col lg={6} className="order-2 order-lg-1">
          <AnimatedElement as="div" className="about-story-card">
            <SectionHeader
              label="Our Story"
              title="A legacy of stakeholder excellence"
              align="left"
            />
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <AnimatedElement
                as="p"
                className="about-story-text"
                delay={0.05 + index * 0.05}
                key={index}
              >
                {paragraph}
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Col>
        <Col lg={6} className="order-1 order-lg-2">
          <AnimatedElement as="div" className="about-story-image" delay={0.1}>
            <img
              src="/images/about.jpg"
              alt="Black Eagle Group team and event operations"
              loading="lazy"
              decoding="async"
            />
          </AnimatedElement>
        </Col>
      </Row>
    </Container>
  </section>
)

const FounderHighlightSection = () => (
  <section className="about-section about-founder-section" aria-label="Founder highlight">
    <Container className="about-founder-content">
      <Row className="align-items-center g-4">
        <Col lg={7}>
          <AnimatedElement as="span" className="about-eyebrow">
            Leadership
          </AnimatedElement>
          <AnimatedElement as="h2" className="about-founder-title" delay={0.05}>
            Founder-led, people-first delivery
          </AnimatedElement>
          <AnimatedElement as="p" className="about-founder-text" delay={0.1}>
            Mr. Mandla Mndawe, the visionary Founder and CEO of Black Eagle Group Company, holds a qualification in Stakeholder Relations Management from UNISA. With extensive experience and a commitment to excellence, he leads the company with a strategic and innovative approach to client satisfaction.
          </AnimatedElement>
        </Col>
        <Col lg={5}>
          <AnimatedElement as="div" className="about-founder-card" delay={0.15}>
            <h3>Leadership pillars</h3>
            <ul className="about-founder-list">
              <li>Empathy and responsiveness in stakeholder engagement.</li>
              <li>Operational discipline for complex event delivery.</li>
              <li>Community impact through youth golf development.</li>
            </ul>
          </AnimatedElement>
        </Col>
      </Row>
    </Container>
  </section>
)

const MissionVisionSection = () => (
  <section className="about-section about-values-section">
    <Container>
      <AnimatedElement as="div">
        <SectionHeader
          label="Purpose"
          title="Mission and Vision"
          description="Clear purpose keeps every partnership focused on measurable impact."
        />
      </AnimatedElement>
      <Row className="g-4 about-values-grid">
        {VALUES.map((value, index) => (
          <Col lg={6} key={value.title}>
            <AnimatedElement
              as="div"
              delay={0.05 + index * 0.05}
            >
              <SpotlightCard className="h-full">
                <div className="about-value-card">
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-text">{value.description}</p>
                </div>
              </SpotlightCard>
            </AnimatedElement>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
)

const ServicesSection = () => (
  <section className="about-section about-services-section">
    <Container>
      <AnimatedElement as="div">
        <SectionHeader
          label="Capabilities"
          title="Services that move organizations forward"
          description="From stakeholder relations to post-event reporting, we deliver end-to-end execution."
        />
      </AnimatedElement>
      <Row className="g-4 about-services-grid">
        {SERVICES.map((service, index) => (
          <Col md={6} lg={4} key={service}>
            <AnimatedElement
              as="div"
              delay={0.05 + index * 0.04}
            >
              <SpotlightCard className="h-full">
                <div className="about-service-card">
                  <span className="about-service-index">
                    {`Service ${String(index + 1).padStart(2, '0')}`}
                  </span>
                  <h3 className="about-service-title">{service}</h3>
                  <p className="about-service-text">
                    Tailored programs built for measurable stakeholder trust and event outcomes.
                  </p>
                </div>
              </SpotlightCard>
            </AnimatedElement>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
)

const TeamSection = () => (
  <section className="about-section about-team-section">
    <Container>
      <AnimatedElement as="div">
        <SectionHeader
          label="Leadership"
          title="The team behind every partnership"
          description="A focused leadership group driving strategy, delivery, and brand stewardship."
        />
      </AnimatedElement>
      <Row className="g-4">
        {TEAM_MEMBERS.map((member, index) => (
          <Col md={6} lg={4} key={member.name}>
            <AnimatedElement
              as="div"
              delay={0.05 + index * 0.05}
            >
              <SpotlightCard className="h-full">
                <article className="about-team-card">
                  <div className="about-team-image">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      loading="lazy"
                      decoding="async"
                      width="320"
                      height="320"
                    />
                  </div>
                  <div className="about-team-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </article>
              </SpotlightCard>
            </AnimatedElement>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
)

const ComplianceSection = () => (
  <section className="about-section about-compliance-section">
    <Container>
      <AnimatedElement as="div">
        <SectionHeader
          label="Compliance"
          title="Trusted operational credentials"
          description="We maintain active registrations and verified banking compliance."
        />
      </AnimatedElement>
      <div className="compliance-cards">
        {COMPLIANCE_CARDS.map((card, index) => (
          <AnimatedElement as="div" delay={0.05 + index * 0.05} key={card.title}>
            <ComplianceCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              index={index}
            />
          </AnimatedElement>
        ))}
      </div>
    </Container>
  </section>
)

const CompanyProfilesSection = () => (
  <section className="about-section about-profiles-section">
    <Container>
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <AnimatedElement as="div">
            <SectionHeader
              label="Resources"
              title="Company Profiles"
              description="Download our detailed profiles to explore services, certifications, and capabilities."
            />
          </AnimatedElement>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="profile-cards">
            {PROFILES.map((profile, index) => (
              <AnimatedElement
                as="div"
                delay={0.05 + index * 0.05}
                key={profile.title}
              >
                <ProfileDownloadCard
                  title={profile.title}
                  description={profile.description}
                  file={profile.file}
                  icon={profile.icon}
                />
              </AnimatedElement>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

const AboutCTASection = ({ onContactClick }) => (
  <section className="about-cta-section">
    <Container>
      <AnimatedElement as="div" className="about-cta-content">
        <h2>Ready to build a high-impact partnership?</h2>
        <p>
          Share your goals with us and we will craft a stakeholder and event strategy
          that delivers measurable outcomes.
        </p>
        <button onClick={onContactClick} className="btn-gold">
          Contact the Team
        </button>
      </AnimatedElement>
    </Container>
  </section>
)

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Black Eagle Group Holdings - our mission, vision, leadership team, and commitment to excellence in stakeholder relations, golf events, and sponsorship management."
        path="/about"
        image="/images/about.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />
      <Hero
        title="About Us"
        subtitle="Strategic stakeholder relations, refined event delivery, and partnership excellence"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
        backgroundImage="/images/bg_2.jpg"
        backgroundVideo="/images/heros/about-hero.webm"
        backgroundVideoPoster="/images/bg_2.jpg"
      />

      <div className="about-page">
        <AboutIntroSection onContactClick={() => setIsContactModalOpen(true)} />
        <AboutStorySection />
        <FounderHighlightSection />
        <MissionVisionSection />
        <ServicesSection />
        <TeamSection />
        <ComplianceSection />
        <CompanyProfilesSection />
        <AboutCTASection onContactClick={() => setIsContactModalOpen(true)} />
      </div>

      <EventContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  )
}

export default About
