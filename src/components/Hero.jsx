import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { peruzziImages } from '../constants';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const containerRef = useRef(null);

  // Cycle through background images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prevIndex) => (prevIndex + 1) % peruzziImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  useGSAP(() => {
    // Entrance animations for the main layout elements
    gsap.fromTo('.hero-text-content',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo('.hero-image-frame',
      { opacity: 0, x: 50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );

    // Fade in text wrapper
    gsap.fromTo('.peruzzi-text-wrapper',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.6 }
    );

    // Iconic dropping bounce animation for individual PERUZZI letters
    gsap.fromTo('.peruzzi-letter',
      { opacity: 0, y: -100, scale: 0.2, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'back.out(2.2)',
        stagger: 0.1,
        delay: 0.8,
        onComplete: () => {
          // Dynamic flash pop glow wave
          gsap.fromTo('.peruzzi-letter',
            { textShadow: '0 0 0px rgba(245,158,11,0)' },
            {
              textShadow: '0 0 25px rgba(245,158,11,0.95), 0 0 12px rgba(245,158,11,0.6)',
              duration: 0.6,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
              stagger: 0.05
            }
          );
        }
      }
    );
  }, { scope: containerRef });

  // Handle active slide transitions
  useGSAP(() => {
    // Ambient Blur Crossfade
    const activeBlur = `.blur-bg-${activeIndex}`;
    gsap.fromTo(activeBlur,
      { opacity: 0 },
      { opacity: 0.55, duration: 1.5, ease: 'power2.out' }
    );

    // Main Foreground Image Zoom/Crossfade
    const activeImg = `.hero-img-${activeIndex}`;
    gsap.fromTo(activeImg,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1.12, duration: 5, ease: 'linear' }
    );

    // Transition out previous elements if they exist
    if (prevIndex !== null && prevIndex !== undefined && prevIndex !== activeIndex) {
      gsap.to(`.blur-bg-${prevIndex}`, { opacity: 0, duration: 1.2 });
      gsap.to(`.hero-img-${prevIndex}`, { opacity: 0, duration: 1.2 });
    }
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="w-full min-h-screen relative bg-black overflow-hidden flex items-center justify-center pt-8 pb-20 sm:py-20">
      {/* Ambient Blurred Backgrounds (Creates matching color glow) */}
      <div className="absolute inset-0 z-0">
        {peruzziImages.map((src, idx) => {
          if (idx !== activeIndex && idx !== prevIndex) return null;
          return (
            <div
              key={`blur-${src}`}
              className={`absolute inset-0 bg-cover bg-center origin-center pointer-events-none filter blur-xl scale-105 blur-bg-${idx}`}
              style={{
                backgroundImage: `url("${src}")`,
                opacity: idx === activeIndex ? 0.55 : 0
              }}
            />
          );
        })}
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Main Split Content Container */}
      <div className="relative z-20 max-w-6xl w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

        {/* Mobile: Image first, then text. Desktop: reversed (text left, image right) */}
        {/* Right Column: Premium Portrait Frame — shown first on mobile */}
        <div className="lg:col-span-5 flex justify-center hero-image-frame lg:order-2 order-1">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-[2xl,_inset_0_1px_1px_rgba(255,255,255,0.15)] bg-gradient-to-b from-white/5 to-white/[0.01] backdrop-blur-md">

            {/* Elegant outer glow ring */}
            <div className="absolute inset-0 rounded-3xl border border-amber-500/10 pointer-events-none z-30" />

            {/* Slideshow inside the frame */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
              {peruzziImages.map((src, idx) => {
                if (idx !== activeIndex && idx !== prevIndex) return null;
                return (
                  <div
                    key={`frame-${src}`}
                    className={`absolute inset-0 bg-cover bg-center origin-center pointer-events-none hero-img-${idx}`}
                    style={{
                      backgroundImage: `url("${src}")`,
                      opacity: idx === activeIndex ? 1 : 0
                    }}
                  />
                );
              })}
            </div>

            {/* Glassy Sheen Overlays */}
            <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay" />
            <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay-2" />

            {/* Slide counter pill */}
            <div className="absolute bottom-4 right-4 z-30 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-xs text-neutral-300 font-medium">
              {activeIndex + 1} / {peruzziImages.length}
            </div>
          </div>
        </div>

        {/* Left Column: Glassmorphic Typography Card */}
        <div className="lg:col-span-7 text-left hero-text-content lg:order-1 order-2">
          <div className="p-5 sm:p-8 lg:p-10 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-2xl shadow-[2xl,_inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-black/55 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">
                Now Exhibiting
              </span>
              <span className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Exhibition Gallery
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-white via-neutral-200 to-amber-500 bg-clip-text text-transparent leading-tight">
              Creativehood & E3 Studio Presents
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed mb-6 sm:mb-8">
              The exhibition gallery of time and events of the legendary{" "}
              <span className="relative inline-flex overflow-hidden translate-y-[2px] peruzzi-text-wrapper px-1">
                {"PERUZZI".split("").map((char, index) => (
                  <span
                    key={index}
                    className="peruzzi-letter inline-block font-extrabold text-amber-500 shimmer-text"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#highlights"
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5 animate-pulse-subtle"
              >
                Explore Gallery
              </a>
              <a
                href="#gallery"
                className="px-8 py-3.5 bg-white/[0.07] hover:bg-white/[0.15] text-white font-semibold rounded-full border border-white/15 transition-all duration-300 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                Exhibition Details
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Progress Dots indicators at the bottom */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-4 scrollbar-none">
        {peruzziImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 shrink-0 ${idx === activeIndex
                ? 'w-5 sm:w-6 bg-amber-500'
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;