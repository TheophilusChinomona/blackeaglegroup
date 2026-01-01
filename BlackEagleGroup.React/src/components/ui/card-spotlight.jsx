import { cn } from "@/lib/utils"
import { useMotionValue, motion, useMotionTemplate } from "framer-motion" // eslint-disable-line no-unused-vars
import React from "react"

/**
 * CardSpotlight Component
 * A lightweight spotlight effect that follows the cursor
 * Uses Framer Motion instead of Three.js for performance
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the spotlight
 * @param {number} props.radius - Radius of the spotlight effect (default: 250)
 * @param {string} props.color - Background color of spotlight (default: brand green 15% opacity)
 * @param {string} props.className - Additional CSS classes
 */
export const CardSpotlight = ({
  children,
  radius = 250,
  color = "rgba(75, 148, 0, 0.15)", // Brand green with low opacity
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn("group/spotlight relative", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
