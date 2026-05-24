import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkedInIcon, GitHubIcon, InstagramIcon, WhatsAppIcon, EmailIcon } from '../components/SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none play',
          },
        }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none play',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const waMessage = `Halo Grady, saya ${name} (${email}). ${message}`;
    window.open(`https://wa.me/6282211261977?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Get In Touch
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Mari diskusikan project website Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef} className="opacity-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-sm text-[#111] dark:text-white mb-2 font-medium">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="neo-input"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-[#111] dark:text-white mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="neo-input"
                  placeholder="email@anda.com"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-[#111] dark:text-white mb-2 font-medium">
                  Pesan
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="neo-input resize-none"
                  placeholder="Ceritakan kebutuhan website Anda..."
                />
              </div>
              <button type="submit" className="neo-btn neo-btn-primary w-full">
                <WhatsAppIcon size={18} />
                Kirim via WhatsApp
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="opacity-0 space-y-8">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-[#111] dark:text-white mb-6">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/6282211261977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 neo-card !shadow-[3px_3px_0px_#000] hover:!shadow-[4px_4px_0px_#5227FF]"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <div className="font-body text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      WhatsApp
                    </div>
                    <div className="font-body text-sm text-[#111] dark:text-white">
                      +62-822-1126-1977
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:bisnissgradyy@gmail.com"
                  className="flex items-center gap-4 p-4 neo-card !shadow-[3px_3px_0px_#000] hover:!shadow-[4px_4px_0px_#5227FF]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#5227FF]/10 flex items-center justify-center text-[#5227FF]">
                    <EmailIcon size={24} />
                  </div>
                  <div>
                    <div className="font-body text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </div>
                    <div className="font-body text-sm text-[#111] dark:text-white">
                      bisnissgradyy@gmail.com
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-body text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Social Media
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/GradyWarrenRusli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl neo-card !p-0 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#0077B5] hover:!shadow-[3px_3px_0px_#0077B5]"
                >
                  <LinkedInIcon size={22} />
                </a>
                <a
                  href="https://github.com/GradyWarrenRusli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl neo-card !p-0 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#111] dark:hover:text-white hover:!shadow-[3px_3px_0px_#111]"
                >
                  <GitHubIcon size={22} />
                </a>
                <a
                  href="https://www.instagram.com/user137291928167119/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl neo-card !p-0 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#E4405F] hover:!shadow-[3px_3px_0px_#E4405F]"
                >
                  <InstagramIcon size={22} />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="neo-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-body text-sm font-medium text-[#111] dark:text-white">
                  Available for Projects
                </span>
              </div>
              <p className="font-body text-xs text-gray-500 dark:text-gray-400">
                Saat ini saya menerima project baru dengan estimasi pengerjaan 1-2 minggu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
