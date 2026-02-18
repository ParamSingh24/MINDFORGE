
import React, { useRef, useEffect, useState } from 'react';

interface InteractiveTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ text, className = "", as: Component = "span" }) => {
  const containerRef = useRef<HTMLElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
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

  // Reset refs array when text changes to avoid stale refs or memory leaks
  useEffect(() => {
    spanRefs.current = spanRefs.current.slice(0, text.length);
  }, [text]);

  const getCharacterStyle = (index: number) => {
    const charRef = spanRefs.current[index];
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

  const Tag = Component as any;

  return (
    <Tag ref={containerRef} className={`relative inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => { spanRefs.current[index] = el; }}
          className="inline-block"
          style={getCharacterStyle(index)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
};

export default InteractiveText;
