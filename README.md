# My Portfolio - 3D Interactive Portfolio

A modern, immersive 3D portfolio built with React, Three.js, and the Google Gemini API. This project features a unique navigation experience using floating 3D geometry, a responsive glassmorphism UI, and an intelligent AI assistant capable of answering questions about the developer.

## Features

- **3D Interactive Scene**: Built with `@react-three/fiber` and `@react-three/drei`, featuring a custom 3D avatar with mouse tracking and idle animations.
- **Immersive Navigation**: Navigate through sections (About, Projects, Skills, etc.) by interacting with floating 3D shapes.
- **AI Assistant**: Integrated **Gemini 2.5 Flash** model via the Google Gen AI SDK. The assistant has context about the developer's skills, projects, and background to answer visitor queries in real-time.
- **Glassmorphism UI**: Sleek, frosted-glass user interface animated with `framer-motion`.
- **Dynamic Content**: Skills are visualized with icons, and certifications/volunteering sections are data-driven.
- **Responsive Design**: Works seamlessly across desktop and mobile devices.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Spring
- **Animations**: Framer Motion
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Icons**: Lucide React, DevIcon

## Getting Started

### Prerequisites

- Node.js installed.
- A Google Cloud Project with the Gemini API enabled and an API Key.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

The application requires a Google Gemini API key to power the chat widget.
Ensure `process.env.API_KEY` is available in your environment.

### Project Structure

- **`App.tsx`**: Main entry point combining the 3D scene, UI overlay, and Chat widget.
- **`components/Scene.tsx`**: The 3D canvas containing the avatar, lights, and interactive navigation shapes.
- **`components/UIOverlay.tsx`**: The HTML/CSS interface layer for displaying content (Skills, Projects, Bio).
- **`components/ChatWidget.tsx`**: The floating chat interface connected to Gemini.
- **`constants.ts`**: Centralized data file for Personal Info, Projects, Skills, Volunteering, and Certifications.
- **`services/geminiService.ts`**: Handles initialization and communication with the Google Gen AI SDK.

## Customization

To personalize this portfolio:

1.  **Update Content**: Modify `constants.ts` with your own bio, projects, skills, and links.
2.  **Avatar**: The avatar is procedurally generated using React Three Fiber meshes in `Scene.tsx`. You can customize colors or shapes within the `CuteGirlAvatar` component.
3.  **Styling**: Adjust Tailwind classes in `UIOverlay.tsx` and `index.html`.
