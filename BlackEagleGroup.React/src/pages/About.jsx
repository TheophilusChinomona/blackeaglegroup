import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
import ProfileDownloadCard from '@/components/ProfileDownloadCard'
import ComplianceCard from '@/components/ComplianceCard'
import Hero from '@/components/Hero'
import AnimatedElement from '@/components/animations/AnimatedElement'

// Company Overview Section Component
const CompanyOverviewSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Image animation (0ms delay = 0 scroll progress offset)
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  // Text animations with staggered delays (converted to scroll progress offsets)
  // 50ms ≈ 0.05, 100ms ≈ 0.1, 150ms ≈ 0.15
  const subheadingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  const paragraphOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.15, 0.45], [20, 0])
  
  return (
    <section ref={sectionRef} className="ftco-section about-split-section">
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/About-1.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
                role="img"
                aria-label="Company overview image"
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: subheadingOpacity, y: subheadingY }}
              >
                About us
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: headingOpacity, y: headingY }}
              >
                Company Overview
              </motion.h2>
              <motion.p 
                style={{ opacity: paragraphOpacity, y: paragraphY }}
              >
                Group Holdings Pty Ltd is a premier provider of stakeholder relations management, golf events management, and sponsorship management and organization. Founded by Mr. Mandla Mndawe, our company is dedicated to delivering exceptional services to both state-owned entities and private sector companies. We pride ourselves on our expertise in corporate services and our commitment to community development through youth golf initiatives.
              </motion.p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Mission Section Component
const MissionSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const subheadingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  const paragraphOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.15, 0.45], [20, 0])
  
  return (
    <section ref={sectionRef} className="ftco-section about-split-section">
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/About-4.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
                role="img"
                aria-label="Mission image"
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: subheadingOpacity, y: subheadingY }}
              >
                About us
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: headingOpacity, y: headingY }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                style={{ opacity: paragraphOpacity, y: paragraphY }}
              >
                To provide top-tier stakeholder relations and event management services that exceed client expectations, while fostering community development and promoting golf among the youth.
              </motion.p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated List Item Component
const AnimatedListItem = ({ children, scrollYProgress, delay }) => {
  const itemOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const itemY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.li style={{ opacity: itemOpacity, y: itemY }}>
      {children}
    </motion.li>
  )
}

// Services List Section Component
const ServicesListSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const subheadingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  // List items with staggered delays (200ms, 250ms, 300ms, 350ms, 400ms, 450ms)
  // Converted to scroll progress offsets: 0.2, 0.25, 0.3, 0.35, 0.4, 0.45
  const listItems = [
    'Stakeholder Relations Management',
    'Golf Events Management',
    'Sponsorship Management',
    'Post-Event Management',
    'Corporate Services',
    'Youth Golf Development'
  ]
  
  return (
    <section ref={sectionRef} className="ftco-section about-split-section">
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/About-3.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
                role="img"
                aria-label="Services image"
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: subheadingOpacity, y: subheadingY }}
              >
                About us
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: headingOpacity, y: headingY }}
              >
                Our Services
              </motion.h2>
              <ul>
                {listItems.map((item, index) => {
                  const delay = 0.2 + (index * 0.05) // 0.2, 0.25, 0.3, 0.35, 0.4, 0.45
                  return (
                    <AnimatedListItem
                      key={index}
                      scrollYProgress={scrollYProgress}
                      delay={delay}
                    >
                      {item}
                    </AnimatedListItem>
                  )
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated Compliance Card Wrapper Component
const AnimatedComplianceCard = ({ icon, title, value, index, scrollYProgress }) => {
  const delay = 0.15 + (index * 0.05) // 0.15, 0.2, 0.25, 0.3
  const cardOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const cardY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.div style={{ opacity: cardOpacity, y: cardY }}>
      <ComplianceCard
        icon={icon}
        title={title}
        value={value}
        index={index}
      />
    </motion.div>
  )
}

// Compliance Information Section Component
const ComplianceInformationSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const subheadingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  // Compliance cards with staggered delays (150ms, 200ms, 250ms, 300ms)
  // Converted to scroll progress offsets: 0.15, 0.2, 0.25, 0.3
  const complianceCards = [
    { icon: "🛡️", title: "PSIRA Registration", value: "3031824" },
    { icon: "📋", title: "Company Registration", value: "2012/086451/07" },
    { icon: "🏦", title: "FNB Bank Account", value: "63043545110" },
    { icon: "🏦", title: "ABSA Bank Account", value: "4113233815" }
  ]
  
  return (
    <section ref={sectionRef} className="ftco-section about-split-section compliance-section">
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/About-4.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
                role="img"
                aria-label="Compliance information image"
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: subheadingOpacity, y: subheadingY }}
              >
                About us
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: headingOpacity, y: headingY }}
              >
                Compliance Information
              </motion.h2>
              <div className="compliance-cards">
                {complianceCards.map((card, index) => (
                  <AnimatedComplianceCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    value={card.value}
                    index={index}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// CEO and Founder Section Component (Dark Background)
const CEOFounderSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Subheading (0ms delay = 0 scroll progress offset)
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  // Heading (50ms delay ≈ 0.05 scroll progress offset)
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  // Paragraph (100ms delay ≈ 0.1 scroll progress offset)
  const paragraphOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  return (
    <section
      ref={sectionRef}
      className="ftco-section services-section img"
      style={{
        backgroundImage: "url('/images/bg_6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      aria-label="CEO and Founder section background"
    >
      <div className="overlay"></div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={7} className="text-center heading-section heading-section-white">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              About us
            </motion.span>
            <motion.h2 
              className="mb-3 text-white"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              CEO and Founder
            </motion.h2>
            <motion.p 
              className="text-white"
              style={{ opacity: paragraphOpacity, y: paragraphY }}
            >
              Mr. Mandla Mndawe, the visionary Founder and CEO of Black Eagle Group Company, holds a qualification in Stakeholder Relations Management from UNISA. With his extensive experience and dedication to excellence, Mr. Mndawe leads the company with a strategic and innovative approach, ensuring high standards of service delivery and client satisfaction
            </motion.p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Vision Section Component (Dark Background)
const VisionSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Subheading (0ms delay)
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  // Heading (50ms delay ≈ 0.05)
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  // Paragraph (100ms delay ≈ 0.1)
  const paragraphOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  return (
    <section
      ref={sectionRef}
      className="ftco-section services-section img"
      style={{
        backgroundImage: "url('/images/bg_6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      aria-label="Vision section background"
    >
      <div className="overlay"></div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={7} className="text-center heading-section heading-section-white">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              About us
            </motion.span>
            <motion.h2 
              className="mb-3 text-white"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              Our Vision
            </motion.h2>
            <motion.p 
              className="text-white"
              style={{ opacity: paragraphOpacity, y: paragraphY }}
            >
              To be the leading company in stakeholder relations and event management in South Africa, recognized for our professionalism, integrity, and positive community impact.
            </motion.p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated Paragraph Component for More About Section
const AnimatedParagraph = ({ children, scrollYProgress, delay }) => {
  const paragraphOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.p 
      className="text-white"
      style={{ opacity: paragraphOpacity, y: paragraphY }}
    >
      {children}
    </motion.p>
  )
}

// More About Section Component (Dark Background)
const MoreAboutSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Subheading (0ms delay)
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  // Heading (50ms delay ≈ 0.05)
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  // Paragraphs with staggered delays: 100ms, 200ms, 300ms, 400ms
  // Converted to scroll progress offsets: 0.1, 0.2, 0.3, 0.4
  const paragraphs = [
    "At Group Holdings Pty Ltd, we are committed to helping our clients achieve their objectives through strategic stakeholder engagement and expertly managed events. Join us in making a difference, one relationship and one event at a time.",
    "Group Holdings Pty Ltd Company presents a unique marketing, advertising, and promotional opportunity under the leadership of its founder and CEO, Mr. Mandla Mndawe. With over twenty years of marketing experience, Mr. Mndawe offers clients a distinctive advantage through his stakeholder relations management services. These services are characterized by empathy, responsiveness, tangibility, and dependability, aiming to create win-win situations for all stakeholders and clients.",
    "In addition to his marketing expertise, Mr. Mndawe brings valuable security experience from his tenure at the Department of Correctional Services. There, he specialized in internal and external custody, community corrections services, and rehabilitation programs, focusing on order and discipline enforcement.",
    "Moreover, Mr. Mndawe is an experienced new and pre-owned vehicle sales broker, having worked with prestigious brands such as Jaguar Land Rover and Lexus for over twenty years. This diverse background ensures that partnering with Black Eagle Group Company offers substantial benefits and expertise across various sectors."
  ]
  
  return (
    <section
      ref={sectionRef}
      className="ftco-section services-section img"
      style={{
        backgroundImage: "url('/images/bg_6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      aria-label="More About section background"
    >
      <div className="overlay"></div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={7} className="text-center heading-section heading-section-white">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              More
            </motion.span>
            <motion.h2 
              className="mb-3 text-white"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              About us
            </motion.h2>
            {paragraphs.map((text, index) => {
              const delay = 0.1 + (index * 0.1) // 0.1, 0.2, 0.3, 0.4
              return (
                <AnimatedParagraph
                  key={index}
                  scrollYProgress={scrollYProgress}
                  delay={delay}
                >
                  {text}
                </AnimatedParagraph>
              )
            })}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated Team Member Card Component
const AnimatedTeamMemberCard = ({ member, index, scrollYProgress, hoveredMember, setHoveredMember }) => {
  const delay = 0.1 + (index * 0.1) // 0.1, 0.2, 0.3
  const cardOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const cardY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <Col md={4} lg={4} className="team-member-col">
      <motion.div 
        className="team-member-card"
        style={{ opacity: cardOpacity, y: cardY }}
        tabIndex={0}
        role="article"
        aria-label={`${member.name}, ${member.role}`}
        onMouseEnter={() => setHoveredMember(index)}
        onMouseLeave={() => setHoveredMember(null)}
        onFocus={() => setHoveredMember(index)}
        onBlur={() => setHoveredMember(null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setHoveredMember(index)
          }
        }}
      >
        <div className="team-member-image-wrapper">
          <img 
            src={member.image} 
            alt={`${member.name} - ${member.role}`}
            className="team-member-image"
            loading="lazy" 
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            width="300"
            height="300"
          />
          <div className={`team-member-overlay ${hoveredMember === index ? 'active' : ''}`}>
            <div className="team-member-details">
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
            </div>
          </div>
        </div>
        <div className="team-member-info">
          <h4>{member.name}</h4>
          <p className="role">{member.role}</p>
        </div>
      </motion.div>
    </Col>
  )
}

// Company Structure Section Component
const CompanyStructureSection = ({ teamMembers, hoveredMember, setHoveredMember }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Heading (0ms delay)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  return (
    <section ref={sectionRef} className="ftco-section services-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} className="heading-section text-center mb-5">
            <motion.div style={{ opacity: headingOpacity, y: headingY }}>
              <span className="subheading">Our Company</span>
              <h2 className="mb-2">Structure</h2>
            </motion.div>
          </Col>
        </Row>
        <Row className="d-flex">
          {teamMembers.map((member, index) => (
            <AnimatedTeamMemberCard
              key={index}
              member={member}
              index={index}
              scrollYProgress={scrollYProgress}
              hoveredMember={hoveredMember}
              setHoveredMember={setHoveredMember}
            />
          ))}
        </Row>
      </Container>
    </section>
  )
}

// Animated Profile Download Card Component
const AnimatedProfileCard = ({ title, description, file, icon, index, scrollYProgress }) => {
  const delay = 0.1 + (index * 0.1) // 0.1, 0.2, 0.3
  const cardOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const cardY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.div style={{ opacity: cardOpacity, y: cardY }}>
      <ProfileDownloadCard
        title={title}
        description={description}
        file={file}
        icon={icon}
      />
    </motion.div>
  )
}

// Company Profiles Download Section Component
const CompanyProfilesSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Heading (0ms delay)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const profiles = [
    {
      title: "Cleaning Services Profile",
      description: "Comprehensive cleaning services for corporate and commercial clients.",
      file: "/BE Profile2.pdf",
      icon: "🧹"
    },
    {
      title: "Security Services Profile",
      description: "Professional security solutions with PSIRA compliance.",
      file: "/BE Profile.pdf",
      icon: "🛡️"
    },
    {
      title: "CDP & Events Management",
      description: "Community development and premier event management services.",
      file: "/CDP & Events Management Profile.pdf",
      icon: "🏌️"
    }
  ]
  
  return (
    <section ref={sectionRef} className="ftco-section company-profiles-section">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <motion.div style={{ opacity: headingOpacity, y: headingY }}>
              <span className="subheading">Resources</span>
              <h2 className="mb-4">Company Profiles</h2>
              <p>Download our company profiles to learn more about our services and capabilities.</p>
            </motion.div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="profile-cards">
              {profiles.map((profile, index) => (
                <AnimatedProfileCard
                  key={index}
                  title={profile.title}
                  description={profile.description}
                  file={profile.file}
                  icon={profile.icon}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

const About = () => {
  const teamMembers = [
    { name: 'Mandla Mndawe', role: 'CEO', image: '/images/MM.png' },
    { name: 'Siegfried Mboweni', role: 'Brand Manager', image: '/images/SR.png' },
    { name: 'Kabelo Mokoena', role: 'Stakeholder Relations Manager', image: '/images/KM.png' },
  ]

  const [hoveredMember, setHoveredMember] = useState(null)

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
      {/* Hero Section */}
      <Hero 
        title="About Us"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />

      {/* Company Overview Section */}
      <CompanyOverviewSection />

      {/* CEO and Founder Section */}
      <CEOFounderSection />

      {/* Mission Section */}
      <MissionSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Services List Section */}
      <ServicesListSection />

      {/* More About Section */}
      <MoreAboutSection />

      {/* Compliance Information Section */}
      <ComplianceInformationSection />

      {/* Company Structure Section */}
      <CompanyStructureSection 
        teamMembers={teamMembers}
        hoveredMember={hoveredMember}
        setHoveredMember={setHoveredMember}
      />

      {/* Company Profiles Download Section */}
      <CompanyProfilesSection />
    </>
  )
}

export default About

