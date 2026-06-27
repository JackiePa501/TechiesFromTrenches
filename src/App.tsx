import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Problem from '@/sections/Problem';
import Benefits from '@/sections/Benefits';
import Pricing from '@/sections/Pricing';
import WhoThisIsFor from '@/sections/WhoThisIsFor';
import About from '@/sections/About';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Navigation lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />
      <Problem />
      <Benefits />
      <Pricing />
      <WhoThisIsFor />
      <About />
      <FinalCTA lenisRef={lenisRef} />
      <Footer />
    </div>
  );
}