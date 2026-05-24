import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  onToggleDark: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

// Custom SVG Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SkillsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const ServicesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const PricingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const ContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const icons = [HomeIcon, AboutIcon, SkillsIcon, ProjectsIcon, ServicesIcon, PricingIcon, ContactIcon];

export default function Navbar({ activeSection, isDark, onToggleDark }: NavbarProps) {
  const [time, setTime] = useState('');
  const [mouseOffset, setMouseOffset] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const currentOffset = useRef(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse follow animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerY = window.innerHeight / 2;
      const offset = ((e.clientY - centerY) / centerY) * 6;
      setMouseOffset(offset);
    };

    const animate = () => {
      currentOffset.current += (mouseOffset - currentOffset.current) * 0.1;
      if (navRef.current) {
        navRef.current.style.transform = `translateY(${currentOffset.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseOffset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl px-3 md:px-5 py-2.5 md:py-3 flex items-center gap-1 md:gap-2 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#333] border-[3px] border-black dark:border-[#333]"
      style={{ willChange: 'transform' }}
    >
      {navItems.map((item, index) => {
        const Icon = icons[index];
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative flex flex-col items-center justify-center p-2 md:px-3 rounded-xl transition-all duration-300 group"
            aria-label={item.label}
          >
            <div
              className={`transition-all duration-300 ${isActive
                  ? 'text-[#5227FF] scale-110'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-[#111] dark:group-hover:text-white group-hover:scale-110'
                }`}
              style={{
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease',
              }}
            >
              <Icon />
            </div>

            {/* Label tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#111] dark:bg-white text-white dark:text-[#111] text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {item.label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span
                className="absolute -bottom-0.5 w-1.5 h-1.5 bg-[#5227FF] rounded-full"
                style={{
                  animation: 'bounce-subtle 2s ease infinite',
                }}
              />
            )}
          </button>
        );
      })}

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

      {/* Clock */}
      <div className="hidden md:flex items-center font-mono text-sm text-gray-700 dark:text-gray-300 min-w-[44px] justify-center">
        {time}
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDark}
        className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-[#5227FF] dark:hover:text-[#8b6fff] transition-all duration-300 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
