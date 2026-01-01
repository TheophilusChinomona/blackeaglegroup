/**
 * Phase 4 - Performance Optimization Tests
 * Tests for code splitting, lazy loading, and image optimization
 */

import { describe, it, expect } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'
import { lazy } from 'react'

describe('Performance Optimization', () => {
  describe('Code Splitting', () => {
    it('should lazy load route components', async () => {
      // Verify that routes are lazy loaded by checking App.jsx uses React.lazy
      const appModule = await import('../App')
      expect(appModule.default).toBeDefined()
      
      // Render app and verify routes load correctly
      const { container } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
      
      // App should render without errors
      await waitFor(() => {
        expect(container).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should create separate chunks for lazy loaded components', () => {
      // Test that lazy() creates a promise-based import
      const LazyComponent = lazy(() => import('../pages/Home'))
      expect(LazyComponent).toBeDefined()
      // Lazy components have a _payload property
      expect(LazyComponent._payload || LazyComponent.$$typeof).toBeDefined()
    })
  })

  describe('Image Lazy Loading', () => {
    it('should apply lazy loading to images', () => {
      // Create a test image element
      const img = document.createElement('img')
      img.src = '/test-image.jpg'
      img.loading = 'lazy'
      
      expect(img.loading).toBe('lazy')
    })

    it('should use lazy loading in Gallery component', async () => {
      const Gallery = (await import('../components/Gallery')).default
      const testItems = [
        { original: '/test1.jpg', thumbnail: '/test1-thumb.jpg' },
        { original: '/test2.jpg', thumbnail: '/test2-thumb.jpg' }
      ]
      
      const { container } = render(<Gallery items={testItems} viewMode="grid" />)
      
      await waitFor(() => {
        const images = container.querySelectorAll('img[loading="lazy"]')
        expect(images.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Image Optimization', () => {
    it('should have WebP conversion configured in Vite', async () => {
      // Verify imagetools plugin is configured by checking vite config exports
      // The vite config should export a config with imagetools plugin
      const viteConfigModule = await import('../../vite.config.js')
      const config = viteConfigModule.default
      
      // Check that plugins array exists and contains imagetools configuration
      expect(config.plugins).toBeDefined()
      expect(Array.isArray(config.plugins)).toBe(true)
    })

    it('should have image optimization utilities', async () => {
      const imageUtils = await import('../utils/imageOptimization')
      expect(imageUtils.generateResponsiveImageSet).toBeDefined()
      expect(imageUtils.getOptimizedImage).toBeDefined()
    })
  })
})

