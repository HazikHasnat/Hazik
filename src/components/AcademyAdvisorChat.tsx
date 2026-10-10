import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X, Minimize2, MessageSquare, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AcademyAdvisorChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  inlineMode?: boolean;
}

export const AcademyAdvisorChat: React.FC<AcademyAdvisorChatProps> = ({
  isOpen = true,
  onClose,
  inlineMode = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: "Welcome to Hazik’s Footstep with Ball. I am your Technical Director and Player Development Advisor. How can I assist you today? I can advise on age-group training, recommended drills for first touch and speed, or help you choose the right academy program.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    "Which program is best for an 8-year-old starting out?",
    "How does Hazik's academy train first-touch composure?",
    "What speed and agility drills improve acceleration?",
    "Explain the 5-stage player development pathway.",
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to backend Express server
      const payloadMessages = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          model: selectedModel,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorBotMessage: ChatMessage = {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          text: data.error || "I am currently unable to reach the technical coaching network. Please ensure your Gemini API key is configured or contact academy admissions directly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorBotMessage]);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorBotMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: "Connection error with the academy advisor server. Please check your internet connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: "Conversation reset. How can I help you regarding Hazik’s Footstep with Ball training and programs?",
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen && !inlineMode) return null;

  const content = (
    <div className={`flex flex-col h-full bg-[#050706] border border-[#0B2419] rounded-xl overflow-hidden shadow-2xl ${inlineMode ? 'max-w-4xl mx-auto min-h-[640px]' : ''}`}>
      {/* Chat Header */}
      <div className="p-4 bg-[#080B0A] border-b border-[#0B2419] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#0B2419] border border-[#19D66B]/40 flex items-center justify-center text-[#19D66B]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
              <span>Hazik's Academy Advisor</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#19D66B]/20 text-[#19D66B] font-normal">
                AI Coach
              </span>
            </div>
            <div className="text-[11px] text-[#A7B0AA]">
              Technical Director & Player Development Guide
            </div>
          </div>
        </div>

        {/* Model Selector & Actions */}
        <div className="flex items-center gap-2">
          {/* Model selection dropdown */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="text-[11px] bg-[#0B2419] border border-[#19D66B]/30 text-white rounded px-2 py-1 focus:outline-none"
            title="Select Gemini Model Tier"
          >
            <option value="gemini-3.5-flash">gemini-3.5-flash (General Guidance)</option>
            <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Tasks)</option>
            <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast Tasks)</option>
          </select>

          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {!inlineMode && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close Chat Window"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Message Thread (Feature Requirement) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-[360px] max-h-[500px]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded bg-[#0B2419] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#19D66B] text-[#080B0A] font-medium'
                    : 'bg-[#080B0A] border border-[#0B2419] text-stone-200 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 ${
                    isUser ? 'text-[#080B0A]/70 text-right' : 'text-stone-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded bg-[#19D66B]/20 border border-[#19D66B]/50 flex items-center justify-center text-[#19D66B] shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center text-xs text-stone-400">
            <div className="w-7 h-7 rounded bg-[#0B2419] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded bg-[#080B0A] border border-[#0B2419] text-stone-400 italic">
              Analyzing tactical drill syllabus with {selectedModel}...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="px-4 py-2 bg-[#080B0A]/80 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded bg-[#0B2419]/40 hover:bg-[#0B2419] border border-[#19D66B]/20 hover:border-[#19D66B]/60 text-[11px] text-stone-300 hover:text-white whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-[#080B0A] border-t border-[#0B2419] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask coach about programs, drills, schedules, or football advice..."
          className="flex-1 px-4 py-2.5 rounded bg-[#050706] border border-[#0B2419] text-white text-xs sm:text-sm focus:outline-none focus:border-[#19D66B] transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded bg-[#19D66B] text-[#080B0A] hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-display font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );

  if (inlineMode) {
    return (
      <section className="py-24 bg-[#080B0A] relative" id="advisor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              INTERACTIVE AI ADVISOR
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              HAZIK'S ACADEMY MENTOR CHAT
            </h2>
            <p className="text-xs text-[#A7B0AA]">
              Have a conversation with our AI coaching advisor regarding player development, age-appropriate drills, and program pathways.
            </p>
          </div>
          {content}
        </div>
      </section>
    );
  }

  // Floating Modal / Drawer when opened via button
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg sm:max-w-xl h-[620px] animate-in slide-in-from-bottom-8 duration-300">
      {content}
    </div>
  );
};
