import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './GridMotion.css'

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef(null)
  const rowRefs = useRef([])
  const mouseXRef = useRef(window.innerWidth / 2)
  const timeRef = useRef(0)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const totalItems = 28
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`)
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems
  const isImageItem = (content) =>
    typeof content === 'string' &&
    (content.startsWith('http') || content.startsWith('/') || /\.(webp|jpe?g|png|gif|avif)$/i.test(content))

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = () => {
      if (!prefersReducedMotion) {
        timeRef.current += 0.006
      }
      const maxMoveAmount = 300
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]
      const autoDrift = prefersReducedMotion ? 0 : Math.sin(timeRef.current) * (window.innerWidth * 0.18)

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1
          const virtualMouseX = mouseXRef.current + autoDrift
          const moveAmount = ((virtualMouseX / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      })
    }

    gsap.ticker.add(updateMotion)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(updateMotion)
    }
  }, [])

  return (
    <div className="gridmotion-noscroll" ref={gridRef}>
      <section
        className="gridmotion-intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="gridmotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="gridmotion-row" ref={(el) => (rowRefs.current[rowIndex] = el)}>
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex]
                return (
                  <div key={itemIndex} className="gridmotion-item">
                    <div className="gridmotion-item-inner" style={{ backgroundColor: '#111' }}>
                      {isImageItem(content) ? (
                        <div
                          className="gridmotion-item-img"
                          style={{
                            backgroundImage: `url(${content})`
                          }}
                        />
                      ) : (
                        <div className="gridmotion-item-content">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="gridmotion-fullview" />
      </section>
    </div>
  )
}

export default GridMotion
