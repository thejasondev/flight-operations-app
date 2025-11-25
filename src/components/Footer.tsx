import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container footer-animate mt-auto pb-24 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Logo y nombre de la app */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo/logo-ops.webp"
              alt="Panel OPS Logo"
              className="footer-logo footer-logo-pulse w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white">
                Panel Operaciones Aéreas
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">VRA OPS</div>
            </div>
          </div>

          {/* Copyright y desarrollador */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            {/* Copyright */}
            <div className="flex items-center space-x-1">
              <span>© {currentYear} Todos los derechos reservados</span>
            </div>

            {/* Separador */}
            <div className="hidden sm:block w-px h-4 footer-separator"></div>

            {/* Desarrollador */}
            <div className="flex items-center space-x-2">
              <span>Desarrollado por</span>
              <a
                href="https://thejasondev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link group inline-flex items-center space-x-1 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span className="footer-gradient-text">thejasondev</span>
              </a>
            </div>
          </div>
        </div>

        {/* Línea decorativa opcional para pantallas grandes */}
        <div className="hidden lg:block mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="footer-feature-item flex items-center space-x-1">
              <svg className="footer-icon w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sistema de Gestión Aeroportuaria</span>
            </span>
            <span>•</span>
            <span className="footer-feature-item flex items-center space-x-1">
              <svg className="footer-icon w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Operaciones en Tiempo Real</span>
            </span>
            <span>•</span>
            <span className="footer-feature-item flex items-center space-x-1">
              <svg className="footer-icon w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Gestión Profesional de Vuelos</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
