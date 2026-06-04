import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-panel') as HTMLElement[];

      cards.forEach((card, index) => {
        const innerContent = card.querySelector('.project-content');
        const watermark = card.querySelector('.project-watermark');
        const imgContainer = card.querySelector('.project-image-container');
        const infoContainer = card.querySelector('.project-info');

        // Apple-style Stack Effect: Scale down and blur as the next card scrolls over it
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          gsap.to([innerContent, watermark], {
            scale: 0.85,
            opacity: 0,
            filter: "blur(15px)",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }

        // Parallax Reveal Effect: Image and text slide up gracefully as they enter the screen
        if (index > 0) {
          if (imgContainer) {
            gsap.from(imgContainer, {
              y: "25%",
              scale: 0.9,
              opacity: 0,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "top top",
                scrub: 1,
              }
            });
          }

          if (infoContainer) {
            gsap.from(infoContainer, {
              y: "20%",
              opacity: 0,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "top top",
                scrub: 1,
              }
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-zinc-50 dark:bg-obsidian relative transition-colors duration-500">
      <div className="w-full relative lg:pb-[10vh]">
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className="project-panel lg:sticky lg:top-0 w-full min-h-screen lg:h-[100dvh] flex items-center justify-center relative bg-zinc-50 dark:bg-obsidian overflow-hidden transition-colors duration-500 shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.4)] border-t border-zinc-200/50 dark:border-zinc-800/50"
            style={{ zIndex: index }}
          >
            {/* Background Number Watermark */}
            <div className="project-watermark absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
              <span className="text-[35vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-200/80 to-transparent dark:from-white/5 dark:to-transparent tracking-tighter leading-none transform translate-y-10">
                0{index + 1}
              </span>
            </div>

            <div className="w-full lg:h-full max-w-[1400px] mx-auto px-4 md:px-12 z-10 project-content lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-20 lg:py-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-full items-center lg:py-12">

                {/* Content Side (5 Cols) - Glassmorphism Card */}
                <div className="project-info col-span-1 lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 p-6 sm:p-8 md:p-10 lg:p-12 rounded-[2rem] backdrop-blur-xl bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden mt-4 lg:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

                  <div className="space-y-2 lg:space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <span className="h-px w-8 bg-indigo-500"></span>
                      <h4 className="text-indigo-500 tracking-[0.2em] uppercase text-xs font-bold">{project.category}</h4>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter leading-[1]">{project.title}</h2>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg border-l-2 border-indigo-500/30 pl-6 relative z-10">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {project.tech.map(t => (
                      <span key={t} className="px-4 py-2 rounded-full border border-zinc-300/50 dark:border-zinc-700/50 bg-white/50 dark:bg-black/50 backdrop-blur-md text-[10px] md:text-xs text-zinc-700 dark:text-zinc-300 font-medium uppercase tracking-wider hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all duration-300 cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto relative z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 transition-all duration-300 rounded-full cursor-pointer shadow-lg hover:shadow-indigo-500/25"
                    >
                      <Github size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="uppercase text-xs font-bold tracking-widest">GitHub</span>
                    </a>
                    {project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-zinc-900 dark:border-white text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 rounded-full cursor-pointer shadow-lg"
                      >
                        <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="uppercase text-xs font-bold tracking-widest">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={project.liveUrl !== '#' ? project.liveUrl : undefined}
                  target={project.liveUrl !== '#' ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`project-image-container col-span-1 lg:col-span-7 w-full h-[30vh] sm:h-[40vh] lg:h-[65vh] order-1 lg:order-2 perspective-1000 my-4 lg:my-0 block group ${project.liveUrl === '#' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:-translate-y-2 group-hover:scale-[1.02] border border-white/40 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900">
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10" />
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0"
                    />
                  </div>
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;