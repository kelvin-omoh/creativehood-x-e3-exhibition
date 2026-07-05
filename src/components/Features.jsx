import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import gsap from 'gsap';

const Features = () => {
  const containerRef = useRef();

  useGSAP(() => {
    animateWithGsap('#features_title', { y: 0, opacity: 1 });
    animateWithGsap(
      '.exhibition-grid-img',
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    );
    animateWithGsap(
      '.g_text',
      { y: 0, opacity: 1, ease: 'power2.out', duration: 1 }
    );
  }, { scope: containerRef });

  return (
    <section id="features" ref={containerRef} className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Explore the full story.</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-16 sm:mt-32 mb-12 sm:mb-24 pl-4 sm:pl-6 md:pl-24 w-full text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold">E3 Creativehood.</h2>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-amber-500">Forged in music.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10 w-full">
            {/* Stage Showcase Hero Banner */}
            <div className="relative h-[40vh] sm:h-[55vh] md:h-[65vh] w-full flex items-center justify-center rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-8 sm:mb-12 bg-neutral-950">
              {/* Blurred background backing */}
              <img 
                src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.42.jpeg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-105 pointer-events-none"
              />
              {/* Contained foreground image */}
              <img 
                src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.42.jpeg" 
                alt="Stage Performance" 
                className="relative z-10 max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-[4000ms] ease-out pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 z-30">
                <span className="text-amber-500 font-semibold tracking-widest text-[10px] sm:text-xs uppercase block mb-1">Live Arena Performance</span>
                <h3 className="text-lg sm:text-2xl font-bold text-white">Capturing the Legendary Energy</h3>
              </div>
            </div>

            <div className="flex flex-col w-full relative">
              {/* Split Dual-Portraits Grid */}
              <div className="feature-video-container mb-12">
                <div className="overflow-hidden flex-1 h-[45vh] sm:h-[55vh] rounded-3xl border border-white/10 shadow-xl relative group bg-neutral-950 flex items-center justify-center">
                  <img 
                    src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.05.jpeg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-105 pointer-events-none"
                  />
                  <img 
                    src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.05.jpeg" 
                    alt="Artistic Silhouette" 
                    className="relative z-10 max-h-[90%] max-w-[90%] object-contain opacity-0 scale-100 exhibition-grid-img transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-20 pointer-events-none" />
                </div>
                <div className="overflow-hidden flex-1 h-[45vh] sm:h-[55vh] rounded-3xl border border-white/10 shadow-xl relative group bg-neutral-950 flex items-center justify-center">
                  <img 
                    src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.06.jpeg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-105 pointer-events-none"
                  />
                  <img 
                    src="/assets/newImages/WhatsApp Image 2026-07-05 at 13.27.06.jpeg" 
                    alt="Studio Spotlight" 
                    className="relative z-10 max-h-[90%] max-w-[90%] object-contain opacity-0 scale-100 exhibition-grid-img transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-20 pointer-events-none" />
                </div>
              </div>

              {/* Descriptions container */}
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text leading-relaxed">
                    E3 Creativehood Exhibition celebrates the {" "}
                    <span className="text-white">
                      musical genius, visual identity, and signature sound
                    </span>{" "}
                    that have solidified Peruzzi's legacy in the global music arena.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text leading-relaxed">
                    From intimate production details to major arena events, {" "}
                    <span className="text-white">
                      every art piece speaks volumes.
                    </span>{" "}
                    Experience the passion, craftsmanship, and dedication that E3 Studios preserves in this iconic collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features