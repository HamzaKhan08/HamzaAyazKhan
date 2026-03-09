import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const projectsData: Project[] = [
  {
    id: 1,
    title: "HeartThreads - AI Powered Story Gen",
    category: "AI Project",
    description: "Developed a mobile-first storytelling platform with book-style layouts, categorized collections, and advanced search. Implemented authentication, user dashboard, and responsive UI for enhanced experience. Designed AI-assisted writing workflow using OpenAI.",
    tech: ["React", "MongoDB", "OpenAI", "Express.js", "Node.js"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1768475154/sample_pdobft.png",
    githubUrl: "https://github.com/HamzaKhan08/HeartThreads---AI-Powered-Storytelling-Publishing-Platform",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Real-time File Tracker",
    category: "Full Stack software",
    description: "Engineered multi-level approval workflow system reducing document processing time by 60%. Built real-time websocket communication and JWT secured authentication.",
    tech: ["Express.js", "Node.js", "React", "MongoDB", "JWT", "WebSocket"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1768475153/sample2_uiyeab.jpg",
    githubUrl: "https://github.com/HamzaKhan08/DTS",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Advance AI Assistant",
    category: "AI Assistant",
    description: "Developed Advance AI Assistant called Jarvis.ONE, that solve your day to day tasks by just giving command verbally.",
    tech: ["Socket.io", "Express", "Gemini API", "React", "Ollama Model"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1768475154/sample4_ybf5zd.png",
    githubUrl: "https://github.com",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "DePINX - Decentralized Network",
    category: "Web 3 Software",
    description: "Decentralized Physical Infrastructure Network for WiFi Sharing India-first Web3 SaaS platform enabling users to share, earn, and access internet infrastructure globally.",
    tech: ["Next.js", "Node.js", "Framer Motion", "Express.js", "MongoDB", "Websocket"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1768475154/sample3_rjjma7.png",
    githubUrl: "https://github.com/HamzaKhan08/DePINX",
    liveUrl: "#"
  },
  {
    id: 5,
    title: "AIBrain - Question Prediction AI",
    category: "AI Project",
    description: "AI-powered platform that predicts exam and interview questions using advanced NLP and machine learning models.",
    tech: ["Next.js", "Node.js", "Framer Motion", "Express.js", "MongoDB", "Websocket"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1771761709/Screenshot_2026-02-22_at_5.31.24_PM_frrwxo.png",
    githubUrl: "https://github.com/HamzaKhan08/AIBrain",
    liveUrl: "#"
  },
  {
    id: 6,
    title: "Bharat Civic Shield",
    category: "AI Fake News Detection",
    description: "Advance AI detection system that identifies and mitigates the spread of fake news in India using NLP and machine learning techniques.",
    tech: ["Next.js", "Node.js", "Framer Motion", "Express.js", "MongoDB", "Websocket"],
    imageUrl: "https://res.cloudinary.com/dzhsxv2wq/image/upload/v1773056071/Screenshot_2026-03-09_at_5.03.18_PM_o89nyc.png",
    githubUrl: "https://github.com/HamzaKhan08/Bharat-Civic-Shield",
    liveUrl: '#'
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      // Desktop: Horizontal Scroll
      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray(".project-panel");
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + (sections.length * 1000) 
          }
        });
      });
      
      // Mobile: Fade in on scroll
      mm.add("(max-width: 1023px)", () => {
         const sections = gsap.utils.toArray(".project-panel");
         sections.forEach((section: any) => {
            gsap.from(section.querySelector('.project-content'), {
               y: 50,
               opacity: 0,
               duration: 0.8,
               scrollTrigger: {
                  trigger: section,
                  start: "top 70%",
               }
            });
         });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-zinc-50 dark:bg-obsidian relative transition-colors duration-500">
      <div 
        ref={triggerRef} 
        className="flex flex-col lg:flex-row lg:h-screen lg:flex-nowrap lg:overflow-hidden w-full"
      >
        {projectsData.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel w-full min-h-screen lg:w-screen lg:h-screen flex-shrink-0 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-900/50 bg-zinc-50 dark:bg-obsidian lg:overflow-hidden py-20 lg:py-0 transition-colors duration-500"
          >
            
            {/* Background Number Watermark */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
               <span className="text-[30vw] font-black text-zinc-900/[0.03] dark:text-white/[0.02] tracking-tighter leading-none transform translate-y-10">
                0{index + 1}
              </span>
            </div>

            <div className="w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 z-10 items-center h-full project-content">
              
              {/* Content Side (5 Cols) */}
              <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-indigo-500"></span>
                    <h4 className="text-indigo-500 tracking-[0.2em] uppercase text-xs font-bold">{project.category}</h4>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-900 dark:text-white tracking-tighter leading-[0.9]">{project.title}</h2>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 text-[10px] md:text-xs text-zinc-600 dark:text-zinc-300 font-medium uppercase tracking-wider hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors duration-300 cursor-default">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-900 border border-zinc-900 dark:border-zinc-800 text-white hover:bg-zinc-800 dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-sm cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="uppercase text-xs font-bold tracking-widest">GitHub</span>
                  </a>
                  {/*<a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none group flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white text-black border border-zinc-200 dark:border-white hover:bg-zinc-100 dark:hover:bg-transparent dark:hover:text-white transition-all duration-300 rounded-sm cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="uppercase text-xs font-bold tracking-widest">Live Demo</span>
                  </a>*/}
                </div>
              </div>

              {/* Image Side (7 Cols) - Enhanced Hover Effect */}
              {/* Wrapped in an anchor to make the entire card clickable, improving UX especially on mobile */}
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 lg:col-span-7 w-full h-[50vh] lg:h-[65vh] order-1 lg:order-2 perspective-1000 my-8 lg:my-0 block group"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 bg-zinc-100 dark:bg-zinc-900 active:scale-[0.98]">
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Hover Overlay Detail */}
                  {/* <div className="absolute inset-0 border-[1px] border-white/20 m-4 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20 flex items-end justify-between p-6 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                      <div className="text-white text-xs tracking-widest font-bold drop-shadow-md">VIEW CASE STUDY</div>
                      <ArrowRight className="text-white drop-shadow-md" />
                  </div> */}
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;