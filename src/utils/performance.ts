// Performance utilities for the Flight Operations App

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical images
	const criticalImages = [
		'/logo/logo-ops.webp',
		'/logo/favicon.svg',
	];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load non-critical resources
 */
export const lazyLoadResources = () => {
  // Implement intersection observer for lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
};

/**
 * Optimize localStorage usage
 */
export const optimizeLocalStorage = () => {
  try {
    // Clean up old data if storage is getting full
    const usage = JSON.stringify(localStorage).length;
    const limit = 5 * 1024 * 1024; // 5MB limit
    
    if (usage > limit * 0.8) {
      // Clean up old flight data older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('flight_') || key.startsWith('operations_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            const dataDate = new Date(data.date || data.createdAt);
            if (dataDate < thirtyDaysAgo) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            // Remove corrupted data
            localStorage.removeItem(key);
          }
        }
      });
    }
  } catch (error) {
    console.warn('LocalStorage optimization failed:', error);
  }
};

/**
 * Initialize performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      lazyLoadResources();
      optimizeLocalStorage();
    });
  } else {
    preloadCriticalResources();
    lazyLoadResources();
    optimizeLocalStorage();
  }
  
  // Clean up localStorage periodically
  setInterval(optimizeLocalStorage, 30 * 60 * 1000); // Every 30 minutes
};
