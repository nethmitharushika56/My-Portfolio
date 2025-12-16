export enum SectionType {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  SKILLS = 'SKILLS',
  VOLUNTEERING = 'VOLUNTEERING',
  CERTIFICATES = 'CERTIFICATES',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  link: string;
}

export interface Skill {
  name: string;
  category: string;
  image?: string; // URL for logo
}

export interface Volunteer {
  id: number;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}