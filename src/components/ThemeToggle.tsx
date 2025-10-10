import React, { useState, useEffect, useCallback } from "react";

// Theme type definition
type Theme = "light" | "dark";

// Icon components for better organization and performance
const MoonIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" 
      clipRule="evenodd" 
    />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" 
    />
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        setTheme(storedTheme);
      } else {
        // Fallback to system preference if no stored theme
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = systemPrefersDark ? "dark" : "light";
        setTheme(defaultTheme);
      }
    } catch (error) {
      console.warn("Error accessing localStorage for theme:", error);
      setTheme("light"); // Safe fallback
    }
    setMounted(true);
  }, []);

  // Handle theme toggle with animation
  const toggleTheme = useCallback(() => {
    if (isAnimating) return; // Prevent rapid clicking

    setIsAnimating(true);
    
    try {
      // Use global theme function if available
      if (window.toggleTheme) {
        const newTheme = window.toggleTheme() as Theme;
        setTheme(newTheme);
      } else {
        // Fallback implementation
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Apply theme to document
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch (error) {
      console.error("Error toggling theme:", error);
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  }, [theme, isAnimating]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  }, [toggleTheme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isDark = theme === "dark";
  const buttonLabel = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
  const iconClassName = `w-5 h-5 transition-all duration-300 ${
    isAnimating ? "scale-75 rotate-180" : "scale-100 rotate-0"
  }`;

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={`
        group relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-gray-100 hover:bg-gray-200 
        dark:bg-gray-700 dark:hover:bg-gray-600
        border border-gray-200 dark:border-gray-600
        text-gray-600 hover:text-gray-800 
        dark:text-gray-300 dark:hover:text-white
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
        active:scale-95
        ${isAnimating ? "animate-pulse" : ""}
      `}
      aria-label={buttonLabel}
      title={buttonLabel}
      disabled={isAnimating}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Icon container with animation */}
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <SunIcon className={iconClassName} />
        ) : (
          <MoonIcon className={iconClassName} />
        )}
      </div>

      {/* Tooltip for better UX */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {buttonLabel}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-lg" />
      </div>
    </button>
  );
}