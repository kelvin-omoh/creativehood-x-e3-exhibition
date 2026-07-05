import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5 bg-black border-t border-white/5">
      <div className="screen-max-width">
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