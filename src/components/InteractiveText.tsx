
import React, { useRef, useEffect, useState } from 'react';

interface InteractiveTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ text, className = "", as: Component = "span" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getCharacterStyle = (index: number, charRef: HTMLSpanElement | null) => {
    if (!charRef || !isHovering || !containerRef.current) return {};

    const rect = charRef.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const charCenterX = rect.left - containerRect.left + rect.width / 2;
    const charCenterY = rect.top - containerRect.top + rect.height / 2;

    const deltaX = charCenterX - mousePos.x;
    const deltaY = charCenterY - mousePos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance = 80;
    const force = Math.max(0, (maxDistance - distance) / maxDistance);
    
    const pushX = (deltaX / distance) * force * 15;
    const pushY = (deltaY / distance) * force * 15;

    return {
      transform: `translate(${isNaN(pushX) ? 0 : pushX}px, ${isNaN(pushY) ? 0 : pushY}px)`,
      transition: 'transform 0.2s ease-out',
    };
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {text.split('').map((char, index) => {
        const spanRef = useRef<HTMLSpanElement>(null);
        
        return (
          <span
            key={index}
            ref={spanRef}
            className="inline-block"
            style={getCharacterStyle(index, spanRef.current)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
};

export default InteractiveText;
