import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

const Button = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Update mouse position
  const updateMousePosition = (e: MouseEvent, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMousePosition(newPosition);
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = (e: MouseEvent) => {
      setIsHovering(true);
      updateMousePosition(e, button);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    button.addEventListener('mouseenter', (e) => handleMouseEnter(e));
    button.addEventListener('mousemove', (e) => updateMousePosition(e, button));
    button.addEventListener('mouseleave', () => handleMouseLeave());
    return () => {
      button.removeEventListener('mouseenter', (e) => handleMouseEnter(e));
      button.removeEventListener('mousemove', (e) =>
        updateMousePosition(e, button),
      );
      button.removeEventListener('mouseleave', () => handleMouseLeave());
    };
  }, []);

  const gradient = useMemo(
    () =>
      `radial-gradient(180px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.6), rgba(184, 134, 11, 0.2) 70%, transparent 80%)`,
    [mousePosition],
  );

  return (
    <button
      ref={buttonRef}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        'relative overflow-hidden rounded-full border border-gray-700 px-6 py-3 text-lg font-extralight text-gray-300 transition-all duration-[225ms] hover:border-gold hover:text-white',
        isHovering ? 'scale-105' : 'scale-100',
        isPressed && 'scale-100',
      )}
    >
      <span className="z-10">Start here</span>

      {/* Grandient */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-[250ms] ease-out',
          isHovering ? 'opacity-1' : 'opacity-0',
        )}
        style={{ background: gradient }}
      />
    </button>
  );
};

export default Button;
