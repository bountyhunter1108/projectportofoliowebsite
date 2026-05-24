import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Berapa lama pengerjaan website?',
    a: 'Pengerjaan website biasanya memakan waktu 1-3 hari per step (Konsultasi → Desain → Revisi → Launching). Total estimasi 1-2 minggu tergantung kompleksitas dan respons revisi dari client.',
  },
  {
    q: 'Apakah bisa revisi desain?',
    a: 'Ya, revisi desain tersedia sesuai paket yang dipilih. Paket Basic mendapat 1x revisi, Standard 3x revisi, dan Premium unlimited revisi. Revisi mencakup perubahan warna, layout, dan konten.',
  },
  {
    q: 'Apakah termasuk domain dan hosting?',
    a: 'Ya, semua paket sudah include free domain (.com/.id) untuk 1 tahun dan hosting sesuai kapasitas paket (Basic 1GB, Standard 5GB, Premium unlimited).',
  },
  {
    q: 'Bagaimana sistem pembayaran?',
    a: 'Sistem pembayaran menggunakan DP (Down Payment) 50% di awal project, dan pelunasan 50% saat website siap launch. Pembayaran bisa via transfer bank atau e-wallet.',
  },
  {
    q: 'Apakah website SEO-friendly?',
    a: 'Ya, semua website yang dibuat sudah mengimplementasikan praktik SEO terbaik termasuk semantic HTML, meta tags, structured data, fast loading, dan mobile-friendly design.',
  },
  {
    q: 'Apakah ada maintenance?',
    a: 'Paket Premium sudah include maintenance selama 6 bulan (update keamanan, bug fixes, minor updates). Untuk paket Basic dan Standard, maintenance tersedia dengan biaya tambahan.',
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqItems = sectionRef.current?.querySelectorAll('.faq-item');
      if (faqItems && faqItems.length > 0) {
        gsap.fromTo(
          faqItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none play',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Pertanyaan yang sering ditanyakan
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border-2 border-black dark:border-[#333] rounded-xl overflow-hidden opacity-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <span className="font-body text-sm md:text-base text-[#111] dark:text-white font-medium pr-4">
                  {faq.q}
                </span>
                <span
                  className="text-[#5227FF] text-xl flex-shrink-0 transition-transform duration-300"
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
                  maxHeight: openIndex === index ? '300px' : '0px',
                }}
              >
                <p className="px-5 pb-5 font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
