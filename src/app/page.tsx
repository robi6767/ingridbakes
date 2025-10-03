'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ====== GALLERY & DESSERT ARRAYS ======
const galleryImages: string[] = [
  "/imgs/gallery1.jpg",
  "/imgs/gallery2.jpg",
  "/imgs/gallery3.jpg",
  "/imgs/gallery4.jpg",
  "/imgs/gallery5.jpg",
  "/imgs/gallery6.jpg",
  "/imgs/gallery7.jpg",
  "/imgs/gallery8.jpg",
  "/imgs/gallery9.jpg",
];

const featuredDesserts: { name: string; desc: string; image: string }[] = [
  {
    name: "Mediterranean Pistachio Cake",
    desc: "Layers of pistachio sponge, honey cream, and rosewater syrup.",
    image: "/imgs/dessert1.jpg",
  },
  {
    name: "Lemon Olive Oil Loaf",
    desc: "Moist, fragrant loaf with Sicilian lemons and extra virgin olive oil.",
    image: "/imgs/dessert2.jpg",
  },
  {
    name: "Chocolate Hazelnut Torte",
    desc: "Rich chocolate cake with roasted hazelnuts and silky ganache.",
    image: "/imgs/dessert3.jpg",
  },
  {
    name: "Orange Blossom Cheesecake",
    desc: "Creamy cheesecake infused with orange blossom and almond crust.",
    image: "/imgs/dessert4.jpg",
  },
  {
    name: "Baklava Millefeuille",
    desc: "Crispy layers, pistachio cream, and honeyed syrup.",
    image: "/imgs/dessert5.jpg",
  },
  {
    name: "Rosewater Éclair",
    desc: "Choux pastry filled with rosewater custard and gold leaf.",
    image: "/imgs/dessert6.jpg",
  },
  {
    name: "Almond Citrus Tart",
    desc: "Fragrant almond cream, candied orange, and buttery crust.",
    image: "/imgs/dessert7.jpg",
  },
  {
    name: "Fig & Walnut Cake",
    desc: "Spiced cake with figs, walnuts, and honey glaze.",
    image: "/imgs/dessert8.jpg",
  },
];

// ====== Animation Hook ======
function useFadeInOnScroll(
  delay: number = 0,
  direction: "left" | "right" | "up" = "up"
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state
    const translateClass =
      direction === "left"
        ? "translate-x-8"
        : direction === "right"
        ? "-translate-x-8"
        : "translate-y-6";

    el.classList.add(
      "opacity-0",
      translateClass,
      "transition-all",
      "duration-700"
    );

    // Helper to check if element is in viewport
    const isInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 80;
    };

    // Fade-in logic
    const fadeIn = () => {
      if (isInView()) {
        el.classList.add("opacity-100");
        el.classList.remove("opacity-0", translateClass);
        el.classList.add("translate-x-0", "translate-y-0");
      }
    };

    // Run fadeIn after delay, both on mount and on scroll
    const onScroll = () => setTimeout(fadeIn, delay);

    // Check immediately on mount
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [delay, direction]);

  return ref as React.RefObject<HTMLDivElement>;
}

// ====== Luxury Bakery Button ======
type LuxuryBakeryButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

function LuxuryBakeryButton({
  href,
  children,
  external = false,
  className = "",
}: LuxuryBakeryButtonProps) {
  const base =
    "luxury-btn relative rounded-full px-4 py-2 sm:px-7 sm:py-3 font-bold text-[#2d210a] text-sm sm:text-lg shadow-[0_2px_12px_rgba(212,175,55,0.10)] " +
    "bg-gradient-to-br from-[#f7e7b2] via-[#e6c76e] to-[#bfa14b] border-2 border-[#e6c76e] " +
    "hover:scale-105 hover:shadow-[0_4px_24px_rgba(212,175,55,0.18)] transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-[#D4AF37] overflow-hidden group " +
    "tracking-wider w-full sm:w-auto min-h-[40px] " +
    className;

  const textClass =
    "relative z-10 font-bold tracking-wider font-[Playfair_Display,serif]";

  const ButtonContent = (
    <>
      <span className={textClass}>{children}</span>
      <span
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "repeating-linear-gradient(135deg,rgba(255,255,220,0.10) 0px,rgba(212,175,55,0.12) 8px,rgba(255,255,220,0.10) 16px)",
          mixBlendMode: "soft-light",
        }}
      />
      <span className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden">
        <span className="block absolute left-[-60%] top-0 w-[220%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-80 animate-shimmer rounded-full" />
      </span>
      <style jsx>{`
        .animate-shimmer {
          animation: shimmerLuxuryBtn 1.2s linear forwards;
        }
        @keyframes shimmerLuxuryBtn {
          0% {
            transform: translateX(-60%);
            opacity: 0.4;
          }
          40% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(60%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={base}
        aria-label={typeof children === "string" ? children : undefined}
      >
        {ButtonContent}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {ButtonContent}
    </Link>
  );
}

// ====== Responsive Navbar ======
function Navbar() {
  const [open, setOpen] = useState(false);

  // Add/remove blur class on <body> when menu opens/closes
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-blur");
    } else {
      document.body.classList.remove("menu-blur");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("menu-blur");
    };
  }, [open]);

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        style={{ height: "var(--nav-h)" }}
        className="fixed top-0 left-0 w-full z-[9999] bg-gradient-to-br from-[#102233] via-[#153445] to-[#0f2433] border-b border-white/5 bg-opacity-95 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center sm:justify-start gap-2"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] tracking-wide">
              Ingrid Bakes
            </span>
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4 md:gap-6 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="luxury-nav-link text-[#f7f5f2] font-medium transition-all duration-200 px-2 py-1 rounded hover:text-[#D4AF37] hover:bg-[#fff8e1]/10 hover:underline underline-offset-6"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Hamburger for mobile */}
          <button
            className={`md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-transform duration-300 ${
              open ? "rotate-90 scale-110" : ""
            }`}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect y="7" width="32" height="3" rx="1.5" fill="#D4AF37" />
              <rect y="14" width="32" height="3" rx="1.5" fill="#D4AF37" />
              <rect y="21" width="32" height="3" rx="1.5" fill="#D4AF37" />
            </svg>
          </button>
        </div>
        {/* Mobile Dropdown with animated links */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 z-[9998] transition-all duration-500 ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* Backdrop blur removed */}
          <div
            className={`absolute inset-0 bg-black/30 transition-all duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          {/* Menu panel */}
          <div
            className={`absolute top-0 left-0 w-full bg-[#fff8e1] rounded-b-2xl shadow-2xl border-t border-[#e6c76e] px-4 pt-4 pb-8 flex flex-col gap-1 transition-transform duration-500 ${
              open
                ? "translate-y-0 opacity-100"
                : "-translate-y-12 opacity-0"
            }`}
            style={{
              boxShadow: open
                ? "0 8px 32px rgba(212,175,55,0.10)"
                : undefined,
            }}
          >
            {navLinks.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                tabIndex={open ? 0 : -1}
                className={`w-full py-3 px-2 text-center font-serif font-bold text-base sm:text-lg text-[#1B3A57] hover:text-[#D4AF37] focus:text-[#D4AF37] transition-colors min-h-[44px] rounded-lg outline-none
                  transition-all duration-300
                  ${open ? `animate-mobile-link` : ""}`}
                style={{
                  borderBottom:
                    idx < navLinks.length - 1
                      ? "1px solid #e6c76e"
                      : "none",
                  animationDelay: open ? `${0.1 + idx * 0.08}s` : undefined,
                }}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Decorative gold sparkles */}
        <svg
          className="absolute right-8 top-2 w-12 h-12 opacity-10 pointer-events-none"
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <circle
            cx="24"
            cy="24"
            r="6"
            fill="#D4AF37"
            fillOpacity="0.12"
          />
        </svg>
      </nav>
    </>
  );
}

// ====== Hero Section ======
function Hero() {
  const ref = useFadeInOnScroll(0);

  return (
    <section className="relative h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Artistic navy/gold background shapes, always visible and behind content */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Navy abstract wave */}
        <svg
          className="absolute left-[-8vw] top-[8vh] w-[40vw] h-[40vw] min-w-[120px] min-h-[120px] max-w-[320px] max-h-[320px] opacity-25"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M50,350 Q200,50 350,350"
            stroke="#1B2940"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        {/* Gold dots */}
        <svg
          className="absolute right-[6vw] bottom-[8vh] w-[18vw] h-[18vw] min-w-[70px] min-h-[70px] max-w-[180px] max-h-[180px] opacity-15"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="80" stroke="#e6c76e" strokeWidth="6" strokeDasharray="8 12" />
          <circle cx="100" cy="100" r="30" fill="#D4AF37" fillOpacity="0.08" />
        </svg>
        {/* Gold wave bottom */}
        <svg
          className="absolute left-1/2 bottom-[4vh] -translate-x-1/2 w-[80vw] h-[10vw] min-w-[180px] min-h-[24px] max-w-[700px] max-h-[80px] opacity-10"
          viewBox="0 0 800 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0,80 Q200,20 400,80 T800,80"
            stroke="#D4AF37"
            strokeWidth="12"
            fill="none"
          />
        </svg>
      </div>
      {/* Sharp background image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/imgs/from-the-outside.jpg"
          alt="Ingrid Bakes exterior"
          fill
          priority
          className="object-cover object-right sm:object-center"
          sizes="100vw"
          style={{ animation: "heroZoom 18s ease-in-out infinite alternate" }}
        />
        {/* Subtle gradient for text readability, only one and not foggy */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        {/* Gold pattern overlay for texture */}
        <div className="absolute inset-0 bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-soft-light" />
      </div>
      {/* Content */}
      <div
        ref={ref}
        className="relative z-20 px-4 sm:px-6 text-center max-w-3xl flex flex-col items-center"
      >
        <div
          className="bg-[#fff8e1]/95 rounded-xl px-4 sm:px-8 py-8 sm:py-10 shadow-2xl border-2 border-[#D4AF37] relative animate-fade-in-up"
          style={{
            boxShadow:
              "0 8px 32px 0 rgba(212,175,55,0.10), 0 2px 8px 0 rgba(0,0,0,0.10)",
          }}
        >
          <span className="absolute top-0 left-0 w-12 h-2 bg-gradient-to-r from-[#D4AF37]/60 to-transparent rounded-t-xl" />
          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl font-bold text-[#1B3A57] drop-shadow-[0_10px_25px_rgba(212,175,55,0.25)] mb-4 leading-tight animate-fade-in-up">
            Ingrid Bakes
          </h1>
          <p
            className="text-base sm:text-lg md:text-2xl text-[#1B3A57] max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow font-sans leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Luxurious cakes &amp; pastries, crafted with Mediterranean soul. Cozy interiors, golden moments.
          </p>
          <div
            className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center w-full animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <LuxuryBakeryButton href="/menu" className="sm:w-auto w-full">
              Explore Menu
            </LuxuryBakeryButton>
            <LuxuryBakeryButton
              href="https://wa.me/35799127455"
              external
              className="sm:w-auto w-full"
            >
              Order Now
            </LuxuryBakeryButton>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(32px);
          animation: fadeInUpHero 0.9s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadeInUpHero {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroZoom {
          0% { transform: scale(1);}
          100% { transform: scale(1.04);}
        }
      `}</style>
    </section>
  );
}

// ====== Quick Intro Section ======
function QuickIntro() {
  const ref = useFadeInOnScroll(200);
  return (
    <section
      ref={ref}
      className="py-4 sm:py-10 md:py-16 bg-gradient-to-br from-[#fff8e1] via-[#f7f5f2] to-[#fff8e1] relative overflow-hidden"
    >
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-soft-light z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fff8e1]/60 via-transparent to-[#D4AF37]/10 z-0" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#1B3A57] mb-2 drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)] animate-fade-in">
          Authentic &amp; Artisanal
        </h2>
        <p
          className="text-sm sm:text-lg md:text-xl text-[#5A6B7C] leading-relaxed mb-2 font-sans drop-shadow animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          At Ingrid Bakes, every dessert is a celebration of Mediterranean tradition and luxury. We use only the finest ingredients&#8212;no artificial colors, ever&#8212;for a cozy, unforgettable café experience.
        </p>
      </div>
    </section>
  );
}

// ====== Gallery Image Card ======
type GalleryImageCardProps = {
  src: string;
  direction: "left" | "right";
  rotate: string;
  delay: number;
  alt: string;
};

function GalleryImageCard({
  src,
  direction,
  rotate,
  delay,
  alt,
}: GalleryImageCardProps) {
  const ref = useFadeInOnScroll(delay, direction);
  return (
    <div
      ref={ref}
      className={`relative w-full h-40 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg opacity-0 transition-all duration-700 group ${rotate} border-2 border-[#D4AF37] animate-fade-in-up`}
      style={{
        background: "linear-gradient(135deg,#fff8e1 0%, #f7f5f2 100%)",
        animationDelay: `${delay}ms`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#D4AF37]/10 pointer-events-none rounded-2xl" />
      <style jsx>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(32px);
          animation: fadeInUpGallery 0.8s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadeInUpGallery {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// ====== Gallery Section ======
function GallerySection() {
  const [mobileImages, setMobileImages] = useState<string[]>(
    galleryImages.slice(0, 4)
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileImages(
        window.innerWidth < 640 ? galleryImages.slice(0, 4) : galleryImages
      );
    }
  }, []);
  const images = mobileImages;

  return (
    <section className="py-4 sm:py-10 md:py-16 bg-gradient-to-br from-[#fff8e1] via-[#f7f5f2] to-[#fff8e1] relative overflow-hidden">
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-soft-light z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fff8e1]/60 via-transparent to-[#D4AF37]/10 z-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-4 sm:mb-10 text-center">
          <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#1B3A57] drop-shadow-sm mb-2 animate-fade-in">
            Bakery Gallery
          </h2>
          <p
            className="text-sm sm:text-lg md:text-xl text-[#5A6B7C] animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            A glimpse inside our Mediterranean-inspired bakery.
          </p>
        </div>
        {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {images.map((src, i) => {
            const direction: "left" | "right" = i % 2 === 0 ? "left" : "right";
            const rotate = i % 2 === 0 ? "-rotate-2" : "rotate-2";
            return (
              <GalleryImageCard
                key={src}
                src={src}
                direction={direction}
                rotate={rotate}
                delay={i * 120}
                alt={`Bakery gallery image ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ====== Dessert Card ======
type DessertCardProps = {
  dessert: { name: string; desc: string; image: string };
  delay: number;
};

function DessertCard({ dessert, delay }: DessertCardProps) {
  const ref = useFadeInOnScroll(delay, "up");
  return (
    <div
      ref={ref}
      className="group relative rounded-2xl p-3 sm:p-5 bg-gradient-to-br from-[#fff8e1] via-[#f7f5f2] to-[#fff8e1] border-2 border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-[1.04] flex flex-col items-center opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full h-28 sm:h-44 md:h-56 rounded-xl overflow-hidden mb-2 sm:mb-4">
        <Image
          src={dessert.image}
          alt={dessert.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#D4AF37]/10 pointer-events-none rounded-xl" />
      </div>
      <h3 className="font-serif text-sm sm:text-lg md:text-xl text-[#1B3A57] font-semibold mb-1 text-center drop-shadow-sm animate-fade-in">
        {dessert.name}
      </h3>
      <p
        className="text-xs sm:text-sm md:text-base text-[#5A6B7C] mb-2 text-center font-sans animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {dessert.desc}
      </p>
      <div className="mt-auto flex justify-center w-full">
        <LuxuryBakeryButton href="/menu" className="w-full sm:w-auto">
          View details
        </LuxuryBakeryButton>
      </div>
      <style jsx>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(32px);
          animation: fadeInUpDessert 0.8s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadeInUpDessert {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// ====== Featured Desserts Section ======
function FeaturedDesserts() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll snap polyfill for smoothness (optional, but helps on some mobile browsers)
  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = 0;
  }, []);

  return (
    <section className="py-4 sm:py-10 md:py-16 bg-gradient-to-br from-[#fff8e1] via-[#f7f5f2] to-[#fff8e1] relative">
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-5 mix-blend-soft-light z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fff8e1]/60 via-transparent to-[#D4AF37]/10 z-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-center font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-10 text-[#1B3A57] drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)] animate-fade-in">
          Our Featured Desserts
        </h2>
        {/* Carousel on mobile, grid on desktop */}
        <div className="block md:hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="Featured desserts carousel"
          >
            {featuredDesserts.map((dessert, idx) => (
              <div
                key={dessert.name}
                className="min-w-[80vw] max-w-[85vw] snap-center flex-shrink-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <DessertCard dessert={dessert} delay={idx * 120} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {featuredDesserts.map((dessert, idx) => (
            <DessertCard key={dessert.name} dessert={dessert} delay={idx * 120} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
}

// ====== Map Section ======
function MapSection() {
  const ref = useFadeInOnScroll(200);
  return (
    <section
      ref={ref}
      className="py-4 sm:py-10 md:py-16 bg-gradient-to-br from-[#f7f5f2] via-[#fff8e1] to-[#f7f5f2] relative"
    >
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-5 mix-blend-soft-light z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fff8e1]/60 via-transparent to-[#D4AF37]/10 z-0" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#1B3A57] mb-2 drop-shadow-sm animate-fade-in">
          Visit Us
        </h2>
        <p
          className="text-sm sm:text-lg md:text-xl text-[#5A6B7C] mb-4 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Find Ingrid Bakes in Nicosia, Cyprus. Pan and zoom the map below!
        </p>
        <div
          className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #fff8e1 0%, #f7f5f2 100%)",
            border: "2px solid #D4AF37",
            boxShadow:
              "0 4px 24px 0 rgba(212,175,55,0.10), 0 2px 8px 0 rgba(0,0,0,0.08)",
          }}
        >
          {/* Gold shimmer accent */}
          <span
            className="absolute top-0 left-0 w-16 h-2 bg-gradient-to-r from-[#D4AF37]/60 to-transparent rounded-t-2xl pointer-events-none"
            style={{ zIndex: 2 }}
          />
          <div className="w-full aspect-[16/9]">
            <iframe
              title="Bakery Location"
              src="https://www.google.com/maps?q=%CE%9B%CE%B5%CF%89%CF%86.+%CE%91%CF%81%CF%87%CE%B9%CE%B5%CF%80%CE%B9%CF%83%CE%BA%CE%BF%CF%80%CE%BF%CF%85+%CE%9C%CE%B1%CE%BA%CE%B1%CF%81%CE%AF%CE%BF%CE%B9+%CE%93'+51,+Nicosia+1070,+Cyprus&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                borderRadius: "1rem",
                position: "relative",
                zIndex: 2,
                background: "transparent",
                width: "100%",
                height: "100%",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ====== CTA Section ======
function CTASection() {
  const ref = useFadeInOnScroll(600);
  return (
    <section
      ref={ref}
      className="relative py-4 sm:py-10 md:py-16 flex items-center justify-center"
    >
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#fff8e1] via-[#f7e7b2] to-[#ecd98a]" />
      <div className="absolute inset-0 z-10 rounded-2xl border border-[#D4AF37] pointer-events-none" />
      <svg
        className="absolute left-4 bottom-4 w-16 sm:w-24 h-16 sm:h-24 opacity-20 z-20 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 80 Q50 20 80 80"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M35 70 Q50 40 65 70"
          stroke="#C79C2C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-30">
        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-2 text-[#1B3A57] tracking-wide animate-fade-in">
          Order a Cake or Pastry
        </h2>
        <p
          className="mt-2 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[#1B3A57]/90 mb-4 sm:mb-8 font-sans animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Experience the warmth and luxury of Ingrid Bakes.
        </p>
        {/* Buttons stack vertically on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 w-full">
          <LuxuryBakeryButton
            href="https://wa.me/35799127455"
            external
            className="w-full sm:w-auto"
          >
            Order Now
          </LuxuryBakeryButton>
          <LuxuryBakeryButton href="/menu" className="w-full sm:w-auto">
            View Menu
          </LuxuryBakeryButton>
        </div>
      </div>
    </section>
  );
}

// ====== Footer ======
function Footer() {
  return (
    <footer className="bg-[#1B3A57] text-white py-4 sm:py-8 px-4 sm:px-6 mt-0 relative">
      {/* Decorative gold pattern, subtle and behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/imgs/gold-pattern.png')] bg-repeat opacity-10 mix-blend-soft-light z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fff8e1]/60 via-transparent to-[#D4AF37]/10 z-0" />
      <svg
        className="absolute right-4 sm:right-8 top-4 sm:top-8 w-16 sm:w-24 h-16 sm:h-24 opacity-10 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M20 80 Q50 20 80 80"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="#D4AF37"
          fillOpacity="0.08"
        />
      </svg>
      {/* Responsive flex: vertical on mobile, horizontal on desktop */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#e6c76e] to-[#bfa14b] text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] mb-2">
            Ingrid Bakes
          </span>
          <span className="text-xs sm:text-sm font-sans">
            Mediterranean Café &amp; Bakery
          </span>
          <span className="text-xs sm:text-sm font-sans mt-2">
            Λεωφ. Αρχιεπισκόπου Μακαρίου Γ&apos; 51, Nicosia
          </span>
          <span className="text-xs sm:text-sm font-sans mt-1">
            357 99127455
          </span>
          <span className="text-xs sm:text-sm font-sans mt-1">
            info@ingridbakes.com
          </span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1 w-full md:w-auto">
          <Link
            href="/menu"
            className="luxury-nav-link text-[#f7f5f2] hover:text-[#D4AF37] focus:text-[#D4AF37] transition-colors hover:underline underline-offset-6"
          >
            Menu
          </Link>
          <Link
            href="/gallery"
            className="luxury-nav-link text-[#f7f5f2] hover:text-[#D4AF37] focus:text-[#D4AF37] transition-colors hover:underline underline-offset-6"
          >
            Gallery
          </Link>
          <Link
            href="/reviews"
            className="luxury-nav-link text-[#f7f5f2] hover:text-[#D4AF37] focus:text-[#D4AF37] transition-colors hover:underline underline-offset-6"
          >
            Reviews
          </Link>
          <Link
            href="/contact"
            className="luxury-nav-link text-[#f7f5f2] hover:text-[#D4AF37] focus:text-[#D4AF37] transition-colors hover:underline underline-offset-6"
          >
            Contact
          </Link>
          <LuxuryBakeryButton
            href="https://wa.me/35799127455"
            external
            className="mt-2 w-full sm:w-auto"
          >
            <span className="text-sm font-semibold">WhatsApp Order</span>
            <span aria-hidden>&#128172;</span>
          </LuxuryBakeryButton>
        </div>
      </div>
      <div className="mt-2 sm:mt-6 text-center text-xs sm:text-sm text-white/60 font-sans relative z-10">
        &copy; {new Date().getFullYear()} Ingrid Bakes. All rights reserved.
      </div>
    </footer>
  );
}

// ====== Main Home Page ======
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff8e1] text-[#1B3A57] font-sans overflow-x-hidden">
      {/* === GLOBAL STYLES (not nested) === */}
      <style jsx global>{`
        /* Menu blur effect for mobile menu */
        body.menu-blur #__next > div:not(nav):not([id="mobile-menu"]),
        body.menu-blur main,
        body.menu-blur footer {
          filter: none !important;
          pointer-events: none;
          user-select: none;
        }
        body:not(.menu-blur) #__next > div:not(nav):not([id="mobile-menu"]),
        body:not(.menu-blur) main,
        body:not(.menu-blur) footer {
          filter: none;
          pointer-events: auto;
          user-select: auto;
        }
        /* Cinematic fade-in animation */
        .animate-fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 1s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Mobile menu link animation */
        @keyframes mobileLinkIn {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-mobile-link {
          animation: mobileLinkIn 0.5s cubic-bezier(.4,0,.2,1) forwards;
        }
        .luxury-btn:active {
          filter: brightness(0.97);
        }
        .luxury-nav-link {
          position: relative;
          transition: color 0.2s, background 0.2s;
        }
        .luxury-nav-link::after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37 0%, #e6c76e 100%);
          opacity: 0;
          transform: scaleX(0);
          transition: opacity 0.2s, transform 0.2s;
        }
        .luxury-nav-link:hover::after,
        .luxury-nav-link:focus::after {
          opacity: 1;
          transform: scaleX(1);
        }
        html,
        body {
          max-width: 100vw;
          overflow-x: hidden;
        }
        /* Playfair Display font loaded globally via _app or layout */
        .font-[Playfair_Display,serif] {
          font-family: 'Playfair Display', serif !important;
        }
        /* Premium hover effect for all images and cards */
        .group:hover img,
        .group:focus img,
        .group:hover,
        .group:focus {
          box-shadow: 0 6px 32px 0 rgba(212,175,55,0.13), 0 2px 8px 0 rgba(0,0,0,0.10);
          filter: brightness(1.03) saturate(1.08);
          transition: box-shadow 0.25s cubic-bezier(.4,0,.2,1), filter 0.25s cubic-bezier(.4,0,.2,1);
        }
        .group:active {
          filter: brightness(0.97);
        }
        /* Focus ring for accessibility */
        .luxury-btn:focus, .luxury-nav-link:focus {
          outline: 2px solid #D4AF37;
          outline-offset: 2px;
        }
      `}</style>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-h)" }} className="flex-grow">
        <Hero />
        <QuickIntro />
        <GallerySection />
        <FeaturedDesserts />
        <MapSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

