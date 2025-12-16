import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, PROJECTS, SKILLS, VOLUNTEERING, CERTIFICATIONS, SECTION_CONFIG } from '../constants';
import { SectionType, Skill } from '../types';
import { Github, Linkedin, Mail, ExternalLink, Code2, User, Briefcase, Zap, MessageSquare, Home, Award, Heart, CheckCircle } from 'lucide-react';

interface UIOverlayProps {
  activeSection: SectionType;
  onNavigate: (section: SectionType) => void;
}

// Typewriter Component
const Typewriter = ({ text, speed = 50, delay = 500 }: { text: string; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse ml-1 text-blue-400">|</span>
    </span>
  );
};

const UIOverlay: React.FC<UIOverlayProps> = ({ activeSection, onNavigate }) => {
  
  const variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -50, filter: 'blur(10px)' }
  };

  const CardClass = "bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white max-w-4xl w-full mx-auto shadow-2xl overflow-y-auto max-h-[80vh] scrollbar-hide";

  const getIcon = (section: SectionType) => {
    switch (section) {
      case SectionType.HOME: return <Home size={18} />;
      case SectionType.ABOUT: return <User size={18} />;
      case SectionType.PROJECTS: return <Briefcase size={18} />;
      case SectionType.SKILLS: return <Zap size={18} />;
      case SectionType.VOLUNTEERING: return <Heart size={18} />;
      case SectionType.CERTIFICATES: return <Award size={18} />;
      case SectionType.CONTACT: return <MessageSquare size={18} />;
    }
  };

  // Group skills by category
  const skillsByCategory = SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-4">
      
      {/* Header */}
      <div className="w-full p-4 flex justify-end items-start pointer-events-auto z-20">
        {activeSection !== SectionType.HOME && (
          <button 
            onClick={() => onNavigate(SectionType.HOME)}
            className="text-white/60 hover:text-white text-sm uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-all"
          >
            Close View
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          
          {/* HOME STATE - Minimal text now that we have the 3D Avatar */}
          {activeSection === SectionType.HOME && (
            <motion.div
              key="home"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-center pointer-events-auto mt-64 md:mt-0"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2 font-space drop-shadow-2xl">
                {PERSONAL_INFO.name}
              </h2>
              <div className="text-lg text-white/80 font-light max-w-lg mx-auto leading-relaxed drop-shadow-md h-8">
                <Typewriter text={PERSONAL_INFO.title} />
              </div>
            </motion.div>
          )}

          {/* ABOUT SECTION */}
          {activeSection === SectionType.ABOUT && (
            <motion.div key="about" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto max-w-5xl`}>
              <h2 className="text-4xl font-bold mb-6 text-blue-400 font-space">{SECTION_CONFIG.ABOUT.title}</h2>
              <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
                
                {/* Profile Image Column */}
                <div className="relative group">
                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                   <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900">
                      <img 
                        src={PERSONAL_INFO.profileImage} 
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                   </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-lg leading-relaxed text-gray-300 mb-6 whitespace-pre-line">
                      {PERSONAL_INFO.bio}
                    </p>
                    <div className="flex gap-4 mb-6">
                      <a href={`https://${PERSONAL_INFO.socials.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors border border-white/5">
                        <Github size={18} /> <span className="text-sm">GitHub</span>
                      </a>
                      <a href={`https://${PERSONAL_INFO.socials.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors border border-white/5">
                        <Linkedin size={18} /> <span className="text-sm">LinkedIn</span>
                      </a>
                      <a href={`https://${PERSONAL_INFO.socials.twitter}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors border border-white/5">
                        <ExternalLink size={18} /> <span className="text-sm">Social</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2 text-blue-300">Why 3D Web?</h3>
                    <p className="text-sm text-gray-400">
                      I believe the future of the web is immersive. Combining standard DOM elements with WebGL creates experiences that are not just functional, but memorable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECTS SECTION */}
          {activeSection === SectionType.PROJECTS && (
            <motion.div key="projects" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto`}>
              <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-space">{SECTION_CONFIG.PROJECTS.title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors border border-white/5 flex flex-col">
                    <div className="h-40 bg-gray-800 relative overflow-hidden shrink-0">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-4 flex-1">{project.description}</p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map(tech => (
                            <span key={tech} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a href={project.link} className="flex items-center gap-2 text-sm text-white/70 hover:text-emerald-400 transition-colors">
                          View Project <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SKILLS SECTION */}
          {activeSection === SectionType.SKILLS && (
            <motion.div key="skills" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto max-w-5xl`}>
              <h2 className="text-4xl font-bold mb-8 text-violet-400 font-space">{SECTION_CONFIG.SKILLS.title}</h2>
              <div className="space-y-8">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-violet-200 mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Zap size={18} className="text-violet-500" />
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {skills.map((skill) => (
                        <motion.div 
                          key={skill.name}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-3 text-center min-h-[100px] transition-colors"
                        >
                          {skill.image ? (
                            <img src={skill.image} alt={skill.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                               <CheckCircle size={16} className="text-violet-400" />
                            </div>
                          )}
                          <span className="text-xs font-medium text-gray-300">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VOLUNTEERING SECTION */}
          {activeSection === SectionType.VOLUNTEERING && (
            <motion.div key="volunteering" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto`}>
              <h2 className="text-4xl font-bold mb-8 text-pink-500 font-space">{SECTION_CONFIG.VOLUNTEERING.title}</h2>
              <div className="grid gap-6">
                {VOLUNTEERING.map((vol) => (
                  <div key={vol.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-all flex flex-col md:flex-row md:items-center gap-4">
                    <div className="p-3 bg-pink-500/10 rounded-full text-pink-400 shrink-0 self-start md:self-center">
                       <Heart size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">{vol.role}</h3>
                        <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">{vol.period}</span>
                      </div>
                      <div className="text-pink-300 font-medium mb-2">{vol.organization}</div>
                      <p className="text-sm text-gray-400">{vol.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CERTIFICATES SECTION */}
          {activeSection === SectionType.CERTIFICATES && (
            <motion.div key="certificates" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto`}>
              <h2 className="text-4xl font-bold mb-8 text-yellow-400 font-space">{SECTION_CONFIG.CERTIFICATES.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {CERTIFICATIONS.map((cert) => (
                  <a href={cert.link} key={cert.id} className="group bg-gradient-to-br from-white/5 to-white/0 p-6 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
                        <Award size={24} />
                      </div>
                      <span className="text-xs text-white/40 font-mono">{cert.date}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">{cert.name}</h3>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                    <div className="mt-4 flex items-center text-xs text-white/50 group-hover:text-white transition-colors">
                      View Credential <ExternalLink size={12} className="ml-1" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT SECTION */}
          {activeSection === SectionType.CONTACT && (
            <motion.div key="contact" variants={variants} initial="hidden" animate="visible" exit="exit" className={`${CardClass} pointer-events-auto max-w-xl text-center`}>
              <h2 className="text-4xl font-bold mb-6 text-rose-400 font-space">{SECTION_CONFIG.CONTACT.title}</h2>
              <p className="text-gray-300 mb-8">
                Interested in collaborating on a 3D web experience or have a project in mind? Let's talk.
              </p>
              
              <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-rose-500/30">
                <Mail /> Send Me an Email
              </a>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  Or ask my AI assistant in the bottom right corner for immediate answers.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className="w-full flex justify-center pointer-events-auto pb-6 z-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-2 flex gap-2 flex-wrap justify-center max-w-[95vw] overflow-x-auto scrollbar-hide">
          {Object.values(SectionType).map((section) => {
             const config = SECTION_CONFIG[section];
             const isActive = activeSection === section;
             return (
               <button
                 key={section}
                 onClick={() => onNavigate(section)}
                 className={`
                   relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shrink-0
                   ${isActive ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}
                 `}
               >
                 {getIcon(section)}
                 <span className={`${isActive ? 'block' : 'hidden md:block'} text-sm whitespace-nowrap`}>{config.title}</span>
               </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;