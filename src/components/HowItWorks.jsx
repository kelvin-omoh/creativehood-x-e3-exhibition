import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from('#studio-logo', {
      scrollTrigger: {
        trigger: '#studio-logo',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 1.5,
      duration: 1.5,
      ease: 'power3.out'
    });

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
      stagger: 0.1
    });
  }, { scope: containerRef });

  return (
    <section id="biography" ref={containerRef} className="common-padding bg-zinc/40 relative">
      <div className="screen-max-width">
        {/* Brand Symbol / Title */}
        <div id="studio-logo" className="flex flex-col items-center justify-center w-full my-20">
          <img 
            src="/assets/newImages/E3 Studios GRD PNG-01-01-01 3.PNG" 
            alt="E3 Studios Logo" 
            className="h-28 w-auto object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform duration-300"
          />
          <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mt-4">E3 Studios</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="hiw-title text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
            The Signature Sound.
            <br /> A Masterclass in Rhythm.
          </h2>

          <p className="hiw-subtitle max-w-2xl text-neutral-400 mt-6 text-lg sm:text-xl">
            Go behind the scenes of the events, recording studios, and songwriting sessions that formed the sound of a generation.
          </p>
        </div>

        {/* Feature Artwork Showcase */}
        <div className="mt-8 md:mt-20 mb-12 sm:mb-20 flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-[650px] aspect-[4/3] sm:aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 flex items-center justify-center group">
            {/* Blurred backdrop image */}
            <img 
              src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.08.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-105 pointer-events-none"
            />

            {/* Main contained image */}
            <img 
              src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.08.jpeg"
              alt="Studio Session Artwork"
              className="relative z-10 max-h-[90%] max-w-[90%] object-contain group-hover:scale-102 transition-transform duration-[5000ms] ease-out pointer-events-none rounded-2xl shadow-xl"
            />

            {/* Overlapping glass shines */}
            <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay opacity-40" />
            <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay-2 opacity-30" />
          </div>

          {/* Clean, dedicated placard below the artwork to prevent overlay blocking */}
          <div className="mt-6 text-center z-30 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3.5 rounded-2xl shadow-lg hover:border-white/20 transition-all select-none">
            <span className="text-amber-500 font-semibold tracking-[0.2em] text-[10px] uppercase block mb-0.5">Archived Collection #8</span>
            <p className="text-white text-base font-bold tracking-wide">Studio Session Insights</p>
          </div>
        </div>

        {/* Stats Grid & Description */}
        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col gap-6">
            <p className="hiw-text g_fadeIn text-neutral-300 leading-relaxed text-lg">
              E3 Studios is dedicated to preserving the <span className="text-white font-semibold">raw, unfiltered essence</span> of music creation.
            </p>

            <p className="hiw-text g_fadeIn text-neutral-300 leading-relaxed text-lg">
              Every photograph, recording note, and artifact in the exhibition represents a <span className="text-white font-semibold">monumental milestone</span> in songwriting, performance, and creative collaboration.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-16">
            <div className="mb-4">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Global Impact</p>
              <p className="text-5xl font-black text-amber-500">1.2B+</p>
              <p className="text-sm text-neutral-300 mt-1 font-medium">Digital Music Streams</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Honors & Awards</p>
              <p className="text-5xl font-black text-white">15+</p>
              <p className="text-sm text-neutral-300 mt-1 font-medium">Platinum Songs & Events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks