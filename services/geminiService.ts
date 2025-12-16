import { GoogleGenAI, Chat } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS, VOLUNTEERING, CERTIFICATIONS } from "../constants";

let chatSession: Chat | null = null;

const getSystemInstruction = () => {
  const skillsStr = SKILLS.map(s => `${s.name} (${s.category})`).join(", ");
  const projectsStr = PROJECTS.map(p => `${p.title}: ${p.description}`).join("; ");
  const volStr = VOLUNTEERING.map(v => `${v.role} at ${v.organization}`).join("; ");
  const certStr = CERTIFICATIONS.map(c => `${c.name} from ${c.issuer}`).join("; ");

  return `
    You are an AI assistant for ${PERSONAL_INFO.name}'s portfolio website.
    Your persona is professional, slightly witty, and very knowledgeable about tech.
    
    Here is the context about ${PERSONAL_INFO.name}:
    - Title: ${PERSONAL_INFO.title}
    - Tagline: ${PERSONAL_INFO.tagline}
    - Bio: ${PERSONAL_INFO.bio}
    - Skills: ${skillsStr}
    - Projects: ${projectsStr}
    - Volunteering: ${volStr}
    - Certifications: ${certStr}
    - Contact: ${PERSONAL_INFO.email}

    Your goal is to answer visitor questions about ${PERSONAL_INFO.name}. 
    Keep answers concise (under 50 words unless asked for detail).
    If asked about something not in the context, politely say you only know about ${PERSONAL_INFO.name}'s professional life, or offer a creative guess based on their tech stack.
    Do not hallucinate fake contact info.
  `;
};

export const initChat = () => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }

  if (!chatSession) {
    return "I'm having trouble connecting to my brain (Gemini API). Please try again later.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};