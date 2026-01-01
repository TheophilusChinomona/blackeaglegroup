import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils'

/**
 * FormInput Component
 * Wrapper for form inputs using shadcn/ui components and React Hook Form
 * Supports Input and Textarea types
 */
const FormInput = ({ 
  name, 
  label, 
  type = 'text', 
  placeholder,
  validation,
  className 
}) => {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => {
          if (type === 'textarea') {
            return (
              <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                className={cn(
                  error && 'border-red-500 focus-visible:ring-red-500'
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
              />
            )
          }
          return (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={cn(
                error && 'border-red-500 focus-visible:ring-red-500'
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
          )
        }}
      />
      {error && (
        <p 
          id={`${name}-error`} 
          className="text-sm text-red-500"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

export default FormInput

