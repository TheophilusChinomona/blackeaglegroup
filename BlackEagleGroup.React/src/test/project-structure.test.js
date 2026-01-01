import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

describe('Project Structure', () => {
  it('should have package.json with required dependencies', () => {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
    )
    
    expect(packageJson.dependencies).toHaveProperty('react')
    expect(packageJson.dependencies).toHaveProperty('react-dom')
    expect(packageJson.dependencies).toHaveProperty('react-router-dom')
    expect(packageJson.dependencies).toHaveProperty('react-bootstrap')
    expect(packageJson.dependencies).toHaveProperty('bootstrap')
    expect(packageJson.dependencies).toHaveProperty('react-icons')
  })

  it('should have required folder structure', () => {
    const basePath = process.cwd()
    
    expect(existsSync(join(basePath, 'src'))).toBe(true)
    expect(existsSync(join(basePath, 'src/components/common'))).toBe(true)
    expect(existsSync(join(basePath, 'src/pages'))).toBe(true)
    expect(existsSync(join(basePath, 'src/css'))).toBe(true)
    expect(existsSync(join(basePath, 'src/utils'))).toBe(true)
  })

  it('should have Tailwind CSS configuration', () => {
    const basePath = process.cwd()
    
    expect(existsSync(join(basePath, 'tailwind.config.js'))).toBe(true)
    expect(existsSync(join(basePath, 'postcss.config.js'))).toBe(true)
    
    const tailwindConfig = readFileSync(join(basePath, 'tailwind.config.js'), 'utf-8')
    expect(tailwindConfig).toContain('content')
    expect(tailwindConfig).toContain('theme')
  })

  it('should have Vite configuration with path aliases', () => {
    const basePath = process.cwd()
    
    expect(existsSync(join(basePath, 'vite.config.js'))).toBe(true)
    
    const viteConfig = readFileSync(join(basePath, 'vite.config.js'), 'utf-8')
    expect(viteConfig).toContain('@vitejs/plugin-react')
    expect(viteConfig).toContain('resolve')
  })
})

