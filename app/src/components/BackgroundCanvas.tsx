import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface FloatingLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  amplitude: number;
  phase: number;
  opacity: number;
}

interface WaveLine {
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  opacity: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    // Initialize particles (galaxy) - darker/more visible
    const particles: Particle[] = [];
    const particleCount = Math.min(400, Math.floor((width * height) / 3000));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.08,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize floating lines
    const lines: FloatingLine[] = [];
    const lineCount = Math.min(15, Math.floor(width / 100));
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 200 + 100,
        speed: Math.random() * 0.3 + 0.1,
        amplitude: Math.random() * 30 + 10,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.15 + 0.03,
      });
    }

    // Initialize wave lines
    const waves: WaveLine[] = [];
    for (let i = 0; i < 4; i++) {
      waves.push({
        y: height * (0.3 + i * 0.15),
        amplitude: 20 + i * 8,
        frequency: 0.003 + i * 0.001,
        phase: i * 1.5,
        speed: 0.005 + i * 0.002,
        opacity: 0.06 - i * 0.01,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw galaxy particles - navy/purple tones
      particles.forEach(p => {
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 39, 255, ${currentOpacity})`;
        ctx.fill();

        // Slow rotation around center
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + 0.0001 * (200 / (dist + 100));
        p.x = centerX + Math.cos(angle) * dist;
        p.y = centerY + Math.sin(angle) * dist;
      });

      // Draw floating lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 140, 220, ${line.opacity})`;
        ctx.lineWidth = 0.8;

        for (let i = 0; i < line.length; i += 2) {
          const x = line.x + i;
          const y = line.y + Math.sin((i * 0.02) + line.phase + time * line.speed) * line.amplitude;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        line.x += line.speed * 0.5;
        line.phase += 0.002;
        if (line.x > width) line.x = -line.length;
      });

      // Draw wave lines
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(82, 39, 255, ${wave.opacity})`;
        ctx.lineWidth = 1.2;

        for (let x = 0; x < width; x += 2) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Glow at peaks
        ctx.shadowColor = 'rgba(82, 39, 255, 0.3)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        wave.phase += wave.speed;
      });

      time += 1;
      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
