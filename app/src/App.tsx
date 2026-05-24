import { useState, useEffect, useCallback } from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundCanvas from './components/BackgroundCanvas';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ServicesSection from './sections/ServicesSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import ProcessSection from './sections/ProcessSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [activeSection, setActiveSection] = useState('home');

  // Dark mode toggle
  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Preloader complete
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    // Console log welcome message
    setTimeout(() => {
      console.log('Halo Semua Selamat Datang ! Built with Logic and Structure.');
    }, 100);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ['home', 'about', 'skills', 'projects', 'services', 'pricing', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isLoading]);

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background Animation */}
      <BackgroundCanvas />

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ServicesSection />
        <PricingSection />
        <FAQSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Navigation */}
      {!isLoading && (
        <Navbar
          activeSection={activeSection}
          isDark={isDark}
          onToggleDark={toggleDark}
        />
      )}
    </>
  );
}

export default App;
