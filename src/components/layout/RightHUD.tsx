import React from 'react';
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
  chatInput: string;
  setChatInput: (s: string) => void;
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
  setFileContent: (s: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  startListening: () => void;
  isListening: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RightHUD: React.FC<RightHUDProps> = ({
  handleNewSession, sessions, currentSessionId, handleSwitchSession, messages, messagesEndRef,
  handleChatSubmit, handleCopyText, speakText, isSpeaking, PROMPT_TEMPLATES, chatInput, setChatInput,
  selectedFile, setSelectedFile, setFileContent, fileInputRef, startListening, isListening, handleFileChange
}) => {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-slate-700/40 flex justify-between items-center bg-slate-900/30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: 'pulse-glow 2s infinite' }} />
          <span className="hud-label text-cyan-400">AI Assistant</span>
        </div>
        <span className="text-[9px] text-slate-600" style={{ fontFamily: 'var(--font-mono)' }}>GEMINI</span>
      </div>

      {/* Session tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar px-2 py-1.5 border-b border-slate-800/30 shrink-0">
        <button 
          onClick={handleNewSession} 
          className="btn-ghost flex items-center gap-1 shrink-0 text-[10px] py-1 cursor-pointer"
          aria-label="New chat session"
        >
          <IconPlus size={12} /> New
        </button>
        {sessions.map((s, i) => (
          <button 
            key={s.id} 
            onClick={() => handleSwitchSession(s.id)} 
            className={`px-2 py-1 text-[10px] truncate max-w-[100px] shrink-0 rounded cursor-pointer transition-all duration-200 ${
              currentSessionId === s.id 
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 border border-transparent'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 min-h-0">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
              <div className="text-[9px] text-slate-600 mb-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                {msg.role === 'ai' ? 'System' : 'You'}
              </div>
              <div className={`p-3 text-[12px] leading-relaxed max-w-[95%] overflow-x-auto rounded-lg ${
                msg.role === 'ai' 
                  ? 'bg-slate-800/40 text-slate-200 border border-slate-700/30' 
                  : 'bg-blue-900/20 text-blue-100 border border-blue-800/30'
              }`}>
                <div className="prose-sm">
                  {msg.role === 'ai' ? (
                    <ReactMarkdown 
                      components={{
                        code(props) {
                          const {children, className, node, ...rest} = props;
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <div className="relative mt-2 mb-2 rounded-lg overflow-hidden border border-slate-700/30">
                              <div className="flex justify-between items-center bg-slate-900 px-3 py-1 border-b border-slate-700/30">
                                <span className="hud-label text-slate-500">{match[1]}</span>
                                <div className="flex gap-2">
                                  <button onClick={() => handleChatSubmit(`Explain this ${match[1]} code in detail.`)} className="hud-label text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">Explain</button>
                                  <button onClick={() => handleCopyText(String(children))} className="hud-label text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
                                    <IconCopy size={10} /> Copy
                                  </button>
                                </div>
                              </div>
                              <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0', background: '#0B0B10', fontSize: '11px' }} />
                            </div>
                          ) : ( <code {...rest} className="bg-slate-800 px-1.5 py-0.5 text-cyan-300 text-[11px] rounded" style={{ fontFamily: 'var(--font-mono)' }}>{children}</code> );
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
                <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    onClick={() => speakText(msg.text)} 
                    className={`btn-icon w-6 h-6 border-0 cursor-pointer ${isSpeaking ? 'text-cyan-400' : ''}`}
                    aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
                  >
                    <IconVolume size={12} />
                  </button>
                  <button 
                    onClick={() => handleCopyText(msg.text)} 
                    className="btn-icon w-6 h-6 border-0 cursor-pointer"
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
      <div className="p-2 bg-slate-900/40 border-t border-slate-700/30 shrink-0">
        {/* Quick prompts */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-2">
          {PROMPT_TEMPLATES.map((pt, i) => ( 
            <button 
              key={i} 
              onClick={() => setChatInput(pt)} 
              className="btn-ghost text-[9px] py-1 px-2 shrink-0 cursor-pointer whitespace-nowrap"
            >
              {pt.substring(0, 25)}...
            </button> 
          ))}
        </div>
        
        {/* Attached file */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/30 rounded px-2 py-1 mb-2 text-[10px] text-slate-300" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="truncate max-w-[200px] flex items-center gap-1.5">
              <IconPaperclip size={11} className="text-cyan-500" />
              {selectedFile.name}
            </span>
            <button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer ml-2">
              <IconClose size={12} />
            </button>
          </div>
        )}
        
        {/* Text input */}
        <div className="flex items-end gap-1 bg-[#0B0B10] rounded-lg border border-slate-700/50 focus-within:border-cyan-500/40 transition-all duration-200 p-1">
          <button 
            onClick={startListening} 
            className={`btn-icon w-8 h-8 border-0 rounded-md shrink-0 cursor-pointer ${isListening ? 'text-red-400 bg-red-950/30' : ''}`} 
            aria-label="Voice input"
          >
            <IconMic size={14} />
          </button>
          
          <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="btn-icon w-8 h-8 border-0 rounded-md shrink-0 cursor-pointer" 
            aria-label="Attach file"
          >
            <IconPaperclip size={14} />
          </button>
          
          <textarea 
            placeholder="Ask anything..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-600 text-xs py-2 px-1 min-h-[32px] max-h-24 resize-none custom-scrollbar" 
            style={{ fontFamily: 'var(--font-body)' }}
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            onKeyDown={(e) => { 
              if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                handleChatSubmit(); 
              } 
            }}
            rows={1}
          />
          
          <button 
            onClick={() => handleChatSubmit()} 
            className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-md shrink-0 transition-all duration-200 cursor-pointer" 
            aria-label="Send message"
          >
            <IconSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
