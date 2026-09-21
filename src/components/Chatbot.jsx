import React, { useState, useRef, useEffect } from 'react';
import { PRESET_QUESTIONS, BOT_KEYWORDS_MAP } from '../data/chatbotData';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 Hello! I am BlazerBot, the official AgentBlazer Club assistant. Pick one of the questions below or type your inquiry!",
      action: null,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle clicking a preset question chip
  const handleSelectQuestion = (q) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsg = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: q.answer,
      action: q.action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  // Handle free-form text input
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const queryLower = query.toLowerCase();

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Find match from preset questions or keyword map
    let matchedQ = PRESET_QUESTIONS.find(q => 
      queryLower.includes(q.question.toLowerCase()) || 
      q.question.toLowerCase().includes(queryLower)
    );

    if (!matchedQ) {
      // Check keyword map
      for (const mapItem of BOT_KEYWORDS_MAP) {
        if (mapItem.keywords.some(kw => queryLower.includes(kw))) {
          matchedQ = PRESET_QUESTIONS.find(q => q.id === mapItem.questionId);
          if (matchedQ) break;
        }
      }
    }

    let botResponseText = "";
    let botAction = null;

    if (matchedQ) {
      botResponseText = matchedQ.answer;
      botAction = matchedQ.action;
    } else {
      botResponseText = `I found some helpful resources related to "${query}". For specific inquiries, you can also submit a doubt through our Ask Doubt Desk or select one of the suggested question options above!`;
      botAction = { label: "Go to Ask Doubt Desk", targetId: "ask-doubt-section" };
    }

    const botMsg = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: botResponseText,
      action: botAction,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  const handleActionClick = (targetId) => {
    if (!targetId) return;
    setIsOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: "👋 Chat reset! How can I assist you with AgentBlazer Club today? Choose a question below or ask me anything.",
        action: null,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Side Button / Orb */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-bold shadow-2xl hover:shadow-neon-cyan active:scale-95 transition-all duration-300"
            title="Ask BlazerBot"
          >
            <div className="relative w-7 h-7 rounded-full bg-black/40 flex items-center justify-center p-1 border border-white/20">
              <img 
                src={agentblazerLogo} 
                alt="BlazerBot" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            <span>Ask BlazerBot</span>
          </button>
        )}
      </div>

      {/* Floating Sidebar / Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] glass-panel rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden bg-black/95 backdrop-blur-2xl animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-purple-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black/60 border border-cyan-500/40 p-1 flex items-center justify-center">
                <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                  BlazerBot AI <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                </h3>
                <p className="text-[10px] font-mono text-purple-300">
                  AgentBlazer Knowledge Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preset Question Selector Options (Interactive Chips!) */}
          <div className="p-2.5 bg-black/60 border-b border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none space-x-1.5">
            <div className="text-[10px] font-mono text-slate-400 mb-1.5 px-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Tap a question to get instant answer:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {PRESET_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-mono bg-purple-900/30 hover:bg-purple-800/50 text-purple-200 border border-purple-500/30 hover:border-cyan-400/50 transition-all text-left"
                >
                  {q.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      isBot
                        ? 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-tr-sm font-mono'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                    {/* Quick Action Link Button */}
                    {m.action && (
                      <button
                        onClick={() => handleActionClick(m.action.targetId)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] transition-all"
                      >
                        <span>{m.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/80 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything (e.g. what is agentblazer?)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
