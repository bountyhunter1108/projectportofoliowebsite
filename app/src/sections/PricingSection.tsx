import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Basic',
    price: '5.500.000',
    originalPrice: '3.500.000',
    highlighted: false,
    features: [
      '1-4 Halaman',
      'Desain Responsive',
      'SEO Basic',
      '1x Revisi',
      'Free Domain (1 tahun)',
      'Hosting 1GB',
    ],
  },
  {
    name: 'Standard',
    price: '12.500.000',
    originalPrice: '9.500.000',
    highlighted: true,
    badge: 'PALING POPULER',
    features: [
      '5-8 Halaman',
      'Desain Custom',
      'SEO Lengkap',
      '3x Revisi',
      'Free Domain',
      'Hosting 5GB',
      'Integrasi WhatsApp',
      'Google Analytics',
    ],
  },
  {
    name: 'Premium',
    price: '18.500.000',
    originalPrice: '15.000.000',
    highlighted: false,
    features: [
      'Unlimited Halaman',
      'Desain Premium',
      'SEO Advanced',
      'Unlimited Revisi',
      'Sistem Login/Member',
      'Payment Gateway',
      'Maintenance 6 Bulan',
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
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
    <section ref={sectionRef} id="pricing" className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Pricing Plans
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card neo-card p-6 md:p-8 relative opacity-0 ${
                plan.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
              style={plan.highlighted ? { boxShadow: '6px 6px 0px #000' } : {}}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFD700] text-[#111] font-body text-xs font-bold rounded-full border-2 border-black">
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-xl md:text-2xl font-medium text-[#111] dark:text-white mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-sm text-gray-500 dark:text-gray-400">Rp</span>
                  <span className="font-display text-3xl md:text-4xl font-semibold text-[#111] dark:text-white">
                    {plan.price}
                  </span>
                </div>
                {plan.name === 'Premium' && (
                  <span className="font-body text-xs text-gray-500 dark:text-gray-400">+</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-body text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Check size={16} className="text-[#5227FF] mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/6282211261977?text=Halo%20Grady,%20saya%20ingin%20pesan%20paket%20${plan.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`neo-btn w-full text-sm py-3 ${
                  plan.highlighted ? 'neo-btn-primary' : 'neo-btn-secondary'
                }`}
              >
                Pilih Paket
              </a>

              {/* Consultation Link */}
              <div className="text-center mt-3">
                <a
                  href="https://wa.me/6282211261977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-[#5227FF] hover:underline"
                >
                  atau Konsultasi Dulu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
