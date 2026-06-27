import React from 'react';

export const LeftHUD: React.FC<any> = ({ controls, handleDownload, toggleSonification, generateCitizenReport, setShowQuiz }) => {
  return (
    <div style={{ position: 'absolute', top: 50, left: 0, bottom: 50, width: '100px', background: '#111', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', zIndex: 90 }}>
      {controls && controls.map((c: any, i: number) => (
        <button key={i} onClick={c.action} style={{ padding: '5px' }}>{c.title}</button>
      ))}
      <hr style={{ borderColor: '#333' }} />
      <button onClick={handleDownload}>Download</button>
      <button onClick={toggleSonification}>Sound</button>
      <button onClick={generateCitizenReport}>Report</button>
      <button onClick={() => setShowQuiz(true)}>Quiz</button>
    </div>
  );
};
