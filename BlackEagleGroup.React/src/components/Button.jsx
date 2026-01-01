import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils'

/**
 * Button Component
 * Wrapper around shadcn/ui Button with custom styling to match HTML design
 * Supports variants: primary, outline, etc.
 */
const Button = ({ 
  variant = 'default', 
  size = 'default',
  className,
  children,
  ...props 
}) => {
  // Custom variants to match original HTML button styles
  const customVariants = {
    primary: 'bg-[#59B200] text-white hover:bg-[#4a9900]',
    'outline-black': 'border border-black text-black hover:bg-black hover:text-white',
  }

  // Use custom variant if specified, otherwise use shadcn default
  if (customVariants[variant]) {
    return (
      <ShadcnButton
        className={cn(customVariants[variant], className)}
        size={size}
        {...props}
      >
        {children}
      </ShadcnButton>
    )
  }

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  )
}

export default Button
export { buttonVariants }

