import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', expectations: '' });
  const [showToast, setShowToast] = useState(false);
  const toastRef = useRef(null);
  const sectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger toast notification
    setShowToast(true);

    // Clear form inputs
    setForm({ name: '', email: '', expectations: '' });
  };

  // Animate Toast rise and fall
  useGSAP(() => {
    if (showToast && toastRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide toast state after animation finishes
          setTimeout(() => {
            gsap.to(toastRef.current, {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => setShowToast(false)
            });
          }, 3500); // Hold for 3.5 seconds
        }
      });

      tl.fromTo(toastRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [showToast]);

  return (
    <section id="contact" ref={sectionRef} className="common-padding bg-zinc relative overflow-hidden flex items-center justify-center">
      {/* Background ambient glow matching the museum theme */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <div className="screen-max-width w-full relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-amber-500 text-xs font-semibold tracking-[0.4em] uppercase block mb-2">RSVP & Inquiry</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Join the Exhibition.
          </h2>
          <p className="text-neutral-400 font-light mb-10 text-sm sm:text-base leading-relaxed">
            Request catalog details, private exhibition bookings, or register interest for the upcoming Peruzzi exhibition events.
          </p>

          {/* Glassmorphic Contact Card */}
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-2xl shadow-2xl relative text-left"
          >
            {/* Aesthetic card frame border highlight */}
            <div className="absolute inset-4 rounded-3xl border border-white/[0.02] pointer-events-none" />

            <div className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-bold uppercase tracking-widest pl-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Adrian Hajdin"
                  required
                  className="px-5 py-4 rounded-xl bg-white border border-neutral-300 focus:border-amber-500 text-black placeholder-neutral-400 outline-none text-sm transition-all shadow-inner font-medium"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-bold uppercase tracking-widest pl-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. contact@creativehood.com"
                  required
                  className="px-5 py-4 rounded-xl bg-white border border-neutral-300 focus:border-amber-500 text-black placeholder-neutral-400 outline-none text-sm transition-all shadow-inner font-medium"
                />
              </div>

              {/* Expectations / Inquiries Area */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-bold uppercase tracking-widest pl-1">What do you expect to see?</label>
                <textarea
                  rows={4}
                  value={form.expectations}
                  onChange={(e) => setForm({ ...form, expectations: e.target.value })}
                  placeholder="Tell us what you expect from the exhibition, or specify catalog / private VIP tour requests..."
                  required
                  className="px-5 py-4 rounded-xl bg-white border border-neutral-300 focus:border-amber-500 text-black placeholder-neutral-400 outline-none text-sm transition-all shadow-inner resize-none leading-relaxed font-medium"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/10 uppercase tracking-widest text-xs mt-4"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Luxury Float Toast Message */}
      {showToast && (
        <div
          ref={toastRef}
          className="fixed bottom-10 z-50 px-6 py-4 rounded-2xl border border-white/15 bg-gradient-to-r from-zinc-900 to-black backdrop-blur-xl shadow-2xl flex items-center gap-4 max-w-md w-[90%]"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-extrabold text-sm shrink-0 shadow-inner">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Inquiry Received</h4>
            <p className="text-xs text-neutral-200 mt-0.5 leading-relaxed">
              Thank you! E3 Studios and Creativehood appreciate your interest. We will contact you shortly regarding the exhibition list.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
