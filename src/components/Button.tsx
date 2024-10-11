import { cn } from '@/lib/utils';
import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type ButtonColor = 'silver' | 'gold' | 'green' | 'magenta' | 'red';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  icon?: ReactNode;
}

const Button = ({
  color = 'silver',
  icon,
  children,
  ...props
}: ButtonProps) => {
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
    () => ({
      silver: `radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 192, 192, 0.6), rgba(169, 169, 169, 0.2) 70%, transparent 80%)`,
      gold: `radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.6), rgba(184, 134, 11, 0.2) 70%, transparent 80%)`,
      green: `radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 205, 50, 0.6), rgba(34, 139, 34, 0.2) 70%, transparent 80%)`,
      magenta: `radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 255, 0.6), rgba(199, 21, 133, 0.2) 70%, transparent 80%)`,
      red: `radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 0, 0.6), rgba(178, 34, 34, 0.2) 70%, transparent 80%)`,
    }),
    [mousePosition],
  );
  const border = {
    silver: 'hover:border-silver',
    gold: 'hover:border-gold',
    green: 'hover:border-green',
    magenta: 'hover:border-magenta',
    red: 'hover:border-red',
  };

  return (
    <button
      ref={buttonRef}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        'relative block overflow-hidden rounded-full border border-gray-700 px-12 py-5 text-lg font-extralight text-gray-300 transition-all duration-[225ms] hover:text-white',
        border[color],
        isHovering ? 'scale-105' : 'scale-100',
        isPressed && 'scale-100',
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="z-10">{icon}</span>}
        <span className="z-10">{children}</span>
      </div>

      {/* Grandient */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-[250ms] ease-out',
          isHovering ? 'opacity-1' : 'opacity-0',
        )}
        style={{ background: gradient[color] }}
      />
    </button>
  );
};

export default Button;
