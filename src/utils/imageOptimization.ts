// Image optimization utilities for better performance

/**
 * Generate responsive image srcset
 */
export const generateSrcSet = (basePath: string, sizes: number[] = [320, 640, 1024, 1920]) => {
  return sizes.map(size => `${basePath}?w=${size} ${size}w`).join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: { [key: string]: string } = {
  '(max-width: 640px)': '100vw',
  '(max-width: 1024px)': '50vw',
  default: '25vw'
}) => {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries.slice(0, -1).map(([query, size]) => `${query} ${size}`);
  const defaultSize = entries[entries.length - 1][1];
  
  return [...mediaQueries, defaultSize].join(', ');
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          // Remove loading class and add loaded class
          img.classList.remove('lazy-loading');
          img.classList.add('lazy-loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.classList.add('lazy-loading');
      imageObserver.observe(img);
    });
  }
};

/**
 * Preload critical images
 */
export const preloadCriticalImages = (images: string[]) => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Convert image to WebP if supported
 */
export const getOptimizedImageUrl = (originalUrl: string): string => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (supportsWebP && originalUrl.endsWith('.png')) {
    return originalUrl.replace('.png', '.webp');
  }
  
  return originalUrl;
};

/**
 * Image component props for optimized loading
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Generate optimized image attributes
 */
export const getOptimizedImageProps = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className = '',
  sizes,
  priority = false
}: OptimizedImageProps) => {
  const optimizedSrc = getOptimizedImageUrl(src);
  
  const props: any = {
    alt,
    className: `${className} ${loading === 'lazy' ? 'lazy-loading' : ''}`.trim(),
    loading: priority ? 'eager' : loading,
  };

  if (priority || loading === 'eager') {
    props.src = optimizedSrc;
  } else {
    props['data-src'] = optimizedSrc;
    props.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4='; // Placeholder
  }

  if (width) props.width = width;
  if (height) props.height = height;
  if (sizes) props.sizes = sizes;

  return props;
};
