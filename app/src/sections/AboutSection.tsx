import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';
import SocialIcons from '../components/SocialIcons';

gsap.registerPlugin(ScrollTrigger);

const whyChooseItems = [
  {
    title: 'Pengerjaan Cepat',
    desc: 'Website selesai dalam 1-2 minggu tergantung kompleksitas. Saya mengutamakan efisiensi tanpa mengorbankan kualitas.',
  },
  {
    title: 'Desain Modern',
    desc: 'Menggunakan teknologi terbaru dan trend desain 2026. Setiap website dibuat dengan estetika premium yang profesional.',
  },
  {
    title: 'Fokus Hasil Bisnis',
    desc: 'Bukan hanya website yang bagus, tapi website yang menghasilkan konversi dan mendukung pertumbuhan bisnis Anda.',
  },
  {
    title: 'Website Ringan & Responsive',
    desc: 'Optimasi performa tinggi dengan loading cepat. Tampilan sempurna di desktop, tablet, dan mobile.',
  },
  {
    title: 'Mengutamakan Keamanan',
    desc: 'Latar belakang Cyber Security memastikan website Anda aman dari ancaman dan vulnerabilitas.',
  },
  {
    title: 'Support After Project',
    desc: 'Bukan hanya selesai dan pergi. Saya memberikan support dan maintenance untuk memastikan website tetap optimal.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side - slide in from left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none play',
          },
        }
      );

      // Right side - slide in from right
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none play',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          {/* Left - Photo with tilt effect */}
          <div ref={leftRef} className="flex justify-center lg:justify-start opacity-0">
            <TiltCard className="w-full max-w-[380px]" maxRotation={10}>
              <div className="relative p-[3px] bg-gradient-to-r from-[#5227FF] via-[#00D4FF] to-[#FFD700] animate-[rgb-rotate_4s_linear_infinite] bg-[length:200%_200%] shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]">
                <div className="border-[3px] border-black dark:border-white relative overflow-hidden bg-white dark:bg-[#1a1a1a] block">
                  <img
                    src="/images/grady-profile.png"
                    alt="Grady Warren Rusli"
                    className="w-full h-auto object-cover relative z-10 block"
                    style={{ maxHeight: '480px' }}
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right - Content */}
          <div ref={rightRef} className="opacity-0">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-[#111] dark:text-white mb-2">
              About Me
            </h2>
            <div className="w-16 h-1 bg-[#5227FF] mb-6 rounded-full" />

            <p className="font-body text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Saya <strong className="text-[#111] dark:text-white">Grady Warren Rusli</strong>,{' '}
              mahasiswa Informatika UMN dengan beasiswa 60%. Seorang{' '}
              <span className="text-[#5227FF] font-medium">Fullstack Developer</span> dan{' '}
              <span className="text-[#5227FF] font-medium">Cyber Security Specialist</span>{' '}
              berpengalaman dalam membangun website modern, aplikasi web, dan sistem keamanan.
              Lulusan Garda Siber Academy dengan 20+ sertifikat profesional.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="neo-card p-4">
                <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Lokasi
                </div>
                <div className="font-body text-sm text-[#111] dark:text-white">
                  Medan, Indonesia
                </div>
              </div>
              <div className="neo-card p-4">
                <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Email
                </div>
                <div className="font-body text-sm text-[#111] dark:text-white truncate">
                  bisnissgradyy@gmail.com
                </div>
              </div>
              <div className="neo-card p-4">
                <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Status
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-body text-sm text-[#111] dark:text-white">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mb-8">
              <SocialIcons iconSize={22} />
            </div>

            {/* Why Choose Me - Accordion */}
            <div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-[#111] dark:text-white mb-4">
                Kenapa Memilih Saya?
              </h3>
              <div className="space-y-2">
                {whyChooseItems.map((item, index) => (
                  <div
                    key={index}
                    className={`border-[3px] border-black dark:border-white rounded-none overflow-hidden transition-all duration-300 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] mb-4 ${
                      openIndex === index ? 'bg-[#FFFDF0] dark:bg-[#1e1a3a]' : 'bg-white dark:bg-[#121212]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
                    >
                      <span className="font-body text-sm md:text-base text-[#111] dark:text-white font-bold">
                        {item.title}
                      </span>
                      <span
                        className="text-[#5227FF] dark:text-[#FFD700] transition-transform duration-300 text-xl font-bold"
                        style={{
                          transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: openIndex === index ? '200px' : '0px',
                      }}
                    >
                      <div className="border-t-[3px] border-black dark:border-white p-4 font-body text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-[#121212]">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
