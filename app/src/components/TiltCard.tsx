import { useRef, useState, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  maxRotation?: number;
}

export default function TiltCard({
  children,
  className = '',
  glowColor = '#5227FF',
  maxRotation = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxRotation * 2;
    const rotateX = (0.5 - y) * maxRotation * 2;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setGlowPos({ x: 50, y: 50 });
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}33 0%, transparent 70%)`,
          opacity: isHovering ? 1 : 0.3,
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Card content */}
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}
