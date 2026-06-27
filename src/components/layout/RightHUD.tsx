import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IconPlus, IconMic, IconPaperclip, IconSend, IconCopy, IconVolume, IconClose } from '../Icons';

interface Session {
  id: string;
  title: string;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface RightHUDProps {
  handleNewSession: () => void;
  sessions: Session[];
  currentSessionId: string | null;
  handleSwitchSession: (id: string) => void;
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleChatSubmit: (overrideText?: string) => void;
  handleCopyText: (text: string) => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  PROMPT_TEMPLATES: string[];
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
  setFileContent: (s: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RightHUD: React.FC<RightHUDProps> = ({
  handleNewSession, sessions, currentSessionId, handleSwitchSession, messages, messagesEndRef,
  handleChatSubmit, handleCopyText, speakText, isSpeaking, PROMPT_TEMPLATES,
  selectedFile, setSelectedFile, setFileContent, fileInputRef, handleFileChange
}) => {
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const hasSpeechSupport = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN'; recognition.continuous = false; recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => { setChatInput(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[0][0].transcript); };
    recognition.onerror = () => setIsListening(false); recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const submitChat = (overrideText?: string) => {
    const text = overrideText || chatInput;
    if (text.trim()) {
      handleChatSubmit(text);
      setChatInput('');
    }
  };
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-transparent">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/90">AI Assistant</span>
        </div>
        <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Gemini</span>
      </div>

      {/* Session tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-3 border-b border-white/5 shrink-0">
        <button 
          onClick={handleNewSession} 
          className="flex items-center gap-1.5 shrink-0 text-[10px] uppercase tracking-widest py-1.5 px-3 cursor-pointer bg-white/5 border border-white/10 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="New chat session"
        >
          <IconPlus size={10} /> New
        </button>
        {sessions.map((s) => (
          <button 
            key={s.id} 
            onClick={() => handleSwitchSession(s.id)} 
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest truncate max-w-[120px] shrink-0 rounded-full cursor-pointer transition-all duration-300 ${
              currentSessionId === s.id 
                ? 'bg-white/15 text-white border border-white/20' 
                : 'bg-transparent text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 min-h-0">
        <div className="flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
              <div className="text-[9px] text-white/30 mb-2 uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)' }}>
                {msg.role === 'ai' ? 'System' : 'You'}
              </div>
              <div className={`p-4 text-[13px] leading-relaxed max-w-[90%] overflow-x-auto rounded-2xl ${
                msg.role === 'ai' 
                  ? 'bg-white/[0.03] text-white/90 border border-white/5 backdrop-blur-md rounded-tl-sm' 
                  : 'bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-tr-sm'
              }`}>
                <div className="prose-sm text-white/90 font-light">
                  {msg.role === 'ai' ? (
                    <ReactMarkdown 
                      components={{
                        code(props) {
                          const {children, className, node, ...rest} = props;
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <div className="relative mt-3 mb-3 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                              <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-white/5">
                                <span className="text-[10px] uppercase tracking-widest text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>{match[1]}</span>
                                <div className="flex gap-3">
                                  <button onClick={() => handleChatSubmit(`Explain this ${match[1]} code in detail.`)} className="text-[10px] text-white/40 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Explain</button>
                                  <button onClick={() => handleCopyText(String(children))} className="text-[10px] text-white/40 hover:text-white transition-colors cursor-pointer flex items-center gap-1 uppercase tracking-widest">
                                    <IconCopy size={10} /> Copy
                                  </button>
                                </div>
                              </div>
                              <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0', background: 'transparent', fontSize: '11px' }} />
                            </div>
                          ) : ( <code {...rest} className="bg-white/10 px-1.5 py-0.5 text-white/90 text-[11px] rounded" style={{ fontFamily: 'var(--font-mono)' }}>{children}</code> );
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : ( <div className="whitespace-pre-wrap">{msg.text}</div> )}
                </div>
              </div>
              
              {/* Message actions */}
              {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && !msg.text.includes('Đang kết nối') && (
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                  <button 
                    onClick={() => speakText(msg.text)} 
                    className={`btn-icon w-8 h-8 p-0 rounded-full border border-white/5 cursor-pointer bg-white/5 hover:bg-white/10 ${isSpeaking ? 'text-white' : 'text-white/50'}`}
                    aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
                  >
                    <IconVolume size={12} />
                  </button>
                  <button 
                    onClick={() => handleCopyText(msg.text)} 
                    className="btn-icon w-8 h-8 p-0 rounded-full border border-white/5 cursor-pointer bg-white/5 hover:bg-white/10 text-white/50"
                    aria-label="Copy message"
                  >
                    <IconCopy size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-transparent">
        
        {/* Quick prompts */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
          {PROMPT_TEMPLATES.map((t, i) => ( 
            <button 
              key={i} 
              onClick={() => setChatInput(t)} 
              className="text-[10px] tracking-widest uppercase py-1.5 px-4 shrink-0 cursor-pointer whitespace-nowrap bg-white/[0.03] border border-white/5 text-white/50 hover:text-white rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {t.substring(0, 25)}...
            </button> 
          ))}
        </div>
        
        {/* Attached file */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-3 text-[10px] text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="truncate max-w-[200px] flex items-center gap-2">
              <IconPaperclip size={12} className="text-white/50" />
              {selectedFile.name}
            </span>
            <button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer ml-2 p-1">
              <IconClose size={12} />
            </button>
          </div>
        )}
        
        {/* Text input */}
        <div className="flex items-end gap-2 bg-white/5 rounded-2xl border border-white/10 focus-within:border-white/30 focus-within:bg-white/[0.07] transition-all duration-300 p-2">
          {hasSpeechSupport && (
            <button 
              onClick={startListening} 
              className={`w-9 h-9 flex items-center justify-center border-0 rounded-xl shrink-0 cursor-pointer transition-colors ${isListening ? 'text-red-400 bg-red-900/30' : 'text-white/40 hover:text-white hover:bg-white/10'}`} 
              aria-label="Voice input"
              title="Voice Input"
            >
              <IconMic size={16} />
            </button>
          )}
          
          <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="w-9 h-9 flex items-center justify-center border-0 rounded-xl shrink-0 cursor-pointer text-white/40 hover:text-white hover:bg-white/10 transition-colors" 
            aria-label="Attach file"
          >
            <IconPaperclip size={16} />
          </button>
          
          <textarea 
            placeholder="Ask anything..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-white/90 placeholder-white/30 text-[13px] py-2.5 px-2 min-h-[36px] max-h-32 resize-none custom-scrollbar font-light" 
            style={{ fontFamily: 'var(--font-body)' }}
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            onKeyDown={(e) => { 
              if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                submitChat(); 
              } 
            }}
            rows={1}
          />
          
          <button 
            onClick={() => submitChat()} 
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-xl shrink-0 transition-all duration-300 cursor-pointer border border-white/5 hover:scale-105 active:scale-95"  
            aria-label="Send message"
          >
            <IconSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};