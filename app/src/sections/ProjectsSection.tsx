import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ElectricBorder from '../components/ElectricBorder';
import { ExternalLinkIcon } from '../components/SocialIcons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'FinFlow Dashboard',
    desc: 'Fintech analytics dashboard dengan real-time data visualization, charts interaktif, dan reporting system untuk financial institutions.',
    image: '/images/project-finflow.jpg',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    demo: '#',
    code: 'https://github.com/GradyWarrenRusli',
  },
  {
    title: 'EcoVibe Marketplace',
    desc: 'E-commerce platform untuk produk sustainable dengan payment gateway integration, inventory management, dan review system.',
    image: '/images/project-ecovibe.jpg',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    demo: '#',
    code: 'https://github.com/GradyWarrenRusli',
  },
  {
    title: 'DevNest Social',
    desc: 'Developer community platform dengan code sharing, real-time chat, job board, dan collaborative coding environment.',
    image: '/images/project-devnest.jpg',
    tags: ['Node.js', 'MongoDB', 'Socket.io', 'Express'],
    demo: '#',
    code: 'https://github.com/GradyWarrenRusli',
  },
  {
    title: 'PixelCraft Studio',
    desc: 'Online design tool dengan canvas manipulation, layer management, dan export ke berbagai format gambar.',
    image: '/images/project-pixelcraft.jpg',
    tags: ['React', 'Canvas API', 'WebGL', 'Firebase'],
    demo: '#',
    code: 'https://github.com/GradyWarrenRusli',
  },
];

export default function ProjectsSection() {
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
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Featured Projects
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Selected works showcasing my expertise
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ElectricBorder
                color="#5227FF"
                speed={1.5}
                chaos={0.08}
                borderRadius={16}
                className="h-full"
              >
                <div className="neo-card h-full flex flex-col overflow-hidden">
                  {/* Project Image with RGB border */}
                  <div className="rgb-border m-2 mb-0">
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg md:text-xl font-medium text-[#111] dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="neo-tag text-[10px] text-[#111] dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.demo}
                        className="flex-1 neo-btn neo-btn-primary text-xs py-2"
                      >
                        <ExternalLinkIcon size={14} />
                        Live Demo
                      </a>
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 neo-btn neo-btn-secondary text-xs py-2"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
