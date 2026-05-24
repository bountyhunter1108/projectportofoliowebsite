import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: 'Landing Page',
    desc: 'Halaman fokus konversi untuk promosi produk/jasa dengan desain modern dan cepat.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M10 9h4" />
        <path d="M10 13h4" />
      </svg>
    ),
    title: 'Company Profile',
    desc: 'Website profesional untuk meningkatkan kredibilitas bisnis dengan tampilan elegan.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: 'E-Commerce',
    desc: 'Website toko online lengkap dengan sistem pembayaran dan manajemen produk.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Custom Website',
    desc: 'Website custom sesuai kebutuhan bisnis, termasuk fitur kompleks dan integrasi API.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Friendly'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none play',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Services
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Solusi digital untuk bisnis Anda
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card neo-card p-6 md:p-8 flex flex-col opacity-0"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#5227FF]/10 flex items-center justify-center mb-5">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg md:text-xl font-medium text-[#111] dark:text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                {service.desc}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 font-body text-xs text-gray-500 dark:text-gray-400"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5227FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://wa.me/6282211261977?text=Halo%20Grady,%20saya%20ingin%20pesan%20website%20${service.title}"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-primary text-xs py-2.5 w-full mt-auto"
              >
                Pesan Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
