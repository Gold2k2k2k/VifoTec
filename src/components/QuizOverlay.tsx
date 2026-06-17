import React, { useState } from 'react';
import { QUIZZES } from '../data';

interface QuizOverlayProps {
  searchQuery: string;
  setShowQuiz: (val: boolean) => void;
  badges: string[];
  setBadges: (val: string[]) => void;
  speakText: (text: string) => void;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ searchQuery, setShowQuiz, badges, setBadges, speakText }) => {
  const [quizState, setQuizState] = useState({ step: 0, score: 0 });
  const quizData = QUIZZES[searchQuery.toUpperCase()] || QUIZZES["DEFAULT"];
  const activeQuiz = quizData[quizState.step];

  const handleQuizAnswer = (idx: number) => {
    if (idx === activeQuiz.ans) {
      setQuizState(prev => ({...prev, score: prev.score + 1}));
      speakText("Chính xác!");
    } else speakText("Rất tiếc, câu trả lời chưa đúng.");
    
    if (quizState.step + 1 < quizData.length) { 
      setQuizState(prev => ({...prev, step: prev.step + 1})); 
    } else {
      if (quizState.score + (idx === activeQuiz.ans ? 1 : 0) === quizData.length) {
        const newBadge = `Phi hành gia ưu tú: ${searchQuery || 'Vũ trụ'}`;
        if (!badges.includes(newBadge)) {
          const updated = [...badges, newBadge];
          setBadges(updated);
          localStorage.setItem('jwst_badges', JSON.stringify(updated));
        }
      }
      setShowQuiz(false);
      alert("Bạn đã hoàn thành bài kiểm tra không gian!");
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
      <div className="bg-slate-900 border border-purple-500 p-8 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">🚀 Thử Thách Không Gian</h2>
        <p className="text-slate-400 mb-8">Câu hỏi {quizState.step + 1} / {quizData.length}</p>
        <h3 className="text-xl text-white mb-6 font-medium">{activeQuiz.q}</h3>
        <div className="flex flex-col gap-3">
          {activeQuiz.options.map((opt: string, i: number) => (
            <button key={i} onClick={() => handleQuizAnswer(i)} className="bg-slate-800 hover:bg-purple-600 text-slate-200 py-3 px-6 rounded-xl transition-colors border border-slate-700 hover:border-purple-400">{opt}</button>
          ))}
        </div>
        <button onClick={() => setShowQuiz(false)} className="mt-8 text-sm text-slate-500 hover:text-white underline">Bỏ qua thử thách</button>
      </div>
    </div>
  );
};
