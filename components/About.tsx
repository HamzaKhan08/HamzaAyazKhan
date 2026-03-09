import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Bio Section Animation
      gsap.from(bioRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        }
      });

      // Fade up effect for timeline items
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        });
      });
      
      // Line drawing effect
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: '.timeline-container',
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1
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
            <h2 className="text-indigo-500 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs mb-6">About Me</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              Bridging the gap between <br />
              <span className="text-zinc-500">design & engineering.</span>
            </h3>
          </div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            I am a Full-Stack Engineer with experience building scalable, production-grade web applications and AI-powered systems.
            I work across the stack using React, Node.js, MongoDB, and real-time technologies to design reliable and performant solutions.
            My background includes developing SaaS platforms, real-time workflows, and AI integrations with measurable impact on performance and user engagement.
            I focus on clean architecture, secure APIs, and maintainable code that scales with both users and complexity.
            </p>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            Through internships and projects, I have optimized systems, improved application responsiveness, and delivered features used in real-world environments.
            I value strong fundamentals, thoughtful problem-solving, and engineering decisions backed by data.
            I am motivated to work on high-impact products and grow in fast-paced, engineering-driven teams.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800/50 mt-8">
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Frontend</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>React / Next.js</li>
                  <li>Angular / HTML / CSS</li>
                  <li>Tailwind CSS</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Backend</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>REST APIs</li>
                  <li>WebSockets (Real-time)</li>
                  <li>JWT Authentication</li>
                  <li>MVC Architecture</li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Database</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>MongoDB(Mongoose)</li>
                  <li>MySQL</li>
                  <li>Firebase RealTime database</li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Programming</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>C / C++</li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">AI/ML</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>ML model integrations(sentiment, vision, prediction)</li>
                  <li>Regression Models(Linear, Ridge, Lesso)</li>
                  <li>LLM integrations(RAG)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-bold mb-3 tracking-wide">Tools</h4>
                <ul className="text-zinc-500 text-sm space-y-2 font-mono">
                  <li>Git / GitHub</li>
                  <li>Postman / Vercel</li>
                  <li>Netlify / Firebase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="timeline-container py-24 md:py-32 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-16 md:mb-24 text-center">
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
          <div className="mb-16 md:mb-24 text-center">
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