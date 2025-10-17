import React from 'react';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4', 
  lg: 'w-5 h-5'
};

export const CheckCircleIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
    />
  </svg>
);

export const TrendingDownIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" 
    />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

export const MinusCircleIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

// Componente principal para mostrar el ícono de estado apropiado
interface StatusIconProps {
  status: 'early' | 'delayed' | 'on-time' | 'pending';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, className = '', size = 'md' }) => {
  switch (status) {
    case 'early':
      return <TrendingUpIcon className={`text-green-600 ${className}`} size={size} />;
    case 'delayed':
      return <TrendingDownIcon className={`text-red-600 ${className}`} size={size} />;
    case 'on-time':
      return <CheckCircleIcon className={`text-blue-600 ${className}`} size={size} />;
    case 'pending':
      return <ClockIcon className={`text-gray-500 ${className}`} size={size} />;
    default:
      return <MinusCircleIcon className={`text-gray-400 ${className}`} size={size} />;
  }
};

// Componente con badge para mejor presentación
interface StatusBadgeProps {
  status: 'early' | 'delayed' | 'on-time' | 'pending';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showIcon = true, 
  size = 'md',
  className = '' 
}) => {
  const badgeClasses = {
    early: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
    delayed: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700',
    'on-time': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700',
    pending: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700'
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-2.5 py-1.5 text-sm'
  };

  return (
    <div className={`
      inline-flex items-center gap-1 rounded-full border font-medium
      ${badgeClasses[status]} 
      ${sizeClasses[size]}
      ${className}
    `}>
      {showIcon && <StatusIcon status={status} size="sm" className="flex-shrink-0" />}
    </div>
  );
};
