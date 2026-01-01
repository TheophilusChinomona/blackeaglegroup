import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      // Disable automatic image conversion - serve all images as-is
      // This ensures hero/carousel images and all public folder images maintain original quality
      defaultDirectives: (url) => {
        const imagePath = url.pathname || url.href || ''
        const isImage = /\.(jpg|jpeg|png|gif|tiff|bmp|webp)$/i.test(imagePath)
        
        // Exclude ALL public folder images (anything starting with /)
        // Public folder images are served directly by Vite without processing
        const isPublicFolderImage = imagePath.startsWith('/') || 
                                    /^\/(COT|csir|cassi|images|fonts|css|js)\//.test(imagePath)
        
        // Only process images imported in src/ that are NOT in public folder
        // For now, we'll skip ALL automatic conversion to preserve image quality
        // Images can still be manually optimized if needed using ?format=webp&quality=90 in the import
        if (isImage && !isPublicFolderImage) {
          // Return empty params to skip automatic conversion
          // This preserves original image quality
          return new URLSearchParams()
        }
        // Return empty params to skip processing for public folder images
        return new URLSearchParams()
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react-helmet-async'],
  },
  build: {
    // Optimize images during build
    assetsInlineLimit: 4096, // Inline small images (< 4kb)
    rollupOptions: {
      output: {
        // Organize assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
