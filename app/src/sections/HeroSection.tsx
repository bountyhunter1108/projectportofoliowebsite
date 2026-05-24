import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialIcons, { DownloadIcon } from '../components/SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 }); // After preloader

      // Greeting fade in
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Name character animation (manual split text)
      if (nameRef.current) {
        const text = nameRef.current.textContent || '';
        nameRef.current.innerHTML = '';
        const spans: HTMLSpanElement[] = [];
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(40px)';
          nameRef.current!.appendChild(span);
          spans.push(span);

          tl.to(
            span,
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: 'power3.out',
            },
            0.3 + i * 0.05
          );
        });

        // Restore text after animation completes
        tl.call(() => {
          if (nameRef.current) {
            nameRef.current.textContent = text;
          }
        }, [], '+=0.5');
      }

      // Shiny title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

      // Bio
      tl.fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm"
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Greeting */}
        <div ref={greetingRef} className="mb-4 opacity-0">
          <span className="font-body text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light tracking-wide">
            Hi, Saya
          </span>
        </div>

        {/* Name with split text animation */}
        <h1
          ref={nameRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold gradient-text mb-4 leading-tight"
        >
          Grady Warren Rusli
        </h1>

        {/* Shiny text title */}
        <div ref={titleRef} className="mb-6 opacity-0">
          <span className="shiny-text font-body text-lg md:text-xl lg:text-2xl font-light tracking-wide">
            Fullstack Developer &amp; Cyber Security Specialist
          </span>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="font-body text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed opacity-0"
        >
          Membantu bisnis membangun website modern, responsif, dan aman
          dengan fokus pada performa dan keamanan.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0">
          <a
            href="#contact"
            className="neo-btn neo-btn-primary text-sm md:text-base"
          >
            <span>Konsultasi Sekarang</span>
          </a>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/CV_Grady_Warren_Rusli.pdf';
              link.download = 'CV_Grady_Warren_Rusli.pdf';
              link.click();
            }}
            className="neo-btn neo-btn-secondary text-sm md:text-base"
          >
            <DownloadIcon size={18} />
            <span>Download CV</span>
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center">
          <SocialIcons iconSize={22} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
