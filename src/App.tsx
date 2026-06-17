import { getGeminiResponse } from './aiService';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatSession, InteractionMode, SpectrumMode, POPULAR_TARGETS, PROMPT_TEMPLATES, MOCK_TOURS, QUIZZES } from './data';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);

  // Session & UI Management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [showSessionSidebar, setShowSessionSidebar] = useState<boolean>(false);

  // File Upload QA & Voice
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Viewer State
  const [dziUrl, setDziUrl] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('none');
  const interactionModeRef = useRef(interactionMode);
  const [isWaitingForDzi, setIsWaitingForDzi] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180); 
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturate: 100 });
  const [spectrumMode, setSpectrumMode] = useState<SpectrumMode>('NIRCAM');

  // Suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // NEW FEATURES STATE
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState({ step: 0, score: 0 });
  const [badges, setBadges] = useState<string[]>([]);
  const [showRadar, setShowRadar] = useState(false);

  const getSpectrumFilters = () => {
    let base = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`;
    if (spectrumMode === 'MIRI') return base + ` hue-rotate(90deg) contrast(150%)`;
    if (spectrumMode === 'XRAY') return base + ` invert(1) hue-rotate(180deg) saturate(200%)`;
    return base;
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    const savedBadges = localStorage.getItem('jwst_badges');
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('jwst_chat_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) {
        setCurrentSessionId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    } else handleNewSession();
  }, []);

  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      setSessions(prev => {
        const updated = prev.map(s => 
          s.id === currentSessionId ? { ...s, messages, title: s.title === 'Phiên khám phá mới' ? (messages[0]?.text.slice(0, 25) + '...') : s.title } : s
        );
        if (!updated.some(s => s.id === currentSessionId)) {
          updated.unshift({ id: currentSessionId, title: messages[0]?.text.slice(0, 25) + '...', messages });
        }
        localStorage.setItem('jwst_chat_sessions', JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, currentSessionId]);

  const handleNewSession = () => {
    const newId = Date.now().toString();
    setSessions(prev => [{ id: newId, title: 'Phiên khám phá mới', messages: [] }, ...prev]);
    setCurrentSessionId(newId);
    setMessages([]);
  };

  const handleSwitchSession = (id: string) => {
    const target = sessions.find(s => s.id === id);
    if (target) { setCurrentSessionId(id); setMessages(target.messages); }
  };

  useEffect(() => {
    interactionModeRef.current = interactionMode;
    if (osdViewerRef.current) {
        const viewer = osdViewerRef.current;
        const isNone = interactionMode === 'none';
        viewer.panHorizontal = isNone;
        viewer.panVertical = isNone;
        viewer.zoomPerClick = isNone ? 2.0 : 1.0;
        
        // Hide overlay if leaving magnify mode
        const overlay = document.getElementById('magnify-overlay');
        if (overlay) overlay.style.display = (interactionMode === 'magnify') ? 'block' : 'none';
    }
  }, [interactionMode]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) setShowSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const filtered = POPULAR_TARGETS.filter(target => target.toLowerCase().includes(value.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else setShowSuggestions(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWaitingForDzi) interval = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [isWaitingForDzi]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (isExploring && dziUrl) {
      if (osdViewerRef.current) osdViewerRef.current.destroy();

      const viewer = OpenSeadragon({
        id: 'osd-viewer',
        prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: dziUrl,
        showNavigator: true,
        navigatorPosition: 'BOTTOM_RIGHT',
        showNavigationControl: false,
        crossOriginPolicy: "Anonymous", 
      });

      viewer.addHandler('open', () => {
         const nav = document.querySelector('.navigator') as HTMLElement;
         if (nav) {
           nav.style.border = '2px solid #3b82f6'; nav.style.borderRadius = '8px'; nav.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
         }
      });

      osdViewerRef.current = viewer;

      let dragStartPoint: OpenSeadragon.Point | null = null;
      let selectionOverlayElement: HTMLDivElement | null = null;

      // Magnify Overlay Pre-creation
      const magnifyEl = document.createElement("div");
      magnifyEl.id = 'magnify-overlay';
      magnifyEl.className = "hidden absolute pointer-events-none rounded-full border-4 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center text-center p-2 transition-transform";
      magnifyEl.style.width = '180px';
      magnifyEl.style.height = '180px';
      magnifyEl.style.transform = 'translate(-50%, -50%)';
      magnifyEl.style.zIndex = '50';
      document.getElementById('osd-viewer')?.appendChild(magnifyEl);

      new OpenSeadragon.MouseTracker({
        element: viewer.canvas,
        moveHandler: (event) => {
           if (interactionModeRef.current === 'magnify' && osdViewerRef.current) {
              const currentPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              magnifyEl.style.left = `${event.position.x}px`;
              magnifyEl.style.top = `${event.position.y}px`;
              
              // Pseudo-spectroscopy logic based on coordinates
              const pseudoColor = (Math.sin(currentPoint.x * 20) + Math.cos(currentPoint.y * 20)) / 2;
              let material = "Bụi Carbon (Lạnh)";
              let color = "text-slate-300";
              if (pseudoColor > 0.5) { material = "Khí Hydro Ion Hóa"; color = "text-red-400"; }
              else if (pseudoColor < -0.3) { material = "Khí Oxy & Lưu Huỳnh"; color = "text-blue-400"; }
              
              magnifyEl.innerHTML = `
                <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Máy Quang Phổ</span>
                <span class="text-sm font-bold ${color}">${material}</span>
                <span class="text-[10px] text-slate-300 mt-1">Tọa độ: ${currentPoint.x.toFixed(2)}, ${currentPoint.y.toFixed(2)}</span>
              `;
           }
        },
        pressHandler: (event) => {
           const mode = interactionModeRef.current;
           if ((mode === 'select' || mode === 'measure') && osdViewerRef.current) {
              dragStartPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              selectionOverlayElement = document.createElement("div");
              
              if (mode === 'select') {
                selectionOverlayElement.className = "border-2 border-emerald-400 bg-emerald-500/20 pointer-events-none";
                osdViewerRef.current.addOverlay({ element: selectionOverlayElement, location: new OpenSeadragon.Rect(dragStartPoint.x, dragStartPoint.y, 0, 0) });
              } else if (mode === 'measure') {
                selectionOverlayElement.className = "text-xs font-bold text-yellow-400 bg-black/80 px-2 py-1 rounded border border-yellow-500 shadow-lg pointer-events-none whitespace-nowrap";
                osdViewerRef.current.addOverlay({ element: selectionOverlayElement, location: dragStartPoint, placement: OpenSeadragon.Placement.BOTTOM_LEFT });
              }
           }
        },
        dragHandler: (event) => {
           const mode = interactionModeRef.current;
           if (dragStartPoint && selectionOverlayElement && osdViewerRef.current) {
              const currentPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              
              if (mode === 'select') {
                const x = Math.min(dragStartPoint.x, currentPoint.x);
                const y = Math.min(dragStartPoint.y, currentPoint.y);
                const width = Math.abs(currentPoint.x - dragStartPoint.x);
                const height = Math.abs(currentPoint.y - dragStartPoint.y);
                osdViewerRef.current.updateOverlay(selectionOverlayElement, new OpenSeadragon.Rect(x, y, width, height));
              } else if (mode === 'measure') {
                const dx = currentPoint.x - dragStartPoint.x;
                const dy = currentPoint.y - dragStartPoint.y;
                const distViewport = Math.sqrt(dx*dx + dy*dy); 
                let scale = 100000; 
                if (searchQuery.toUpperCase().includes('M101')) scale = 170000;
                const ly = (distViewport * scale).toLocaleString('en-US', {maximumFractionDigits: 1});
                selectionOverlayElement.innerHTML = `📏 Khảng cách: ~${ly} năm ánh sáng`;
                osdViewerRef.current.updateOverlay(selectionOverlayElement, currentPoint);
              }
           }
        },
        releaseHandler: () => { dragStartPoint = null; selectionOverlayElement = null; },
        clickHandler: (event: any) => {
          if (interactionModeRef.current === 'mark' && osdViewerRef.current) {
            const viewportPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
            const markerElement = document.createElement("div");
            markerElement.className = "w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.8)] pointer-events-none animate-pulse";
            osdViewerRef.current.addOverlay({ element: markerElement, location: viewportPoint, placement: OpenSeadragon.Placement.CENTER });
          }
        }
      });
    }

    return () => { if (osdViewerRef.current) osdViewerRef.current.destroy(); };
  }, [isExploring, dziUrl]);

  const handleZoomIn = () => { osdViewerRef.current?.viewport.zoomBy(1.5); osdViewerRef.current?.viewport.applyConstraints(); };
  const handleZoomOut = () => { osdViewerRef.current?.viewport.zoomBy(0.66); osdViewerRef.current?.viewport.applyConstraints(); };
  const handleToggleFullScreen = () => { if (osdViewerRef.current) osdViewerRef.current.setFullScreen(!osdViewerRef.current.isFullPage()); };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome/Edge."); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN'; recognition.continuous = false; recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => { setChatInput(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[0][0].transcript); };
    recognition.onerror = () => setIsListening(false); recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const speakText = (text: string) => {
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang === 'vi-VN' || v.lang.includes('vi'));
    if (viVoice) utterance.voice = viVoice;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const startTour = async () => {
    if (!osdViewerRef.current) return;
    const tourData = MOCK_TOURS[searchQuery.toUpperCase()] || MOCK_TOURS["DEFAULT"];
    for (const point of tourData) {
       if (!osdViewerRef.current) break;
       osdViewerRef.current.viewport.panTo(new OpenSeadragon.Point(point.x, point.y));
       osdViewerRef.current.viewport.zoomTo(point.zoom);
       setMessages(prev => [...prev, {role: 'ai', text: `🛸 **Tour Guide:** ${point.text}`}]);
       speakText(point.text);
       await new Promise(r => setTimeout(r, 6000));
    }
  };

  // Gamification: Handle Quiz Answer
  const handleQuizAnswer = (idx: number) => {
    const quizData = QUIZZES[searchQuery.toUpperCase()] || QUIZZES["DEFAULT"];
    const currentQ = quizData[quizState.step];
    if (idx === currentQ.ans) {
      setQuizState(prev => ({...prev, score: prev.score + 1}));
      speakText("Chính xác!");
    } else speakText("Rất tiếc, câu trả lời chưa đúng.");
    
    if (quizState.step + 1 < quizData.length) {
      setQuizState(prev => ({...prev, step: prev.step + 1}));
    } else {
      // Finish quiz
      if (quizState.score + (idx === currentQ.ans ? 1 : 0) === quizData.length) {
        const newBadge = `Phi hành gia ưu tú: ${searchQuery || 'Vũ trụ'}`;
        if (!badges.includes(newBadge)) {
          const updated = [...badges, newBadge];
          setBadges(updated);
          localStorage.setItem('jwst_badges', JSON.stringify(updated));
        }
      }
      setShowQuiz(false);
      setQuizState({step: 0, score: 0});
      alert("Bạn đã hoàn thành bài kiểm tra không gian!");
    }
  };

  const executeSearch = async (queryToSearch: string) => {
    if (queryToSearch.trim() === '') return;
    setShowSuggestions(false); 
    const formattedQuery = queryToSearch.trim().toUpperCase().replace(/\s+/g, '_');

    setInteractionMode('none');
    setFilters({ brightness: 100, contrast: 100, saturate: 100 });
    setSpectrumMode('NIRCAM');
    
    if (osdViewerRef.current) osdViewerRef.current.clearOverlays();
    const cleanApiUrl = "https://gbachnguyen-jwst-backend-processor.hf.space";

    if (dziUrl) { try { fetch(`${cleanApiUrl}/api/v1/cleanup/`, { method: 'DELETE' }); } catch (err) { } }

    setIsExploring(true);
    setDziUrl(''); setIsWaitingForDzi(false); setTimeLeft(180);

    const introMsg = { role: 'ai', text: `Đang thiết lập lại tọa độ. Khởi động quy trình quét dữ liệu cho mục tiêu mới: **${queryToSearch}**...` };
    if (messages.length === 0) setMessages([introMsg]);
    else { handleNewSession(); setTimeout(() => setMessages([introMsg]), 100); }

    try {
      const response = await fetch(`${cleanApiUrl}/api/v1/explore/${formattedQuery}`, { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        const fullDziUrl = `${cleanApiUrl}/static/${formattedQuery}.dzi`;

        if (data.status === 'ready' || data.task_id === 'cached') {
            setMessages(prev => [...prev, { role: 'ai', text: `✅ **Tải thành công!** Hệ thống đã lấy dữ liệu bản đồ **${queryToSearch}** từ bộ nhớ đệm.` }]);
            setDziUrl(fullDziUrl);
        } else {
            setMessages(prev => [...prev, { role: 'ai', text: `📡 Đã kích hoạt lõi xử lý thiên thể **${queryToSearch}**. NASA đang xử lý dữ liệu và phân rã ảnh DeepZoom...` }]);
            setIsWaitingForDzi(true);
            const checkInterval = setInterval(async () => {
                try {
                    const statusRes = await fetch(`${fullDziUrl}?t=${new Date().getTime()}`, { method: 'HEAD', cache: 'no-store' });
                    if (statusRes.ok) {
                        clearInterval(checkInterval); setIsWaitingForDzi(false);
                        setMessages(prev => [...prev, { role: 'ai', text: `✨ **Xử lý hoàn tất!** Bản đồ của **${queryToSearch}** đã sẵn sàng hiển thị.` }]);
                        setDziUrl(fullDziUrl);
                    }
                } catch (err) { }
            }, 3000);
            setTimeout(() => { clearInterval(checkInterval); setIsWaitingForDzi(false); }, 300000);
        }
      } else setIsWaitingForDzi(false);
    } catch (error) { setIsWaitingForDzi(false); setMessages(prev => [...prev, { role: 'ai', text: 'Lỗi: Không thể kết nối tới máy chủ lõi.' }]); }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); executeSearch(searchQuery); };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { setSelectedFile(file); setFileContent(await file.text()); } };

  const handleChatSubmit = async (overrideText?: string) => {
    const submitText = overrideText || chatInput.trim();
    if (submitText !== '' || fileContent !== '') {
      let textToSend = submitText;
      if (fileContent) textToSend += `\n\n--- Dữ liệu đính kèm từ file ${selectedFile?.name} ---\n${fileContent}`;
      setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
      setChatInput(''); setSelectedFile(null); setFileContent(''); if (fileInputRef.current) fileInputRef.current.value = '';
      setMessages(prev => [...prev, { role: 'ai', text: 'Đang phân tích dữ liệu...' }]);

      try {
        const currentHistory = messages.filter(m => m.text !== 'Đang phân tích dữ liệu...');
        const aiReply = await getGeminiResponse(textToSend, currentHistory);
        setMessages(prev => { const newMsgs = [...prev]; newMsgs[newMsgs.length - 1] = { role: 'ai', text: aiReply }; return newMsgs; });
      } catch (err) {
        setMessages(prev => { const newMsgs = [...prev]; newMsgs[newMsgs.length - 1] = { role: 'ai', text: '⚠️ Lỗi: Cảm biến AI đang nhiễu sóng hoặc API Key không hợp lệ.' }; return newMsgs; });
      }
    }
  };

  // Citizen Science: Generate PDF/Markdown Report
  const generateCitizenReport = () => {
     let md = `# BÁO CÁO KHÁM PHÁ VŨ TRỤ (CITIZEN SCIENCE)\n\n`;
     md += `**Mục tiêu quan sát:** ${searchQuery.toUpperCase() || 'Không xác định'}\n`;
     md += `**Ngày thực hiện:** ${new Date().toLocaleString('vi-VN')}\n\n`;
     md += `## Lịch sử Phân tích AI\n`;
     messages.filter(m => !m.text.includes('Đang thiết lập lại tọa độ')).forEach(m => {
       md += `**[${m.role === 'user' ? 'Nhà nghiên cứu' : 'Trợ lý JWST-AI'}]**: ${m.text}\n\n`;
     });
     md += `## Chú thích tọa độ\n*Các vùng sáng và tọa độ đã được đánh dấu trực tiếp trên ứng dụng.*\n`;
     
     const blob = new Blob([md], { type: 'text/markdown' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a'); link.href = url; link.download = `JWST_BaoCao_${Date.now()}.md`; link.click(); URL.revokeObjectURL(url);
     speakText("Đã trích xuất báo cáo thành công.");
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#osd-viewer canvas') as HTMLCanvasElement;
    if (canvas) {
      try {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.filter = getSpectrumFilters(); ctx.drawImage(canvas, 0, 0);
          const link = document.createElement('a'); link.download = `jwst_${searchQuery}_${spectrumMode}_${Date.now()}.png`; link.href = tempCanvas.toDataURL('image/png', 1.0); link.click();
        }
      } catch (err) { alert("Lỗi xuất ảnh: Không thể tải ảnh do giới hạn bảo mật CORS."); }
    }
  };

  const handleCopyText = (text: string) => { navigator.clipboard.writeText(text); alert("Đã sao chép vào bộ nhớ tạm!"); };

  const controls = [
    { label: "+", action: handleZoomIn, title: "Phóng to", type: "zoomIn" },
    { label: "-", action: handleZoomOut, title: "Thu nhỏ", type: "zoomOut" },
    { label: "📍", action: () => setInteractionMode(interactionMode === 'mark' ? 'none' : 'mark'), title: "Ghim địa điểm (Click)", type: "mark" },
    { label: "🔲", action: () => setInteractionMode(interactionMode === 'select' ? 'none' : 'select'), title: "Khoanh vùng (Drag chuột)", type: "select" },
    { label: "📏", action: () => setInteractionMode(interactionMode === 'measure' ? 'none' : 'measure'), title: "Thước đo quang sai (Drag chuột)", type: "measure" },
    { label: "🔍", action: () => setInteractionMode(interactionMode === 'magnify' ? 'none' : 'magnify'), title: "Kính lúp phân tích vật chất", type: "magnify" },
    { label: "⛶", action: handleToggleFullScreen, title: "Toàn màn hình", type: "fullScreen" },
  ];

  const activeQuiz = (QUIZZES[searchQuery.toUpperCase()] || QUIZZES["DEFAULT"])[quizState.step];

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Landing Page */}
      {!isExploring && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-cosmic">
          <h1 className="text-6xl font-bold text-blue-400 tracking-widest mb-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] text-center px-4">JWST SPACE EXPLORER</h1>
          <div className="relative w-full max-w-2xl px-4" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-full z-20 relative">
              <input type="text" className="w-full px-6 py-4 bg-slate-900/90 backdrop-blur-md border border-slate-600 rounded-l-full text-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400" placeholder="Khám phá thiên hà (VD: M101, Tinh vân Orion,...)" value={searchQuery} onChange={handleInputChange} onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }} />
              <button type="submit" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-r-full font-bold text-lg transition-colors shadow-lg">Khám phá</button>
            </form>
            {showSuggestions && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-down mx-4" style={{width: 'calc(100% - 2rem)'}}>
                {filteredSuggestions.length > 0 ? (
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, idx) => ( <li key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-6 py-3 hover:bg-blue-600/50 cursor-pointer border-b border-slate-700/50 last:border-0 text-slate-200 transition-colors flex items-center gap-3"><span className="text-blue-400">✨</span> {suggestion}</li> ))}
                  </ul>
                ) : ( <div className="px-6 py-4 text-slate-400 italic">Nhấn "Khám phá" để yêu cầu NASA quét sâu...</div> )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      {isExploring && (
        <header className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-blue-400 tracking-widest cursor-pointer" onClick={() => setIsExploring(false)}>JWST EXPLORER</h1>
            <button onClick={() => setShowSessionSidebar(!showSessionSidebar)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-sm text-slate-300">🕒 Lịch sử Chat</button>
            <button onClick={() => setShowQuiz(true)} className="px-3 py-1 bg-purple-900/50 hover:bg-purple-800 border border-purple-500/50 text-purple-200 rounded text-sm flex items-center gap-2">🎮 Huấn luyện Phi hành gia</button>
            <button onClick={() => setShowRadar(!showRadar)} className="px-3 py-1 bg-emerald-900/50 hover:bg-emerald-800 border border-emerald-500/50 text-emerald-200 rounded text-sm flex items-center gap-2">🌐 Radar 3D</button>
          </div>
          <div className="flex items-center gap-4">
            {badges.length > 0 && (
              <div className="flex gap-1">
                {badges.map((b, i) => <span key={i} title={b} className="text-xl">🎖️</span>)}
              </div>
            )}
            <div className="relative w-64" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="flex w-full">
                <input type="text" className="w-full px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:border-blue-500 text-sm" placeholder="Tìm thiên thể..." value={searchQuery} onChange={handleInputChange} onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }} />
                <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-r-md font-medium transition-colors text-sm">Tìm</button>
              </form>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 flex relative overflow-hidden">
        {/* Session Sidebar */}
        {isExploring && showSessionSidebar && (
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center"><h2 className="font-bold text-slate-200">Các phiên Chat</h2><button onClick={handleNewSession} className="text-emerald-400 hover:text-emerald-300 font-bold text-xl">+</button></div>
            <div className="flex-1 overflow-y-auto p-2">
              {sessions.map(s => (
                <div key={s.id} onClick={() => handleSwitchSession(s.id)} className={`p-3 mb-2 rounded cursor-pointer text-sm truncate border transition-colors ${currentSessionId === s.id ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-slate-800/30 border-transparent hover:bg-slate-800 text-slate-400'}`}>{s.title}</div>
              ))}
            </div>
          </aside>
        )}

        <section className="flex-1 relative bg-black flex items-center justify-center">
          {!isExploring ? ( <p className="text-slate-500 italic text-lg">Vui lòng nhập tên thiên thể để nạp bản đồ vũ trụ.</p> ) : (
            <>
              {isWaitingForDzi && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h2 className="text-2xl font-bold text-blue-400 animate-pulse tracking-widest text-center">ĐANG TRUY XUẤT NASA MAST</h2>
                  <p className="text-slate-300 mt-4 text-xl text-center">Thời gian dự kiến còn lại: <span className="text-emerald-400 font-mono font-bold text-3xl ml-2">{timeLeft > 0 ? `${timeLeft}s` : 'Đang đồng bộ...'}</span></p>
                </div>
              )}
              
              {dziUrl && !isWaitingForDzi && (
                <>
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 w-64">
                    <h3 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">Xử lý hình ảnh & HD</h3>
                    <div className="mb-3"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ sáng</span><span>{filters.brightness}%</span></div><input type="range" min="50" max="200" value={filters.brightness} onChange={e => setFilters({...filters, brightness: parseInt(e.target.value)})} className="w-full accent-blue-500" /></div>
                    <div className="mb-3"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Tương phản</span><span>{filters.contrast}%</span></div><input type="range" min="50" max="200" value={filters.contrast} onChange={e => setFilters({...filters, contrast: parseInt(e.target.value)})} className="w-full accent-blue-500" /></div>
                    <div className="mb-5"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ bão hòa</span><span>{filters.saturate}%</span></div><input type="range" min="0" max="200" value={filters.saturate} onChange={e => setFilters({...filters, saturate: parseInt(e.target.value)})} className="w-full accent-blue-500" /></div>
                    <button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-900/50 mb-2">Tải ảnh chất lượng cao</button>
                    <button onClick={generateCitizenReport} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg mb-2">🖨️ Xuất Báo Cáo Khám Phá</button>
                    <button onClick={startTour} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-900/50">🚀 Bắt đầu Tham Quan</button>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 w-56">
                    <h3 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">Kính Lọc Đa Phổ</h3>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => setSpectrumMode('NIRCAM')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='NIRCAM' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>📷 Khả kiến (Hubble)</button>
                      <button onClick={() => setSpectrumMode('MIRI')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='MIRI' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🔥 Hồng ngoại (MIRI)</button>
                      <button onClick={() => setSpectrumMode('XRAY')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='XRAY' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>☢️ Tia X (Chandra)</button>
                    </div>
                  </div>
                </>
              )}

              <div id="osd-viewer" className={`absolute inset-0 w-full h-full ${interactionMode==='magnify' ? 'cursor-none' : ''}`} style={{ filter: getSpectrumFilters() }}></div>

              {/* Quiz Overlay */}
              {showQuiz && (
                <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-slate-900 border border-purple-500 p-8 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] max-w-lg w-full text-center">
                    <h2 className="text-3xl font-bold text-purple-400 mb-2">🚀 Thử Thách Không Gian</h2>
                    <p className="text-slate-400 mb-8">Câu hỏi {quizState.step + 1} / {(QUIZZES[searchQuery.toUpperCase()] || QUIZZES["DEFAULT"]).length}</p>
                    <h3 className="text-xl text-white mb-6 font-medium">{activeQuiz.q}</h3>
                    <div className="flex flex-col gap-3">
                      {activeQuiz.options.map((opt: string, i: number) => (
                        <button key={i} onClick={() => handleQuizAnswer(i)} className="bg-slate-800 hover:bg-purple-600 text-slate-200 py-3 px-6 rounded-xl transition-colors border border-slate-700 hover:border-purple-400">{opt}</button>
                      ))}
                    </div>
                    <button onClick={() => setShowQuiz(false)} className="mt-8 text-sm text-slate-500 hover:text-white underline">Bỏ qua thử thách</button>
                  </div>
                </div>
              )}

              {/* CSS 3D Radar/Globe */}
              {showRadar && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                  <div className="w-96 h-96 rounded-full border border-emerald-500/50 relative bg-black/80 shadow-[0_0_100px_rgba(16,185,129,0.3)] backdrop-blur-md overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/30 scale-75"></div>
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-50"></div>
                    <div className="absolute w-full h-[1px] bg-emerald-500/40"></div>
                    <div className="absolute h-full w-[1px] bg-emerald-500/40"></div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-emerald-400/0 to-emerald-400/80 origin-left animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_blue] -translate-x-1/2 -translate-y-1/2" title="Trái Đất (Quan sát viên)"></div>
                    <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red] animate-ping" title="Mục tiêu JWST"></div>
                    <div className="absolute bottom-4 text-emerald-400 font-mono text-xs text-center w-full">HỆ THỐNG ĐỊNH VỊ SAO TOÀN CẢNH<br/>Vĩ độ: 45.2° | Kinh độ: 12.8°</div>
                  </div>
                </div>
              )}
            </>
          )}

          {isExploring && (
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
              {controls.map((control, idx) => (
                <button key={idx} onClick={control.action} title={control.title} className={`w-11 h-11 bg-slate-800/80 hover:bg-slate-700 text-white rounded shadow-lg border border-slate-600 flex items-center justify-center text-xl transition-all ${['mark', 'select', 'measure', 'magnify'].includes(control.type) && interactionMode === control.type ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)]' : ''}`}>
                  {control.label}
                </button>
              ))}
            </div>
          )}
        </section>

        {isExploring && (
          <aside className="w-[400px] bg-slate-900 border-l border-slate-800 flex flex-col z-10 shadow-2xl relative">
            <div className="p-4 border-b border-slate-800 font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Trợ lý Gemini AI
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col gap-4 mt-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                    <div className={`p-3 rounded-lg text-sm border max-w-full overflow-x-auto ${msg.role === 'ai' ? 'bg-slate-800/50 text-slate-300 border-slate-700' : 'bg-blue-600/30 text-blue-100 border-blue-500/50'}`}>
                      {msg.role === 'ai' ? (
                        <ReactMarkdown 
                          components={{
                            code(props) {
                              const {children, className, node, ...rest} = props;
                              const match = /language-(\w+)/.exec(className || '');
                              return match ? (
                                <div className="relative group/code mt-2 mb-2 rounded overflow-hidden">
                                  <div className="flex justify-between items-center bg-slate-800 px-3 py-1 border-b border-slate-700 text-xs text-slate-400"><span>{match[1]}</span><div className="flex gap-2"><button onClick={() => handleChatSubmit(`Hãy giải thích kỹ hơn về đoạn code ${match[1]} này.`)} className="hover:text-emerald-400 transition-colors">Giải thích</button><button onClick={() => handleCopyText(String(children))} className="hover:text-blue-400 transition-colors">Copy</button></div></div>
                                  <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0 0 0.25rem 0.25rem' }} />
                                </div>
                              ) : ( <code {...rest} className="bg-slate-700 px-1 py-0.5 rounded text-emerald-300">{children}</code> );
                            }
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : ( <div className="whitespace-pre-wrap">{msg.text}</div> )}
                    </div>
                    {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && (
                      <div className="flex gap-2 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => speakText(msg.text)} className={`text-xs text-slate-500 hover:text-yellow-400 bg-slate-800 px-2 py-1 rounded ${isSpeaking ? 'text-yellow-400 animate-pulse' : ''}`}>🔊 {isSpeaking ? 'Đang đọc...' : 'Đọc'}</button>
                        <button onClick={() => handleCopyText(msg.text)} className="text-xs text-slate-500 hover:text-blue-400 bg-slate-800 px-2 py-1 rounded">📋 Copy</button>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="p-3 border-t border-slate-800 bg-slate-950 flex flex-col gap-2">
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {PROMPT_TEMPLATES.map((pt, i) => ( <button key={i} onClick={() => setChatInput(pt)} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-300 transition-colors">✨ {pt}</button> ))}
              </div>
              {selectedFile && (
                <div className="flex items-center justify-between bg-blue-900/30 border border-blue-500/50 px-3 py-1.5 rounded text-xs text-blue-200"><span className="truncate max-w-[200px]">📎 {selectedFile.name}</span><button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="hover:text-red-400">✕</button></div>
              )}
              <div className="flex items-center gap-2">
                <button onClick={startListening} className={`p-2 rounded transition-colors ${isListening ? 'text-red-400 bg-red-900/30 animate-pulse' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'}`} title="Nhập bằng giọng nói (Web Speech)">🎙️</button>
                <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors" title="Đính kèm tài liệu">📎</button>
                <input type="text" placeholder="Nhập câu hỏi hoặc chọn file..." className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm focus:outline-none focus:border-emerald-500 text-white" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleChatSubmit(); }} />
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;