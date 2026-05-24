import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ElectricBorder({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = '',
  style = {},
}: ElectricBorderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dashOffset = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const w = dimensions.width;
    const h = dimensions.height;
    const r = Math.min(borderRadius, w / 4, h / 4);

    // Generate path with chaos distortion
    const segments = 80;
    let pathD = '';

    // Top edge
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = r + (w - 2 * r) * t;
      const noise = (Math.random() - 0.5) * chaos * 20;
      const y = noise;
      pathD += (i === 0 ? 'M' : 'L') + `${x},${y}`;
    }

    // Right edge
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = r + (h - 2 * r) * t;
      const noise = (Math.random() - 0.5) * chaos * 20;
      const x = w + noise;
      pathD += ` L${x},${y}`;
    }

    // Bottom edge
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = w - r - (w - 2 * r) * t;
      const noise = (Math.random() - 0.5) * chaos * 20;
      const y = h + noise;
      pathD += ` L${x},${y}`;
    }

    // Left edge
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = h - r - (h - 2 * r) * t;
      const noise = (Math.random() - 0.5) * chaos * 20;
      const x = noise;
      pathD += ` L${x},${y}`;
    }

    pathD += ' Z';

    if (pathRef.current && glowRef.current) {
      pathRef.current.setAttribute('d', pathD);
      glowRef.current.setAttribute('d', pathD);
    }
  }, [dimensions, chaos, borderRadius]);

  // Animate dash offset
  useEffect(() => {
    const animate = () => {
      dashOffset.current -= 2 * speed;
      if (pathRef.current && glowRef.current) {
        pathRef.current.style.strokeDashoffset = `${dashOffset.current}`;
        glowRef.current.style.strokeDashoffset = `${dashOffset.current}`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [speed, dimensions]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ padding: 4, ...style }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        width={dimensions.width + 8}
        height={dimensions.height + 8}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`glow-${color.replace('#', '')}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer */}
        <path
          ref={glowRef}
          fill="none"
          stroke={color}
          strokeWidth="4"
          opacity="0.4"
          filter={`url(#glow-${color.replace('#', '')})`}
          strokeDasharray="20 10"
        />

        {/* Main line */}
        <path
          ref={pathRef}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="20 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
