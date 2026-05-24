import { useState, useCallback, useRef } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

export function useTilt(maxRotation: number = 10) {
  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxRotation * 2;
      const rotateX = (0.5 - y) * maxRotation * 2;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTilt({
          rotateX,
          rotateY,
          glowX: x * 100,
          glowY: y * 100,
        });
      });
    },
    [maxRotation]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  }, []);

  return {
    tilt,
    isHovering,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
