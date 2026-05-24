import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGTextElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Signature stroke animation
    if (signatureRef.current) {
      const pathLength = 500;
      gsap.set(signatureRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        fillOpacity: 0,
      });
      gsap.to(signatureRef.current, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      });
      gsap.to(signatureRef.current, {
        fillOpacity: 1,
        duration: 0.8,
        delay: 1.4,
        ease: 'power2.out',
      });
    }

    // Progress bar animation
    const progressTl = gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          // Fade out
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete();
            },
          });
          tl.to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
          })
            .to(
              progressRef.current,
              {
                opacity: 0,
                duration: 0.2,
              },
              '-=0.1'
            )
            .to(
              containerRef.current,
              {
                opacity: 0,
                scale: 1.02,
                duration: 0.6,
                ease: 'power2.inOut',
              },
              '-=0.1'
            );
        },
      }
    );

    return () => {
      progressTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
    >
      {/* Signature SVG */}
      <div className="mb-8">
        <svg
          width="280"
          height="120"
          viewBox="0 0 280 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Signature text "Grady" in cursive style */}
          <text
            ref={signatureRef}
            x="50%"
            y="80"
            textAnchor="middle"
            fontFamily="'Great Vibes', cursive"
            fontSize="80"
            stroke="#5227FF"
            strokeWidth="2.5"
            fill="#5227FF"
            filter="url(#glow)"
            className="select-none"
          >
            Grady
          </text>
        </svg>
      </div>

      {/* Loading Text with shiny effect */}
      <div
        ref={textRef}
        className="font-display text-2xl md:text-3xl font-medium mb-6 tracking-wide"
      >
        <span
          className="bg-gradient-to-r from-[#111] via-[#5227FF] to-[#111] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shiny-sweep_2s_linear_infinite]"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Loading Portfolio
        </span>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="w-64 md:w-80 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
      >
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #5227FF, #00D4FF)',
          }}
        />
      </div>

      {/* Progress Percentage */}
      <div className="mt-3 font-mono text-sm text-gray-500 dark:text-gray-400">
        {progress}%
      </div>
    </div>
  );
}
