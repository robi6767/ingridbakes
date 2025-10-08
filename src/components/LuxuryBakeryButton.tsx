import React from 'react';
import Link from 'next/link';

interface LuxuryBakeryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const LuxuryBakeryButton: React.FC<LuxuryBakeryButtonProps> = ({
  href,
  children,
  className = '',
  external = false,
}) => {
  // Base button styles
  const baseStyles = "inline-block px-6 py-3 font-bold text-white rounded-full transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e6c76e] hover:from-[#c09b29] hover:to-[#d4b75c] shadow-md hover:shadow-lg transform hover:-translate-y-0.5";
  
  // Combined styles
  const buttonStyles = `${baseStyles} ${className}`;
  
  // If external link, render an <a> tag
  if (external) {
    return (
      <a 
        href={href} 
        className={buttonStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  
  // Otherwise, render a Next.js Link
  return (
    <Link href={href} className={buttonStyles}>
      {children}
    </Link>
  );
};

export default LuxuryBakeryButton;