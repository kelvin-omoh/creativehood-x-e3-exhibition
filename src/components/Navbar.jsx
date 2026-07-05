import { useEffect, useRef, useState } from 'react';
import { navLists } from '../constants';

const Navbar = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Try to autoplay immediately; fall back to first interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Direct browser attempt
    const attemptPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    attemptPlay();

    // In case the browser blocks immediate autoplay, hook up all possible early interaction events
    const triggerEvents = ['click', 'touchstart', 'scroll', 'keydown', 'mousedown'];
    
    const handleFirstInteraction = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Remove listener once successful
          triggerEvents.forEach(event => {
            window.removeEventListener(event, handleFirstInteraction);
          });
        })
        .catch(() => {});
    };

    triggerEvents.forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { passive: true });
    });

    return () => {
      triggerEvents.forEach(event => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <header className="w-full py-3 sm:px-10 px-4 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
      {/* Hidden audio element with autoPlay enabled */}
      <audio
        ref={audioRef}
        src="/media/space-120280.mp3"
        loop
        preload="auto"
        autoPlay
      />

      <nav className="flex w-full screen-max-width items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/newImages/E3 Studios GRD PNG-01-01-01 3.PNG"
            alt="E3 Studios"
            className="h-12 sm:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLists.map((nav) => {
            const anchor = nav === 'Exhibition' ? '#' : `#${nav.toLowerCase()}`;
            return (
              <a
                key={nav}
                href={anchor}
                className="text-sm cursor-pointer text-gray-400 hover:text-white transition-all font-medium"
              >
                {nav}
              </a>
            );
          })}
        </div>

        {/* Right: Sound widget + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Equalizer sound widget */}
          <div
            onClick={toggleAudio}
            title={isPlaying ? 'Mute Ambient Sound' : 'Play Ambient Sound'}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] px-3 py-2 rounded-full cursor-pointer transition-all backdrop-blur-md select-none"
          >
            <div className="flex items-end gap-[3px] h-3 w-5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-[2px] h-full bg-amber-500 rounded-sm origin-bottom transition-all duration-300 ${isPlaying ? 'equalizer-bar' : ''}`}
                  style={!isPlaying ? { transform: 'scaleY(0.2)' } : {}}
                />
              ))}
            </div>
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-neutral-300 font-mono hidden sm:inline">
              {isPlaying ? 'Sound On' : 'Sound Off'}
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 z-50 py-4 px-5 flex flex-col gap-4">
          {navLists.map((nav) => {
            const anchor = nav === 'Exhibition' ? '#' : `#${nav.toLowerCase()}`;
            return (
              <a
                key={nav}
                href={anchor}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-amber-500 font-medium transition-colors py-1 border-b border-white/5"
              >
                {nav}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;