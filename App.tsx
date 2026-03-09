import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Cursor from './components/ui/Cursor';
import { Theme } from './types';

const App: React.FC = () => {
  // Mobile check to conditionally render custom cursor (custom cursors can be annoying on touch devices)
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="bg-zinc-50 dark:bg-obsidian min-h-screen text-zinc-900 dark:text-white selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {!isMobile && <Cursor />}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default App;