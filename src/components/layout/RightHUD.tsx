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
    <div className="flex flex-col h-full relative font-mono bg-[#0B0F19]/40 rounded-xl overflow-hidden">
      {/* Decorative HUD Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:100%_4px] z-0"></div>
      
      {/* HUD Header */}
      <div className="px-4 py-2 border-b border-cyan-500/30 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm z-10 relative">
        <div className="text-cyan-400 text-xs font-bold tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          AI.CORE.LINK
        </div>
        <div className="text-slate-500 text-[10px] tracking-wider">GEMINI-3.1-FLASH-LITE</div>
      </div>

      {/* Session Switcher Mini */}
      <div className="mt-2 mb-2 flex gap-2 overflow-x-auto hide-scrollbar px-3 z-10 relative">
        <button onClick={handleNewSession} className="px-3 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-500/50 text-[10px] font-bold shrink-0 transition-all hover:bg-cyan-600/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] uppercase tracking-wider flex items-center gap-1">
          <span>+</span> NEW.SESSION
        </button>
        {sessions.map((s, i) => (
           <button key={s.id} onClick={() => handleSwitchSession(s.id)} className={`px-3 py-1 text-[10px] uppercase font-bold truncate max-w-[120px] shrink-0 border transition-all tracking-wider ${currentSessionId === s.id ? 'bg-cyan-600/20 border-cyan-400 text-cyan-100 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' : 'bg-slate-800/40 border-slate-700/50 text-slate-500 hover:text-cyan-300 hover:border-cyan-500/30'}`}>
             [{i < 9 ? '0'+(i+1) : i+1}] {s.title}
           </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-2 px-3 custom-scrollbar z-10 relative">
        <div className="flex flex-col gap-5 pt-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
              <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-widest">
                {msg.role === 'ai' ? 'SYS.RESPONSE' : 'USER.INPUT'}
              </div>
              <div className={`p-3 text-[12px] leading-relaxed border max-w-[95%] overflow-x-auto relative ${msg.role === 'ai' ? 'bg-[#0B0F19]/80 text-cyan-50 border-cyan-500/30 rounded-br-xl shadow-[0_0_15px_rgba(34,211,238,0.05)]' : 'bg-blue-900/30 text-blue-100 border-blue-500/40 rounded-bl-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]'}`}>
                {msg.role === 'ai' && <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>}
                {msg.role === 'user' && <div className="absolute top-0 right-0 w-1 h-full bg-blue-500/50"></div>}
                
                <div className={`${msg.role === 'ai' ? 'pl-2' : 'pr-2'}`}>
                  {msg.role === 'ai' ? (
                    <ReactMarkdown 
                      components={{
                        code(props) {
                          const {children, className, node, ...rest} = props;
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <div className="relative group/code mt-3 mb-3 border border-cyan-900/50 shadow-md">
                              <div className="flex justify-between items-center bg-[#0B0F19] px-3 py-1.5 border-b border-cyan-900/50 text-[9px] text-cyan-500 uppercase tracking-widest font-bold">
                                <span>[ CODE_BLOCK : {match[1]} ]</span>
                                <div className="flex gap-3">
                                  <button onClick={() => handleChatSubmit(`Hãy giải thích kỹ hơn về đoạn code ${match[1]} này.`)} className="hover:text-cyan-300 transition-colors">EXPLAIN</button>
                                  <button onClick={() => handleCopyText(String(children))} className="hover:text-cyan-300 transition-colors flex items-center gap-1">COPY</button>
                                </div>
                              </div>
                              <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0', background: '#050810', fontSize: '11px' }} />
                            </div>
                          ) : ( <code {...rest} className="bg-cyan-950/50 px-1.5 py-0.5 text-cyan-300 font-mono text-[11px] border border-cyan-800/50">{children}</code> );
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : ( <div className="whitespace-pre-wrap">{msg.text}</div> )}
                </div>
              </div>
              
              {/* AI Message Actions */}
              {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && !msg.text.includes('Đang kết nối') && (
                <div className="flex gap-3 mt-1.5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => speakText(msg.text)} className={`text-[9px] uppercase tracking-wider font-bold text-slate-500 hover:text-cyan-400 transition-all flex items-center gap-1 ${isSpeaking ? 'text-cyan-400 animate-pulse' : ''}`}>
                    <span className="text-[10px]">🔊</span> {isSpeaking ? 'AUDIO_OUT.ACTIVE' : 'AUDIO_OUT.INIT'}
                  </button>
                  <button onClick={() => handleCopyText(msg.text)} className="text-[9px] uppercase tracking-wider font-bold text-slate-500 hover:text-cyan-400 transition-all flex items-center gap-1">
                    <span className="text-[10px]">📋</span> COPY.DATA
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input Area - HUD Terminal Style */}
      <div className="p-3 bg-[#0B0F19]/80 border-t border-cyan-500/30 backdrop-blur-xl z-10 relative">
        
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {PROMPT_TEMPLATES.map((pt, i) => ( 
            <button key={i} onClick={() => setChatInput(pt)} className="whitespace-nowrap px-2.5 py-1 bg-transparent border border-cyan-900 text-[9px] font-bold text-cyan-600/70 transition-all hover:text-cyan-300 hover:border-cyan-500/50 uppercase tracking-widest hover:bg-cyan-950/30">
              [CMD:{i+1}] {pt.substring(0, 20)}...
            </button> 
          ))}
        </div>
        
        {/* Attachment Indicator */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 mb-2 text-[10px] text-cyan-300 tracking-wider">
            <span className="truncate max-w-[200px] flex items-center gap-2">
              <span>DATA_LOADED:</span> {selectedFile.name}
            </span>
            <button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="hover:text-red-400 px-2 font-bold transition-colors">DROP</button>
          </div>
        )}
        
        {/* Input Field */}
        <div className="flex items-end gap-1 bg-[#050810] p-1 border border-cyan-900 focus-within:border-cyan-500/60 focus-within:shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-all relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 pointer-events-none"></div>

          <button onClick={startListening} className={`p-2 transition-all flex-shrink-0 ${isListening ? 'text-red-400 bg-red-950/30 animate-pulse' : 'text-cyan-800 hover:text-cyan-400'}`} title="AUDIO_INPUT">
            🎙️
          </button>
          
          <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors flex-shrink-0" title="ATTACH_DATA">
            📎
          </button>
          
          <div className="flex-1 flex items-center pb-1">
            <span className="text-cyan-600 text-[10px] mr-2 animate-pulse">{'>'}</span>
            <textarea 
              placeholder="ENTER_COMMAND..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-cyan-100 placeholder-cyan-900 text-[11px] py-1.5 min-h-[30px] max-h-24 resize-none custom-scrollbar uppercase tracking-wide" 
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
          </div>
          
          <button onClick={() => handleChatSubmit()} className="px-3 py-2 text-black bg-cyan-600 hover:bg-cyan-400 transition-all flex-shrink-0 text-[10px] font-black tracking-widest uppercase shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]" title="EXECUTE">
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};
