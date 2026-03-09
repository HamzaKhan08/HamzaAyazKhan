import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Reveal
      const tl = gsap.timeline();

      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        skewY: 7,
      }).from(
        subRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Scroll Effect (Cinematic Exit)
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
            y: 300,
            scale: 0.9,
            opacity: 0,
            filter: "blur(12px)",
            ease: "power1.in",
          },
          0
        )
        .to(
          subRef.current,
          {
            y: 200,
            opacity: 0,
            filter: "blur(8px)",
            ease: "power1.in",
          },
          0.1
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-obsidian px-6 md:px-12 transition-colors duration-500"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-200/40 via-zinc-50 to-zinc-50 dark:from-zinc-900/40 dark:via-obsidian dark:to-obsidian z-0" />

      <div className="z-10 text-center will-change-transform max-w-6xl mx-auto">
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

        <div ref={subRef} className="max-w-xl mx-auto space-y-4">
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
  );
};

export default Hero;
