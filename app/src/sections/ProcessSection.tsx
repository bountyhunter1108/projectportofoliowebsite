import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Konsultasi',
    desc: 'Diskusi kebutuhan website, target audience, dan fitur yang diinginkan.',
    duration: '1 Hari',
  },
  {
    num: '02',
    title: 'Desain',
    desc: 'Membuat wireframe dan mockup desain sesuai branding bisnis Anda.',
    duration: '2-3 Hari',
  },
  {
    num: '03',
    title: 'Revisi',
    desc: 'Perbaikan desain berdasarkan feedback Anda sampai approve.',
    duration: '1-3 Hari',
  },
  {
    num: '04',
    title: 'Launching',
    desc: 'Deploy website ke domain, final testing, dan handover.',
    duration: '1 Hari',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps stagger
      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none play',
            },
          }
        );
      }

      // Progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 2,
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium gradient-text mb-3">
            Work Process
          </h2>
          <p className="font-body text-gray-500 dark:text-gray-400">
            Proses kerja yang terstruktur dan transparan
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
            <div
              ref={lineRef}
              className="h-full bg-[#5227FF] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="step-item text-center opacity-0">
                {/* Number Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-[#1a1a1a] border-[3px] border-black dark:border-[#333] shadow-[3px_3px_0px_#5227FF] mb-6">
                  <span className="font-display text-xl font-bold text-[#5227FF]">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg md:text-xl font-medium text-[#111] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                  {step.desc}
                </p>
                <span className="inline-block px-3 py-1 bg-[#5227FF]/10 text-[#5227FF] font-mono text-xs rounded-full">
                  {step.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
