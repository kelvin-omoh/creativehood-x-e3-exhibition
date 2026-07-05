import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { themes } from './constants';

import * as Sentry from '@sentry/react';

const App = () => {
  const [activeTheme, setActiveTheme] = useState('Gold');

  // Dynamically set CSS root variables on activeTheme changes
  useEffect(() => {
    const theme = themes.find(t => t.name === activeTheme) || themes[0];
    document.documentElement.style.setProperty('--accent-color-rgb', theme.rgb);
    document.documentElement.style.setProperty('--accent-color-hover-rgb', theme.hoverRgb);
    document.documentElement.style.setProperty('--accent-color', theme.color);
    document.documentElement.style.setProperty('--accent-color-hover', `rgba(${theme.hoverRgb}, 1)`);
  }, [activeTheme]);

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Contact />
      <Footer activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
    </main>
  );
};

export default Sentry.withProfiler(App);
