import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

describe('Asset Loading', () => {
  const basePath = process.cwd()
  const publicPath = join(basePath, 'public')
  const imagesPath = join(publicPath, 'images')
  const fontsPath = join(publicPath, 'fonts')

  it('should have images in public/images folder', () => {
    expect(existsSync(imagesPath)).toBe(true)
    
    const imageFiles = readdirSync(imagesPath)
    expect(imageFiles.length).toBeGreaterThan(0)
    
    // Check for key images that should exist
    const keyImages = ['bg_1.jpg', 'Website logo.png']
    keyImages.forEach(image => {
      expect(imageFiles).toContain(image)
    })
  })

  it('should have fonts in public/fonts folder with proper structure', () => {
    expect(existsSync(fontsPath)).toBe(true)
    
    // Check for font subdirectories
    const fontDirs = readdirSync(fontsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    // Should have at least one font directory (flaticon, icomoon, ionicons, or open-iconic)
    expect(fontDirs.length).toBeGreaterThan(0)
    
    // Check for common font file extensions in subdirectories
    const fontExtensions = ['.eot', '.woff', '.woff2', '.ttf', '.svg']
    let foundFontFiles = false
    
    fontDirs.forEach(dir => {
      const dirPath = join(fontsPath, dir)
      const files = readdirSync(dirPath, { recursive: true })
      
      files.forEach(file => {
        const ext = file.substring(file.lastIndexOf('.'))
        if (fontExtensions.includes(ext)) {
          foundFontFiles = true
        }
      })
    })
    
    expect(foundFontFiles).toBe(true)
  })

  it('should have PDFs in public folder', () => {
    const pdfs = [
      'BE Profile2.pdf',
      'BE Profile.pdf',
      'CDP & Events Management Profile.pdf'
    ]
    
    pdfs.forEach(pdf => {
      const pdfPath = join(publicPath, pdf)
      expect(existsSync(pdfPath)).toBe(true)
      
      // Verify it's actually a file (not a directory)
      const stats = statSync(pdfPath)
      expect(stats.isFile()).toBe(true)
    })
  })

  it('should have accessible image files with valid extensions', () => {
    expect(existsSync(imagesPath)).toBe(true)
    
    const imageFiles = readdirSync(imagesPath)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
    
    let validImageFound = false
    imageFiles.forEach(file => {
      const ext = file.substring(file.lastIndexOf('.')).toLowerCase()
      if (imageExtensions.includes(ext)) {
        const filePath = join(imagesPath, file)
        const stats = statSync(filePath)
        if (stats.isFile() && stats.size > 0) {
          validImageFound = true
        }
      }
    })
    
    expect(validImageFound).toBe(true)
  })
})

