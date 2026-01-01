# Deployment Guide - Black Eagle Group React App

## cPanel Deployment for React SPA

This guide covers deploying the React Single Page Application (SPA) to cPanel hosting.

### Prerequisites

- cPanel hosting account with access to File Manager or FTP
- Node.js installed locally (for building)
- Access to public_html directory

### Build Process

1. **Build the React application:**
   ```bash
   cd BlackEagleGroup.React
   npm install
   npm run build
   ```

2. **Build output location:**
   - The build output will be in `BlackEagleGroup.React/dist/` directory
   - This contains all static files needed for deployment

### Deployment Steps

#### Option 1: Using cPanel File Manager

1. **Access cPanel File Manager:**
   - Log into cPanel
   - Navigate to File Manager
   - Go to `public_html` directory (or your domain's root directory)

2. **Upload build files:**
   - Upload all contents from `BlackEagleGroup.React/dist/` to `public_html/`
   - Ensure `.htaccess` file is uploaded (it's in `public/` folder and should be copied to `dist/` or `public_html/`)

3. **Verify .htaccess file:**
   - Ensure `.htaccess` file exists in `public_html/`
   - The file should contain rewrite rules for SPA routing
   - If not present, copy from `BlackEagleGroup.React/public/.htaccess`

#### Option 2: Using FTP/SFTP

1. **Connect via FTP:**
   - Use FTP client (FileZilla, WinSCP, etc.)
   - Connect to your cPanel hosting

2. **Upload files:**
   - Upload all contents from `BlackEagleGroup.React/dist/` to `public_html/`
   - Ensure `.htaccess` file is uploaded

### Post-Deployment Verification

1. **Test main routes:**
   - `/` - Home page
   - `/about` - About page
   - `/golf-events` - Golf Events page

2. **Test nested routes:**
   - `/events/cot` - COT event page
   - `/events/cot/about` - COT about page
   - `/events/csir` - CSIR event page
   - `/cassi` - CASSI galleries

3. **Test direct URL access:**
   - Navigate directly to nested routes (e.g., `/events/cot/about`)
   - All routes should load correctly without 404 errors

### .htaccess Configuration

The `.htaccess` file is configured to:
- Redirect all routes to `index.html` for client-side routing
- Exclude static assets (images, CSS, JS) from rewriting
- Enable compression for better performance
- Set cache headers for static assets
- Add security headers

### Troubleshooting

#### Routes return 404 errors:
- Verify `.htaccess` file exists in `public_html/`
- Check that `mod_rewrite` is enabled on your server
- Ensure `.htaccess` file has correct permissions (644)

#### Assets not loading:
- Verify all files from `dist/` directory were uploaded
- Check file permissions (should be 644 for files, 755 for directories)
- Clear browser cache

#### Build issues:
- Ensure all dependencies are installed: `npm install`
- Check for build errors: `npm run build`
- Verify Node.js version compatibility

### Single Build Approach

This application uses a **single build** approach:
- All routes (main site, COT, CSIR, CASSI) are included in one build
- All routes work from the same `index.html`
- No separate builds needed for sub-sites
- All routes are client-side routed

### Route Structure

- Main routes: `/`, `/about`, `/services`, etc.
- Golf Events: `/golf-events`
- COT routes: `/events/cot/*`
- CSIR routes: `/events/csir/*`
- CASSI routes: `/cassi/*`

### Notes

- The `.htaccess` file must be in the root of `public_html/`
- Ensure `mod_rewrite` is enabled in Apache
- All routes are handled client-side by React Router
- Static assets are served directly without rewriting

