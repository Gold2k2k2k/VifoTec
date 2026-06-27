import React from 'react';

export const RightHUD: React.FC<any> = ({ messages, handleChatSubmit, PROMPT_TEMPLATES }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages && messages.map((m: any, i: number) => (
          <div key={i} style={{ marginBottom: '10px', color: m.role === 'ai' ? '#88ccff' : '#fff' }}>
            <strong>{m.role}:</strong> <br />
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #444' }}>
        <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', marginBottom: '10px' }}>
          {PROMPT_TEMPLATES && PROMPT_TEMPLATES.map((t: string, i: number) => (
            <button key={i} onClick={() => handleChatSubmit(t)} style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{t.substring(0, 15)}...</button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Type message..." 
          style={{ width: '100%', padding: '5px', color: '#000' }}
          onKeyDown={(e) => { 
            if (e.key === 'Enter') {
              handleChatSubmit(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }} 
        />
      </div>
    </div>
  );
};