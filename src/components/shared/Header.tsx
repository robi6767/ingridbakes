"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type HeaderProps = {
  currentPage?: string;
};

const Header = ({ currentPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effects and mobile menu
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (isMenuOpen) {
      document.body.classList.add("backdrop-blur-sm");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("backdrop-blur-sm");
      document.body.style.overflow = "";
    }

    // Click outside to close
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav") && !target.closest("button")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      document.body.classList.remove("backdrop-blur-sm");
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] w-full bg-gradient-to-r from-[#102233] via-[#153445] to-[#0f2433] shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-opacity-90 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {/* Logo - Updated with more natural gold and subtle glow */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl font-bold transition-all duration-300 hover:opacity-90 flex-1 flex items-center"
            >
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#C6A136] via-[#e6c76e] to-[#C6A136]"
                style={{
                  textShadow: "0 2px 8px rgba(212,175,55,0.25)",
                  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))",
                }}
              >
                Ingrid Bakes
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Slightly larger text and adjusted positioning */}
          <nav className="hidden md:flex items-center space-x-10 -mr-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 group ${
                  currentPage === item.name
                    ? "text-[#D4AF37] font-semibold text-[1.05rem]"
                    : "text-white hover:text-[#D4AF37] font-medium text-base tracking-wide"
                }`}
              >
                <span className="relative">
                  {item.name}
                  {/* Enhanced underline effect */}
                  <span
                    className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#f0e6bc] transition-all duration-300 origin-left rounded-full ${
                      currentPage === item.name
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-75"
                    }`}
                  ></span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Hamburger Menu Button - Enhanced animations */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-[#D4AF37] focus:outline-none transition-all duration-300 p-1 rounded-full hover:bg-white/10"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6 transition-all duration-300"
                style={{
                  transform: isMenuOpen ? "rotate(90deg)" : "rotate(0)",
                }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Decorative Gold Sparkle - Enhanced animation */}
          <div className="absolute top-2 right-4 hidden md:block pointer-events-none">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-12"
            >
              <path
                d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z"
                fill="url(#gold-star)"
                fillOpacity="0.5"
              >
                <animate
                  attributeName="fill-opacity"
                  values="0.5;0.8;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="transform"
                  type="scale"
                  values="1;1.1;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              <defs>
                <linearGradient id="gold-star" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0.1" stopColor="#C6A136" />
                  <stop offset="0.5" stopColor="#f0e6bc" />
                  <stop offset="0.9" stopColor="#C6A136" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced animations and styling */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-b from-[#f5e7c1] to-[#e9d9a8] rounded-b-xl mx-4 mt-1 shadow-lg overflow-hidden">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="transform transition-all duration-300"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-3 font-medium rounded-md hover:bg-white/50 transition-all duration-300 ${
                    currentPage === item.name
                      ? "text-[#D4AF37] font-semibold text-lg"
                      : "text-[#102233] hover:text-[#D4AF37] text-base"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop for closing menu when clicked outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;
