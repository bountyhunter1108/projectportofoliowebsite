import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { StarIcon, QuoteIcon } from '../components/SocialIcons';
import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: 'Grady delivered exceptional work on our platform. His attention to detail and problem-solving skills are outstanding. The project was completed on time and exceeded our expectations.',
    name: 'Sarah Kristin',
    role: 'CEO, TechStart Inc.',
    rating: 5,
  },
  {
    text: 'Working with Grady was a game-changer for our team. He brought innovative solutions to complex problems and was always responsive to our needs. Highly recommended!',
    name: 'Michael Wijaya',
    role: 'Product Manager, InnovateCo',
    rating: 5,
  },
  {
    text: "Grady's technical expertise and professionalism made our project a success. He has a rare combination of coding skills and design sensibility that delivers outstanding results.",
    name: 'Emily Simanjuntak',
    role: 'CTO, DataFlow Systems',
    rating: 5,
  },
  {
    text: 'Sangat profesional dan komunikatif. Website yang dibuat sangat bagus dan sesuai ekspektasi. Pengerjaan juga cepat dan rapi. Highly recommended!',
    name: 'Andi Pratama',
    role: 'Founder, Warung Digital',
    rating: 5,
  },
  {
    text: 'Grady built our e-commerce platform from scratch. The result was amazing - fast, secure, and beautiful. Sales increased by 40% after the launch.',
    name: 'Lisa Chen',
    role: 'Owner, Bloom Boutique',
    rating: 5,
  },
  {
    text: 'Keamanan website kami meningkat drastis setelah diaudit oleh Grady. Sangat paham celah keamanan dan cara menanganinya secara efisien.',
    name: 'Budi Santoso',
    role: 'VP of Engineering, GoTrade ID',
    rating: 5,
  },
  {
    text: 'Highly skilled fullstack developer. Grady helped us integrate payment systems and clean up legacy code. The system runs beautifully now.',
    name: 'Jessica Lawrence',
    role: 'Marketing Director, CreativeScale',
    rating: 5,
  },
  {
    text: 'Desain website profile bisnis kami sangat modern dan cepat sekali diakses. Banyak pelanggan baru datang lewat form kontak. Terima kasih, Grady!',
    name: 'Rian Hidayat',
    role: 'Co-Founder, Kopi Karsa',
    rating: 5,
  },
  {
    text: 'Grady translates design files into pixel-perfect code perfectly. His clean code structure made it extremely easy for our internal team to maintain.',
    name: 'Maria Amanda',
    role: 'Product Designer, Studio Karsa',
    rating: 5,
  },
  {
    text: 'We hired Grady to optimize our dashboard database. Loading time decreased from 8 seconds to under 1 second. Simply brilliant optimization.',
    name: 'David Carter',
    role: 'Operations Manager, Apex Logistics',
    rating: 5,
  },
  {
    text: 'Hasil kerja memuaskan, respons cepat jika ada kendala, dan selalu memberikan saran solusi yang terbaik untuk bisnis e-commerce kami.',
    name: 'Rina Lestari',
    role: 'CEO, Hijab Modern',
    rating: 5,
  },
  {
    text: 'Grady wrote a robust API wrapper for our backend. Super clean documentation, clean tests, and extremely secure. Will work with him again.',
    name: 'Kevin Sanjaya',
    role: 'Lead Developer, Fintech Nusantara',
    rating: 5,
  },
  {
    text: 'Pekerjaan rapi, selalu update progress tepat waktu, dan sangat solutif dalam menangani request fitur kustom kami yang kompleks.',
    name: 'Dian Sastro',
    role: 'Marketing Manager, Unilever Indonesia',
    rating: 5,
  },
  {
    text: 'Professional, punctual, and highly technically competent. Grady helped build our microservice architecture seamlessly.',
    name: 'Thomas Muller',
    role: 'Head of Tech, Munich Tech',
    rating: 5,
  },
  {
    text: 'Exceptional service. Grady didn\'t just write code, he helped us refine the user experience of our SaaS web application.',
    name: 'Clara Oswald',
    role: 'Founder, TimeTravel Co',
    rating: 5,
  },
  {
    text: 'Sistem booking makanan katering online kami berjalan lancar tanpa kendala. Integrasi WhatsApp bot-nya sangat membantu admin kami.',
    name: 'Yusuf Mansur',
    role: 'Owner, Catering Barokah',
    rating: 5,
  },
  {
    text: 'Grady helped us build an interactive landing page for our digital campaign. Conversion rates went up by 25%. Extremely happy with the results!',
    name: 'Rachel Vennya',
    role: 'Content Specialist, Agency Kita',
    rating: 5,
  },
  {
    text: 'Proses migrasi server dan optimasi performa web internal kami berjalan mulus tanpa downtime berkat bantuan teknis dari Grady.',
    name: 'Hendra Wijaya',
    role: 'Business Dev, Astra Internasional',
    rating: 5,
  },
  {
    text: 'Outstanding responsive layout. Our architecture portfolio looks stunning on mobile, tablet, and widescreen desktops alike.',
    name: 'Siti Rahma',
    role: 'Principal Architect, GreenDesign',
    rating: 5,
  },
  {
    text: 'A highly talented engineer. Grady quickly pinpointed safety risks in our database script and successfully patched them all.',
    name: 'Robert Downey',
    role: 'Tech Advisor, Stark Labs',
    rating: 5,
  },
  {
    text: 'Desain web interaktif dengan animasi yang smooth dan premium. Sangat cocok dengan target audiens market startup masa kini.',
    name: 'Grace Natalie',
    role: 'Product Lead, MediaGroup',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Client Testimonials
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            What people say about working with me
          </p>
        </div>

        {/* Auto-scrolling Testimonials Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="neo-card p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <QuoteIcon size={28} />

                {/* Stars */}
                <div className="flex gap-1 my-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} size={16} filled />
                  ))}
                </div>

                {/* Text */}
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-black dark:border-white">
                  <div className="w-10 h-10 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] bg-gradient-to-br from-[#5227FF] to-[#00D4FF] flex items-center justify-center text-white font-display font-bold text-sm select-none">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body text-sm font-bold text-[#111] dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="font-body text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
