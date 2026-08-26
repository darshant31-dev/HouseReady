"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ beforeLabel = "Before", afterLabel = "Ready" }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] rounded-[3rem] overflow-hidden cursor-ew-resize select-none shadow-antigravity group"
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
    >
      {/* BACKGROUND (AFTER STATE) */}
      <div className="absolute inset-0 bg-teal-900 flex items-center justify-center overflow-hidden">
        {/* Placeholder for beautiful "Ready" room */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="z-10 text-white font-bold text-6xl tracking-tight opacity-20">READY</div>
        
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold tracking-widest text-sm uppercase">
          {afterLabel}
        </div>
      </div>

      {/* FOREGROUND (BEFORE STATE) */}
      <div 
        className="absolute inset-0 bg-[#1c1f22] flex items-center justify-center overflow-hidden border-r-4 border-white z-10"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* Placeholder for "Before" room */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale"></div>
        <div className="z-10 text-white font-bold text-6xl tracking-tight opacity-20">BEFORE</div>
        
        <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold tracking-widest text-sm uppercase whitespace-nowrap">
          {beforeLabel}
        </div>
      </div>

      {/* SLIDER HANDLE */}
      <div 
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-teal-700 transition-transform hover:scale-110 active:scale-95">
          <ArrowLeftRight className="w-6 h-6" />
        </div>
      </div>
      
      {/* INSTRUCTION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-md text-white text-sm font-medium px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        Drag to see the transformation
      </div>
    </div>
  );
}
