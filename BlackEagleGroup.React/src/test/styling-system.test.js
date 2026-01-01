import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

describe('Styling System', () => {
  const basePath = process.cwd()
  const tailwindConfigPath = join(basePath, 'tailwind.config.js')
  const indexCssPath = join(basePath, 'src/index.css')

  it('should have Tailwind CSS configured with custom theme', () => {
    expect(existsSync(tailwindConfigPath)).toBe(true)
    
    const configContent = readFileSync(tailwindConfigPath, 'utf-8')
    
    // Check for custom colors
    expect(configContent).toContain('extend')
    expect(configContent).toContain('theme')
    
    // Check for Poppins font configuration
    expect(configContent).toContain('poppins')
    expect(configContent).toContain('Poppins')
  })

  it('should have Tailwind directives in index.css', () => {
    expect(existsSync(indexCssPath)).toBe(true)
    
    const cssContent = readFileSync(indexCssPath, 'utf-8')
    
    // Check for Tailwind directives
    expect(cssContent).toContain('@tailwind base')
    expect(cssContent).toContain('@tailwind components')
    expect(cssContent).toContain('@tailwind utilities')
  })

  it('should have custom colors defined in Tailwind config', () => {
    expect(existsSync(tailwindConfigPath)).toBe(true)
    
    const configContent = readFileSync(tailwindConfigPath, 'utf-8')
    
    // Check for primary green colors used in the site
    // #59B200, #00CC33 are the main brand colors
    expect(configContent).toMatch(/59B200|00CC33|primary|green/i)
  })

  it('should have responsive breakpoints configured', () => {
    expect(existsSync(tailwindConfigPath)).toBe(true)
    
    const configContent = readFileSync(tailwindConfigPath, 'utf-8')
    
    // Tailwind default breakpoints should be present or custom ones defined
    // Default Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px
    // Site uses: 576px (sm), 768px (md), 992px (lg), 1200px (xl)
    expect(configContent).toContain('screens') || expect(configContent).toContain('breakpoints')
  })
})

