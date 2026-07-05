import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

// Professional photo archives with EXIF details, descriptions and styles
const galleryPieces = [
  {
    id: 1,
    title: "Golden Hour Portrait",
    exif: "85mm • f/1.4 • 1/160s • ISO 100",
    frameName: "Matte Basalt Oak Frame",
    desc: "A warm spectrum lighting study capturing soft afternoon highlights reflecting off ambient studio surfaces.",
    color: "#18181b",
    bgGlow: "rgba(255, 255, 255, 0.03)",
    img: "/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.43 (1).jpeg",
    style: {
      borderColor: "#1c1917",
      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.95), inset 0 0 20px rgba(255, 255, 255, 0.05)",
      background: "linear-gradient(145deg, #09090b, #1c1917)",
    }
  },
  {
    id: 2,
    title: "Obsidian Shadow",
    exif: "50mm • f/1.2 • 1/250s • ISO 50",
    frameName: "Brushed Anodized Titanium Frame",
    desc: "High-contrast monochrome portraiture capturing deep shadows, sharp silhouettes, and detailed facial textures.",
    color: "#78716c",
    bgGlow: "rgba(120, 113, 108, 0.1)",
    img: "/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.43 (2).jpeg",
    style: {
      borderColor: "#44403c",
      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(120, 113, 108, 0.15)",
      background: "linear-gradient(145deg, #292524, #1c1917)",
    }
  },
  {
    id: 3,
    title: "Backlit Ice Glass",
    exif: "35mm • f/1.8 • 1/80s • ISO 200",
    frameName: "Frosted Studio Acrylic Frame",
    desc: "A modern, high-key study leveraging backlighting to create a clean halo effect behind the subject.",
    color: "#e4e4e7",
    bgGlow: "rgba(255, 255, 255, 0.08)",
    img: "/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.43 (3).jpeg",
    style: {
      borderColor: "rgba(255, 255, 255, 0.18)",
      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.85), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
      background: "linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))",
      backdropFilter: "blur(20px)",
    }
  },
  {
    id: 4,
    title: "Studio Sessions",
    exif: "24mm • f/2.8 • 1/125s • ISO 400",
    frameName: "Anodized Studio Silver Frame",
    desc: "Intimate candid workspace portrait capturing the concentration and creative workflow inside E3 Studios.",
    color: "#cbd5e1",
    bgGlow: "rgba(214, 211, 209, 0.1)",
    img: "/assets/newImages/WhatsApp Image 2026-07-05 at 13.31.43.jpeg",
    style: {
      borderColor: "#878683",
      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.88), inset 0 0 20px rgba(255, 255, 255, 0.2)",
      background: "linear-gradient(145deg, #d6d3d1, #a8a29e)",
    }
  }
];

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState(galleryPieces[0]);
  const frameRef = useRef(null);
  const placardRef = useRef(null);

  // 3D Parallax Hover Tilt Effect on the Artwork Frame
  const handleMouseMove = (e) => {
    const card = frameRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Smooth 3D tilt limit
    const rotateX = -y / (box.height / 10);
    const rotateY = x / (box.width / 10);
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = frameRef.current;
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Dynamic Scale on Art Frame Dimensions Change
  useEffect(() => {
    if (size === 'large') {
      gsap.to(frameRef.current, {
        scale: 1.06,
        duration: 0.8,
        ease: "back.out(1.5)",
      });
    } else {
      gsap.to(frameRef.current, {
        scale: 0.92,
        duration: 0.8,
        ease: "back.out(1.5)",
      });
    }
  }, [size]);

  // Flash Placard on Curation Property Update
  useEffect(() => {
    gsap.fromTo(placardRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [model, size]);

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1, duration: 1 });
  }, []);

  return (
    <section id="gallery" className="common-padding bg-black relative overflow-hidden">
      {/* Subtle fine darkroom grids background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="screen-max-width relative z-10">
        <div className="mb-2">
          <span className="text-amber-500 text-xs font-semibold tracking-[0.4em] uppercase block mb-1">Exhibition Desk</span>
          <h1 id="heading" className="section-heading">Take a closer look.</h1>
        </div>

        {/* Gallery Exhibition Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          
          {/* Left Side: Art Gallery Spotlight & Framed Artwork (col-span-7) */}
          <div 
            className="lg:col-span-7 w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden relative rounded-[2.5rem] border border-white/5 py-10 shadow-2xl bg-zinc-950/80"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(5, 5, 8, 0.99) 80%)"
            }}
          >
            {/* Spotlight cone glow overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Virtual Frame Container with double mat board shadows and 3D tilt */}
            <div
              ref={frameRef}
              style={{ ...model.style, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[3/4] rounded-[2.2rem] border-[14px] p-6 transition-transform duration-300 ease-out overflow-hidden flex flex-col items-center justify-center cursor-crosshair shadow-black shadow-2xl"
            >
              {/* Passe-Partout Inner border line layers to create depth */}
              <div className="absolute inset-1.5 rounded-2xl border border-black/40 pointer-events-none z-20" />
              <div className="absolute inset-3 rounded-2xl border border-black/25 pointer-events-none z-20" />
              
              {/* Picture Inner Canvas */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 shadow-inner border border-black/40 flex items-center justify-center">
                {/* Ambient blurred backdrop copy of image */}
                <img
                  src={model.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-35 scale-105 pointer-events-none"
                />

                {/* Main contained image */}
                <img
                  key={model.img}
                  src={model.img}
                  alt={model.title}
                  className="relative z-10 max-h-full max-w-full object-contain animate-fade-in pointer-events-none shadow-2xl"
                />
                
                {/* Premium Glass Glare Overlays */}
                <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay opacity-50" />
                <div className="absolute inset-0 z-20 pointer-events-none image-shimmer-overlay-2 opacity-30" />
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Curation placard & selectors (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Museum Exhibition Placard */}
            <div 
              ref={placardRef}
              className="p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-2xl shadow-2xl relative overflow-hidden mb-8"
            >
              {/* Inner placard border accent */}
              <div className="absolute inset-4 rounded-xl border border-white/[0.03] pointer-events-none" />

              <span className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                Archive Exhibit Record
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight tracking-tight">
                {model.title}
              </h3>
              <p className="text-neutral-400 font-semibold mb-6 flex items-center justify-between">
                <span>Artist: <span className="text-white hover:underline cursor-pointer">PERUZZI</span></span>
                <span className="text-xs font-mono bg-white/5 px-2.5 py-1 rounded border border-white/5 text-amber-500/80">{model.exif}</span>
              </p>

              <div className="space-y-4 text-sm text-neutral-300 font-light border-t border-white/10 pt-6">
                <div>
                  <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase block mb-1">Exhibition Details</span>
                  <p className="text-neutral-300 text-sm leading-relaxed">{model.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase block mb-0.5">Format Mount</span>
                    <p className="text-neutral-200 text-sm">{size === 'small' ? 'A2 Studio Mount' : 'A1 Gallery Master'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase block mb-0.5">Physical Print</span>
                    <p className="text-neutral-200 text-sm">{size === 'small' ? '42.0 x 59.4 cm' : '59.4 x 84.1 cm'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase block mb-0.5">Frame Style</span>
                    <p className="text-neutral-200 text-sm">{model.frameName.split(" Frame")[0]}</p>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase block mb-0.5">Edition Release</span>
                    <p className="text-neutral-200 text-sm">
                      {size === 'small' ? 'Ltd. Edition (1 of 10)' : 'Rare Master (1 of 5)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Controllers (Film Contact Sheet & Layout Format options) */}
            <div className="flex flex-col gap-6 px-2">
              
              {/* Contact Sheet Image Selector */}
              <div className="flex flex-col gap-3">
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest pl-1">Exhibition Contact Sheet</span>
                <div className="flex flex-wrap gap-4 items-center">
                  {galleryPieces.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setModel(item)}
                      className={`cursor-pointer transition-all duration-300 relative rounded-xl overflow-hidden border-2 ${
                        model.id === item.id 
                          ? "border-amber-500 scale-105 shadow-lg shadow-amber-500/20" 
                          : "border-white/10 opacity-55 hover:opacity-90"
                      }`}
                    >
                      <div className="w-16 h-20 bg-neutral-900 flex items-center justify-center p-0.5">
                        <img src={item.img} alt="" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      {/* Color Dot swatch inside thumbnail to show frame material choice */}
                      <span 
                        className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm"
                        style={{ backgroundColor: item.color }}
                        title={item.frameName}
                      />
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white/50 bg-black/60 px-1 rounded-sm">{`#0${item.id}`}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format selection toggles */}
              <div className="flex flex-col gap-3">
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest pl-1">Print Dimensions</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* Studio Mount */}
                  <div 
                    onClick={() => setSize('small')}
                    className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all duration-300 select-none ${
                      size === 'small' 
                        ? "border-white bg-white/[0.06] shadow-xl" 
                        : "border-white/10 hover:border-white/20 opacity-55"
                    }`}
                  >
                    <div className="w-7 h-9 border border-neutral-400 rounded flex items-center justify-center text-[10px] font-mono text-neutral-300 shrink-0">A2</div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Studio Mount</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">42.0 x 59.4 cm</p>
                    </div>
                  </div>

                  {/* Gallery Master */}
                  <div 
                    onClick={() => setSize('large')}
                    className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all duration-300 select-none ${
                      size === 'large' 
                        ? "border-white bg-white/[0.06] shadow-xl" 
                        : "border-white/10 hover:border-white/20 opacity-55"
                    }`}
                  >
                    <div className="w-8 h-10 border border-neutral-300 rounded flex items-center justify-center text-[10px] font-mono text-white font-semibold shrink-0">A1</div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Gallery Master</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">59.4 x 84.1 cm</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Model;