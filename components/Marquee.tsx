
import React from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 20, className = "" }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-block animate-marquee">
        <div className="flex items-center space-x-12 px-12">
          {items.map((item, i) => (
            <div key={`m1-${i}`} className="inline-block">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="inline-block animate-marquee">
        <div className="flex items-center space-x-12 px-12">
          {items.map((item, i) => (
            <div key={`m2-${i}`} className="inline-block">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
