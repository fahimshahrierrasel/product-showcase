'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroSlide } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  slides: HeroSlide[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-100">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative flex items-center">
            <div className="absolute inset-0 z-0">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={slide.imageUrl} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10 text-white">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8 text-gray-200">{slide.subtitle}</p>
                <Link href={slide.ctaLink}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                    {slide.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={next}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
