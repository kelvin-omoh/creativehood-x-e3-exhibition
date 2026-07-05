import React from 'react'
import { footerLinks, themes } from '../constants'

const Footer = ({ activeTheme, setActiveTheme }) => {
  return (
    <footer className="py-5 sm:px-10 px-5 bg-black border-t border-white/5">
      <div className="screen-max-width">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="font-semibold text-gray text-xs">
              Exhibition curated by {' '}
              <span className="underline text-amber-500 cursor-pointer">
                E3 Studios
              </span>{' '}
              in collaboration with {' '}
              <span className="underline text-amber-500 cursor-pointer">
                Creativehood
              </span>.
            </p>
            <p className="font-semibold text-gray text-xs mt-1">
              For inquiries, contact the exhibition office or E3 Studios.
            </p>
          </div>

          {/* Theme Dropdown Selector */}
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md self-start sm:self-center shadow-inner">
            <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-neutral-400">Theme</span>
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-2 hover:text-amber-500 transition-colors border-none"
            >
              {themes.map((t) => (
                <option key={t.name} value={t.name} className="bg-neutral-900 text-white font-semibold">
                  {t.name} Accent
                </option>
              ))}
            </select>
            {/* Visual color indicator dot */}
            <span 
              className="w-2.5 h-2.5 rounded-full border border-white/15 shadow-inner transition-all duration-300 shrink-0"
              style={{ 
                backgroundColor: themes.find(t => t.name === activeTheme)?.color,
                boxShadow: `0 0 6px ${themes.find(t => t.name === activeTheme)?.color}`
              }}
            />
          </div>
        </div>

        <div className="bg-neutral-800 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between gap-4">
          <p className="font-semibold text-gray text-xs">Copyright © 2026 E3 Studios / Creativehood. All rights reserved.</p>
          <div className="flex flex-wrap gap-y-2">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray text-xs cursor-pointer hover:text-white transition-colors">
                {link}{' '}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2 text-neutral-600"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer