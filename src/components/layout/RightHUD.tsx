import React from 'react';
import ReactMarkdown from 'react-markdown';

export const RightHUD: React.FC<any> = ({ messages, handleChatSubmit, PROMPT_TEMPLATES }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--ks-raised-lacquer)]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)]">
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.4rem', letterSpacing: '-0.01em', lineHeight: 1.02 }} className="text-[var(--ks-champagne)]">
          AI Data Core
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }} className="text-[var(--ks-text-muted)] mt-2">
          ANALYSIS & TELEMETRY
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6">
        <div className="flex flex-col gap-8">
          {messages && messages.map((m: any, i: number) => (
            <div key={i} className={`flex flex-col ${m.role === 'ai' ? 'items-start' : 'items-end'}`}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }} className="text-[var(--ks-text-faint)] mb-2">
                {m.role === 'ai' ? 'SYSTEM' : 'OPERATOR'}
              </div>
              <div className={`p-5 max-w-[95%] border rounded-[2px] ${
                m.role === 'ai' 
                  ? 'bg-[var(--ks-lacquer-deep)] border-[var(--ks-kinpaku-deep)] text-[var(--ks-text-warm)]' 
                  : 'bg-[var(--ks-graphite-2)] border-[var(--ks-gold-hairline)] text-[var(--ks-champagne)]'
              }`}>
                <div className="prose prose-invert max-w-none font-light" style={{ fontSize: '1.02rem', lineHeight: 1.8 }}>
                  {m.role === 'ai' ? (
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)]">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-4">
          {PROMPT_TEMPLATES && PROMPT_TEMPLATES.map((t: string, i: number) => (
            <button 
              key={i} 
              onClick={() => handleChatSubmit(t)} 
              className="px-4 py-2 border border-[var(--ks-gold-hairline)] bg-[var(--ks-graphite)] text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] hover:border-[var(--ks-gold-hairline-strong)] whitespace-nowrap transition-colors rounded-[2px] cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              {t.substring(0, 20)}...
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            className="w-full ks-input !bg-[var(--ks-graphite-2)] !pr-16"
            placeholder="ENTER QUERY..." 
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                handleChatSubmit(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }} 
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--ks-kinpaku-gold)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};