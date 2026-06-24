import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    <div className="flex flex-col h-full relative">
      {/* Session Switcher Mini */}
      <div className="mb-3 flex gap-2 overflow-x-auto hide-scrollbar pb-2 px-1">
        <button onClick={handleNewSession} className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 rounded-full text-xs font-bold shrink-0 transition-all hover:bg-emerald-600/40 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]">+</button>
        {sessions.map(s => (
           <button key={s.id} onClick={() => handleSwitchSession(s.id)} className={`px-4 py-1.5 rounded-full text-xs font-medium truncate max-w-[140px] shrink-0 border transition-all ${currentSessionId === s.id ? 'bg-blue-600/30 border-blue-400 text-blue-200 shadow-[0_0_10px_rgba(96,165,250,0.3)]' : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'}`}>
             {s.title}
           </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
              <div className={`p-4 rounded-2xl text-[13px] leading-relaxed border shadow-lg max-w-[95%] overflow-x-auto ${msg.role === 'ai' ? 'bg-slate-900/80 text-slate-200 border-slate-700/80 rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)]' : 'bg-blue-600/30 text-blue-100 border-blue-500/40 rounded-tr-sm backdrop-blur shadow-[0_4px_15px_rgba(37,99,235,0.2)]'}`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown 
                    components={{
                      code(props) {
                        const {children, className, node, ...rest} = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <div className="relative group/code mt-3 mb-3 rounded-xl overflow-hidden border border-slate-700/80 shadow-md">
                            <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                              <span>{match[1]}</span>
                              <div className="flex gap-3">
                                <button onClick={() => handleChatSubmit(`Hãy giải thích kỹ hơn về đoạn code ${match[1]} này.`)} className="hover:text-emerald-400 transition-colors">Giải thích</button>
                                <button onClick={() => handleCopyText(String(children))} className="hover:text-blue-400 transition-colors flex items-center gap-1"><span className="text-xs">📋</span> Copy</button>
                              </div>
                            </div>
                            <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0', background: '#0f172a' }} />
                          </div>
                        ) : ( <code {...rest} className="bg-slate-800/80 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-[12px] border border-slate-700/50">{children}</code> );
                      }
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : ( <div className="whitespace-pre-wrap">{msg.text}</div> )}
              </div>
              
              {/* AI Message Actions */}
              {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && (
                <div className="flex gap-2 mt-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => speakText(msg.text)} className={`text-[11px] font-medium text-slate-400 hover:text-amber-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/80 transition-all ${isSpeaking ? 'text-amber-400 animate-pulse border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : ''}`}>
                    🔊 {isSpeaking ? 'Đang đọc...' : 'Đọc To'}
                  </button>
                  <button onClick={() => handleCopyText(msg.text)} className="text-[11px] font-medium text-slate-400 hover:text-blue-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/80 transition-all">
                    📋 Copy
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-700/80 p-3 flex flex-col gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {PROMPT_TEMPLATES.map((pt, i) => ( 
            <button key={i} onClick={() => setChatInput(pt)} className="whitespace-nowrap px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-full text-[11px] font-medium text-slate-300 transition-all hover:text-white hover:border-slate-500">
              ✨ {pt}
            </button> 
          ))}
        </div>
        
        {/* Attachment Indicator */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-blue-900/20 border border-blue-500/40 px-3 py-2 rounded-xl text-xs text-blue-200">
            <span className="truncate max-w-[200px] flex items-center gap-2">
              <span className="text-blue-400">📎</span> {selectedFile.name}
            </span>
            <button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="hover:text-red-400 p-1 bg-red-500/10 rounded-lg transition-colors">✕</button>
          </div>
        )}
        
        {/* Input Field */}
        <div className="flex items-end gap-2 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800/80 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
          <button onClick={startListening} className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${isListening ? 'text-red-400 bg-red-900/30 animate-pulse shadow-[0_0_10px_rgba(248,113,113,0.3)]' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'}`} title="Nhập bằng giọng nói">
            🎙️
          </button>
          
          <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          
          <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0" title="Đính kèm tài liệu">
            📎
          </button>
          
          <textarea 
            placeholder="Giao tiếp với Gemini AI..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-500 text-sm py-2.5 min-h-[44px] max-h-32 resize-none custom-scrollbar" 
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
          
          <button onClick={() => handleChatSubmit()} className="p-2.5 text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-all flex-shrink-0 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-105" title="Gửi (Enter)">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};
