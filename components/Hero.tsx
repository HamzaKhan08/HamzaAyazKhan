import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background3D from "./Background3D";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLDivElement>(null);
  const preloaderBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Lock the scroll while the preloader is running
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Unlock scroll when animation finishes
          document.body.style.overflow = '';
        }
      });

      // 1. Preloader Animation (System Boot Sequence)
      tl.to(preloaderBarRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "expo.inOut"
      })
        .to(preloaderTextRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power3.in"
        }, "-=0.2")
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        })
        .set(preloaderRef.current, { display: "none" }); // Remove from DOM flow

      // 2. Reveal Hero
      tl.from(textRef.current, {
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power4.out",
        skewY: 5,
      }, "-=0.5").from(
        subRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Scroll Effect (Cinematic Exit + Parallax Background Shapes)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      scrollTl
        .to(
          textRef.current,
          {
            y: 250,
            scale: 0.85,
            opacity: 0,
            filter: "blur(15px)",
            ease: "power2.in",
          },
          0
        )
        .to(
          subRef.current,
          {
            y: 150,
            opacity: 0,
            filter: "blur(8px)",
            ease: "power2.in",
          },
          0.1
        );
    }, containerRef);

    return () => {
      // Safety cleanup if the component unmounts early
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Preloader Screen */}
      <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-obsidian flex flex-col items-center justify-center">
        <div className="overflow-hidden">
          <div ref={preloaderTextRef} className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
            Hello, Loading Developer Profile...
          </div>
        </div>
        <div className="w-48 md:w-64 h-[2px] bg-zinc-200 dark:bg-zinc-800 mt-6 overflow-hidden">
          <div ref={preloaderBarRef} className="h-full bg-indigo-500 w-full origin-left transform scale-x-0" />
        </div>
      </div>

      <div
        id="hero"
        ref={containerRef}
        className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-obsidian px-6 md:px-12 transition-colors duration-500"
      >
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200/40 via-zinc-50 to-zinc-50 dark:from-zinc-900/40 dark:via-obsidian dark:to-obsidian z-0" />

        {/* React Three Fiber 3D Background */}
        <Background3D />

        <div className="z-10 text-center will-change-transform max-w-6xl mx-auto pointer-events-none">
          <h1
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 leading-[1.1] md:leading-tight"
          >
            FULL STACK
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-600">
              DEVELOPER_
            </span>
          </h1>

          <div ref={subRef} className="max-w-xl mx-auto space-y-4 pointer-events-auto">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base md:text-xl font-light tracking-wide">
              Designing and building scalable, high-performance applications with React, Node.js, and AI.
            </p>
            <div className="flex justify-center gap-4 pt-10">
              <div className="animate-bounce">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-900 dark:text-white opacity-50"
                >
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
