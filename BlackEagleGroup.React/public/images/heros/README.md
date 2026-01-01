# Hero Carousel Images

This folder contains images for the hero carousel background used across all pages.

## Naming Convention

Please name your images using the following format:
- `hero-1.jpg`
- `hero-2.jpg`
- `hero-3.jpg`
- etc.

The component will automatically discover and use all images in this folder that match the pattern `hero-*.jpg` or `hero-*.jpeg`.

## Image Requirements

**Important:** All images should be:
1. **Same dimensions** - Resize/crop all images to the same width and height
2. **Recommended size:** 1920px × 650px (or 1920px × 800px for better cropping flexibility)
3. **Aspect ratio:** Approximately 3:1 (width:height) to match hero container
4. **Format:** JPG or JPEG
5. **Optimized:** Compressed for web performance (aim for 200-500KB per image)

## Image Processing

Before adding images:
- Resize all images to **1920px × 650px** (or consistent dimensions)
- Crop if necessary to maintain aspect ratio
- Optimize file size for web performance (use tools like TinyPNG, ImageOptim, or similar)
- Ensure images are high quality but web-optimized
- **All images must be the exact same dimensions** to prevent component expansion/contraction

## Technical Details

The hero container uses:
- **Height:** `min(80vh, 650px)` on desktop (responsive on mobile)
- **Width:** 100% (full viewport width)
- **CSS:** `object-fit: cover` ensures images fill the container
- **Background position:** `top center` for consistent cropping

**Why same dimensions matter:** If images have different dimensions, the carousel container may resize when switching images, causing layout shifts. All images must be pre-processed to identical dimensions.

