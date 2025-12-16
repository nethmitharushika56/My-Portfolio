import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm the AI assistant here. Ask me anything about the developer's skills or projects.", timestamp: new Date() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <Bot size={20} />
                <span className="font-bold font-space">AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/40">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <Bot size={14} className="text-blue-400" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white text-black rounded-tr-none' 
                        : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-2">
                   <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <Bot size={14} className="text-blue-400" />
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center">
                      <Loader2 size={16} className="text-blue-400 animate-spin" />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about my projects..."
                className="flex-1 bg-black/50 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/10 placeholder-white/30"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? 'bg-white text-black' : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;