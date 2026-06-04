import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExperienceItem } from '../types';
import { EducationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "Frontend AI Engineer Intern",
    company: "RightHome AI",
    period: "Dec 2024 - Jan 2025",
    description: "Developed AI Chatbot using MERN + OpenAI, increasing engagement by 40%. Optimized React components and lazy loading reducing load time by 30%. Built secure REST APIs with JWT ensuring 99.9% uptime."
  },
  {
    id: 2,
    role: "AI Engineer Intern",
    company: "Wayfonix",
    period: "July 2024 - Aug 2024",
    description: "Developed ML models (vision, sentiments, price prediction) achieving 85% + accuracy. Integrated AI models into production platform, improving engagement by 25%."
  }
];

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Jamia Hamdard",
    degree: "Bachelor of Technology - Computer Science and Engineering",
    address: "New Delhi, India",
    year: "July 2021 - July 2025",
    cgpa: 7.4
  },
  {
    id: 2,
    institution: "Taxsila Public School",
    degree: "Higher Secondary (Class 12)",
    address: "Meerut Cant, Uttar Pradesh",
    year: "April 2020 - April 2021",
    cgpa: 8.0
  },
  {
    id: 3,
    institution: "Taxsila Public School",
    degree: "High School (Class 10)",
    address: "Meerut Cant, Uttar Pradesh",
    year: "April 2018 - April 2019",
    cgpa: 7.5
  }
];

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full p-5 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700/80 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10 touch-pan-y"
    >
      <div style={{ transform: "translateZ(30px)" }} className="pointer-events-none flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLParagraphElement>(null);
  const bioText2Ref = useRef<HTMLParagraphElement>(null);

  const bioText1 = "I am a Full-Stack Engineer with experience building scalable, production-grade web applications and AI-powered systems. I work across the stack using React, Node.js, MongoDB, and real-time technologies to design reliable and performant solutions. My background includes developing SaaS platforms, real-time workflows, and AI integrations with measurable impact on performance and user engagement. I focus on clean architecture, secure APIs, and maintainable code that scales with both users and complexity.";
  const bioText2 = "Through internships and projects, I have optimized systems, improved application responsiveness, and delivered features used in real-world environments. I value strong fundamentals, thoughtful problem-solving, and engineering decisions backed by data. I am motivated to work on high-impact products and grow in fast-paced, engineering-driven teams.";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Bio Section Sequential Animation
      const bioTl = gsap.timeline({
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        }
      });

      bioTl.from('.bio-heading', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        skewY: 3
      })
        .from('.heading-word', {
          y: 40,
          rotationX: -90,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(2)"
        }, "-=0.8")
        .from('.bio-text', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.6")
        .from('.skill-block', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.5)"
        }, "-=0.4");

      // Word scrub animation for the first paragraph
      if (bioTextRef.current) {
        const words = bioTextRef.current.querySelectorAll('.word');
        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: bioTextRef.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          }
        });
      }

      // Word scrub animation for the second paragraph (Reverse direction + Slide)
      if (bioText2Ref.current) {
        const words2 = bioText2Ref.current.querySelectorAll('.word2');
        gsap.to(words2, {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.1,
            from: "end" // Animates in exactly the opposite direction!
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioText2Ref.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          }
        });
      }

      // Timeline Section Headers
      const timelineHeaders = gsap.utils.toArray('.timeline-header');
      timelineHeaders.forEach((header: any) => {
        gsap.from(header.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
          }
        });
      });

      // Fade up effect for timeline items
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Line drawing effect
      const timelineContainers = gsap.utils.toArray('.timeline-container');
      timelineContainers.forEach((container: any) => {
        const line = container.querySelector('.timeline-line');
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-white dark:bg-charcoal relative overflow-hidden transition-colors duration-500">

      {/* BIO SECTION */}
      <div ref={bioRef} className="py-24 md:py-32 px-6 md:px-12 border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="col-span-1 lg:col-span-5">
            <h2 className="bio-heading text-indigo-500 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs mb-6">About Me</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6 perspective-1000">
              {"Bridging the gap between".split(" ").map((word, index) => (
                <span key={index} className="inline-block overflow-hidden pb-1 -mb-1">
                  <span className="heading-word inline-block origin-bottom">{word}&nbsp;</span>
                </span>
              ))}
              <br />
              {"design & engineering.".split(" ").map((word, index) => (
                <span key={`highlight-${index}`} className="inline-block overflow-hidden pb-1 -mb-1">
                  <span className="heading-word text-zinc-500 inline-block origin-bottom">{word}&nbsp;</span>
                </span>
              ))}
            </h3>
          </div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <p ref={bioTextRef} className="bio-text text-lg md:text-xl text-zinc-900 dark:text-white leading-relaxed font-light">
              {bioText1.split(" ").map((word, index) => (
                <span key={index} className="word opacity-20">{word}{" "}</span>
              ))}
            </p>
            <p ref={bioText2Ref} className="bio-text text-lg md:text-xl text-zinc-900 dark:text-white leading-relaxed font-light">
              {bioText2.split(" ").map((word, index) => (
                <span key={index} className="word2 opacity-20 inline-block translate-y-2">{word}&nbsp;</span>
              ))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800/50 mt-8">
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Frontend</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>React / Next.js</li>
                    <li>Angular / HTML / CSS</li>
                    <li>Tailwind CSS</li>
                    <li>JavaScript</li>
                  </ul>
                </TiltCard>
              </div>
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Backend</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>REST APIs</li>
                    <li>WebSockets (Real-time)</li>
                    <li>JWT Authentication</li>
                    <li>MVC Architecture</li>
                  </ul>
                </TiltCard>
              </div>
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Database</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>MongoDB(Mongoose)</li>
                    <li>MySQL</li>
                    <li>Firebase RealTime database</li>
                  </ul>
                </TiltCard>
              </div>
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Programming</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>C / C++</li>
                  </ul>
                </TiltCard>
              </div>
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">AI/ML</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>ML model integrations(sentiment, vision, prediction)</li>
                    <li>Regression Models(Linear, Ridge, Lesso)</li>
                    <li>LLM integrations(RAG)</li>
                  </ul>
                </TiltCard>
              </div>
              <div className="skill-block" style={{ perspective: 1000 }}>
                <TiltCard>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Tools</h4>
                  <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                    <li>Git / GitHub</li>
                    <li>Postman / Vercel</li>
                    <li>Netlify / Firebase</li>
                  </ul>
                </TiltCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="timeline-container py-24 md:py-32 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Header */}
          <div className="timeline-header mb-16 md:mb-24 text-center">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">The Journey</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">Experience & Growth</h3>
          </div>

          <div className="relative">
            {/* Vertical Line (Desktop) */}
            <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-32">
              {experienceData.map((item, index) => (
                <div key={item.id} className={`timeline-item flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                  {/* Date Side */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end md:px-12 text-zinc-500 font-mono text-xs md:text-sm tracking-wider">
                    <div className={index % 2 === 0 ? "md:text-right" : "md:text-left"}>
                      {item.period}
                    </div>
                  </div>

                  {/* Dot (Desktop) */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-zinc-900 dark:bg-white rounded-full -translate-x-1.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] hidden md:block" />

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 md:px-12 relative pl-6 md:pl-12 border-l border-zinc-200 dark:border-zinc-800 md:border-none">
                    {/* Mobile Dot/Line Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-500 to-transparent md:hidden" />

                    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300">
                      <h4 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-1">{item.role}</h4>
                      <h5 className="text-indigo-500 dark:text-indigo-400 text-xs md:text-sm font-medium mb-4">{item.company}</h5>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="timeline-container py-24 md:py-32 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Header */}
          <div className="timeline-header mb-16 md:mb-24 text-center">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">-----</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">Education</h3>
          </div>

          <div className="relative">
            {/* Vertical Line (Desktop) */}
            <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-32">
              {educationData.map((item, index) => (
                <div key={item.id} className={`timeline-item flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                  {/* Date Side */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end md:px-12 text-zinc-500 font-mono text-xs md:text-sm tracking-wider">
                    <div className={index % 2 === 0 ? "md:text-right" : "md:text-left"}>
                      {item.year}
                    </div>
                  </div>

                  {/* Dot (Desktop) */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-zinc-900 dark:bg-white rounded-full -translate-x-1.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] hidden md:block" />

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 md:px-12 relative pl-6 md:pl-12 border-l border-zinc-200 dark:border-zinc-800 md:border-none">
                    {/* Mobile Dot/Line Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-500 to-transparent md:hidden" />

                    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300">
                      <h4 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-1">{item.institution}</h4>
                      <h5 className="text-indigo-500 dark:text-indigo-400 text-xs md:text-sm font-medium mb-4">{item.address}</h5>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {item.degree}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                        CGPA : {item.cgpa} / 10.0
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;