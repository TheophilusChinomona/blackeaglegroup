import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

describe('Build Process', () => {
  it('should generate production build successfully', () => {
    const basePath = process.cwd()
    
    try {
      // Run build command
      execSync('npm run build', { 
        cwd: basePath,
        stdio: 'pipe',
        encoding: 'utf-8'
      })
      
      // Check if dist folder exists
      expect(existsSync(join(basePath, 'dist'))).toBe(true)
      expect(existsSync(join(basePath, 'dist/index.html'))).toBe(true)
    } catch (error) {
      // If build fails, the test should fail
      throw new Error(`Build process failed: ${error.message}`)
    }
  }, 60000) // 60 second timeout for build

  it('should have valid Vite configuration file', () => {
    const basePath = process.cwd()
    const viteConfigPath = join(basePath, 'vite.config.js')
    
    expect(existsSync(viteConfigPath)).toBe(true)
    
    // Read and check config file exists and is readable
    const configContent = readFileSync(viteConfigPath, 'utf-8')
    expect(configContent).toContain('defineConfig')
    expect(configContent).toContain('@vitejs/plugin-react')
  })
})

