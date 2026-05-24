import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none play',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 md:py-20 bg-[#111] dark:bg-[#0a0a0a] text-white opacity-0"
    >
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          {/* Logo with RGB border */}
          <div className="rgb-border mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white p-2">
              <img
                src="/images/logo-garda-siber.png"
                alt="Garda Siber Academy"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Tagline */}
          <p className="font-body text-gray-400 text-sm md:text-base mb-6 max-w-md">
            Crafting digital experiences with passion and precision
          </p>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="font-body text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gray-800 mb-8" />

          {/* Copyright */}
          <div className="space-y-2">
            <p className="font-body text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Grady Warren Rusli. All rights reserved.
            </p>
            <p className="font-body text-xs text-gray-600">
              Built with Logic and Structure
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-4 md:right-8 w-10 h-10 rounded-full bg-white text-[#111] flex items-center justify-center shadow-[3px_3px_0px_#5227FF] hover:scale-110 transition-transform z-40"
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
}
