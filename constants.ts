import { Project, Skill, SectionType, Volunteer, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Nethmi Tharushika",
  title: "Software Developer | AI/ML Enthusiast",
  tagline: "Building digital realities with code.",
  // Replace the URL below with the path to your image (e.g., "/my-photo.jpg" if in public folder)
  profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  bio: `I am an energetic and motivated Computer Engineering undergraduate at the University of Sri Jayewardenepura, driven by a passion for technology, innovation, and problem-solving. I bring a strong foundation in critical thinking, analytical skills, effective communication, and confident presentation abilities.

With growing experience in the computing domain, I enjoy exploring areas such as software development, cloud computing⁩, and emerging technologies. I’m constantly learning, building, and challenging myself to create meaningful solutions.

I’m excited to connect with industry professionals, collaborate on impactful tech projects, and explore opportunities that support my growth in the engineering and technology sector.`,
  email: "gamagetharushy@gmail.com",
  socials: {
    github: "github.com/nethmitharushika56",
    linkedin: "www.linkedin.com/in/nethmitharushika56",
    twitter: "twitter.com"
  }
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Yuwathi",
    description: "A safety app created to empower women with active solutions for mental, physical harassment, and cyberbullying. Yuwathi delivers robust, offline-capable features such as an SOS button (sharing real-time static location and emergency message), legal awareness resources, mental health support, and a smart assistant powered by Gemini 2.0 Flash.",
    techStack: ["Flutter", "Firebase", "Gemini 2.0", "Google APIs", "Figma"],
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

export const SKILLS: Skill[] = [
  // Cloud & Tech
  { name: "Cloud Computing", category: "Cloud & Tech", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Cloud Applications", category: "Cloud & Tech", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Firebase", category: "Cloud & Tech", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Google API", category: "Cloud & Tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" },
  { name: "Gemini", category: "Cloud & Tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/512px-Google_Gemini_logo.svg.png" },
  { name: "Cloud Security", category: "Cloud & Tech" },
  { name: "Hybrid Cloud", category: "Cloud & Tech" },
  { name: "IaaS", category: "Cloud & Tech" },
  
  // Languages & Dev
  { name: "Python", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C#", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "C++", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Flutter", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "HTML5", category: "Development", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "LLMs", category: "Development", image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" }, // Generic AI/LLM icon

  // Design & Tools
  { name: "Figma", category: "Design & Tools", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", category: "Design & Tools", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "AutoCAD", category: "Design & Tools" },
  { name: "MS Office", category: "Design & Tools", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg" },

  // Processes & Soft Skills
  { name: "Agile", category: "Process & Soft Skills" },
  { name: "SDLC", category: "Process & Soft Skills" },
  { name: "Project Mgmt", category: "Process & Soft Skills" },
  { name: "Leadership", category: "Process & Soft Skills" },
  { name: "Communication", category: "Process & Soft Skills" },
  { name: "Problem Solving", category: "Process & Soft Skills" },
  { name: "Teamwork", category: "Process & Soft Skills" },
  { name: "Public Speaking", category: "Process & Soft Skills" },
  { name: "English", category: "Process & Soft Skills" }
];

export const VOLUNTEERING: Volunteer[] = [
  {
    id: 1,
    role: "Faculty Ambassador",
    organization: "IEEE Student Branch - University of Sri Jayewardenepura",
    period: "May 2025 - Present",
    description: "Representing the faculty and coordinating IEEE activities."
  },
  {
    id: 2,
    role: "Project Coordinator",
    organization: "Nexus Club – Faculty of Engineering, University of Sri Jayewardenepura",
    period: "Apr 2025 - Present",
    description: "Coordinating the NexGen Project."
  },
  {
    id: 3,
    role: "Project Chair",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    period: "Mar 2025 - Present",
    description: "Leading the Algo Ace project."
  },
  {
    id: 4,
    role: "Industry Relations Committee Member",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    period: "Jan 2025 - Present",
    description: "Building connections with industry partners."
  },
  {
    id: 5,
    role: "Volunteer Management Committee Member",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    period: "Jan 2025 - Present",
    description: "Managing volunteer resources and allocation."
  },
  {
    id: 6,
    role: "Personal Development Workgroup Lead",
    organization: "Nexus Club – Faculty of Engineering, University of Sri Jayewardenepura",
    period: "Jan 2025 - Present",
    description: "Leading initiatives for member personal development."
  },
  {
    id: 7,
    role: "Volunteer",
    organization: "IESL Student Chapter University of Sri Jayewardenepura",
    period: "Oct 2024",
    description: "Techno Exhibition - Education Cause."
  },
  {
    id: 8,
    role: "Organizing Committee Member",
    organization: "IEEE Student Branch - University of Sri Jayewardenepura",
    period: "2024",
    description: "Programme Committee Member - Expedition 2.0 (Science & Technology)."
  },
  {
    id: 9,
    role: "Organizing Committee Member",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    period: "2024",
    description: "Beauty of Cloud - Industry Relations Committee Member."
  },
  {
    id: 10,
    role: "Organizing Committee Member",
    organization: "Career Guidance Cell, Faculty of Engineering, University of Sri Jayewardenepura",
    period: "2024",
    description: "Careerxplore - HR crew member (Education)."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: "Python Intermediate",
    issuer: "Sololearn",
    date: "Aug 2025",
    link: "https://api2.sololearn.com/v2/certificates/CC-QNJNXB6E/image/png?t=638921574781370040"
  },
  {
    id: 2,
    name: "Java Intermediate",
    issuer: "Sololearn",
    date: "Aug 2025",
    link: "https://api2.sololearn.com/v2/certificates/CC-M9ZAFYZO/image/png?t=638921742682106630"
  },
  {
    id: 3,
    name: "Introduction to JavaScript",
    issuer: "Sololearn",
    date: "2025",
    link: "https://api2.sololearn.com/v2/certificates/CC-R5CLO0BN/image/png?t=638933396346065798"
  },
  {
    id: 4,
    name: "Introduction to LLMs",
    issuer: "Sololearn",
    date: "2025",
    link: "https://api2.sololearn.com/v2/certificates/CC-NPP3KIV1/image/png?t=638936888905480864"
  },
  {
    id: 5,
    name: "C# Intermediate",
    issuer: "Sololearn",
    date: "2025",
    link: "https://api2.sololearn.com/v2/certificates/CC-PCF5K1VS/image/png?t=638979542549329281"
  },
  {
    id: 6,
    name: "Introduction to Software Engineering",
    issuer: "IBM",
    date: "Nov 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/SS4WPM63RLGM"
  },
  {
    id: 7,
    name: "Introduction to Cloud Computing",
    issuer: "IBM",
    date: "Dec 2025",
    link: "https://www.credly.com/badges/d0b593ed-58ec-429a-839b-65926cd0e5cd/public_url"
  }
];

export const SECTION_CONFIG = {
  [SectionType.HOME]: { color: "#ffffff", title: "Home" },
  [SectionType.ABOUT]: { color: "#3b82f6", title: "About Me" }, // Blue
  [SectionType.PROJECTS]: { color: "#10b981", title: "Projects" }, // Emerald
  [SectionType.SKILLS]: { color: "#8b5cf6", title: "Capabilities" }, // Violet
  [SectionType.VOLUNTEERING]: { color: "#db2777", title: "Volunteering" }, // Pink
  [SectionType.CERTIFICATES]: { color: "#eab308", title: "Licenses & Certs" }, // Yellow
  [SectionType.CONTACT]: { color: "#f43f5e", title: "Contact" } // Rose
};