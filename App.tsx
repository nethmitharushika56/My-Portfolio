import React, { useState, Suspense } from 'react';
import PortfolioScene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import ChatWidget from './components/ChatWidget';
import { SectionType } from './types';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50">
    <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
    <p className="text-sm font-space tracking-widest opacity-70">INITIALIZING REALITY...</p>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.HOME);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* 3D Background Layer */}
      <Suspense fallback={<LoadingScreen />}>
        <PortfolioScene activeSection={activeSection} onSectionChange={setActiveSection} />
      </Suspense>

      {/* HTML UI Layer */}
      <UIOverlay activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Gemini Chat Widget */}
      <ChatWidget />
      
    </div>
  );
};

export default App;