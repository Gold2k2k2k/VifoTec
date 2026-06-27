import { getGeminiResponse } from './aiService';
import React, { useState, useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import { ChatSession, InteractionMode, SpectrumMode, POPULAR_TARGETS, PROMPT_TEMPLATES, MOCK_TOURS } from './data';
import { SpaceNewsTicker } from './components/SpaceNewsTicker';
const Radar3D = React.lazy(() => import('./components/Radar3D').then(m => ({ default: m.Radar3D })));
const VRGallery = React.lazy(() => import('./components/VRGallery').then(m => ({ default: m.VRGallery })));
import { QuizOverlay } from './components/QuizOverlay';
import { StellariumSky } from './components/StellariumSky';
import {
  IconStar, IconTelescope, IconGallery, IconRadar, IconSearch,
  IconPlus, IconMinus, IconPin, IconSelect, IconRuler,
  IconMagnify, IconBlackhole, IconRocket, IconExpand,
  IconPanel, IconBrain, IconTour
} from './components/Icons';

// HUD Components
import { TopHUD } from './components/layout/TopHUD';
import { BottomDock } from './components/layout/BottomDock';
import { FloatingPanel } from './components/layout/FloatingPanel';
import { LeftHUD } from './components/layout/LeftHUD';
import { RightHUD } from './components/layout/RightHUD';
import { SettingsToggle } from './components/layout/SettingsToggle';
import { useLayout } from './context/LayoutContext';
import { useViewer } from './context/ViewerContext';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [currentTarget, setCurrentTarget] = useState<string>('DEFAULT');
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);

  // Session & UI Management (UI Managed by LayoutContext)
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const { leftPanelOpen, rightPanelOpen, bottomDockOpen, setLeftPanelOpen, setRightPanelOpen, setBottomDockOpen } = useLayout();

  // File Upload QA & Voice
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Viewer State
  const [dziUrl, setDziUrl] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const { interactionMode, setInteractionMode, spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear, isSonifying, setIsSonifying } = useViewer();
  const interactionModeRef = useRef(interactionMode);
  const [isWaitingForDzi, setIsWaitingForDzi] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180); 
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturate: 100 });
  const reticleCoordsRef = useRef<HTMLDivElement>(null);
  const [isCockpitMode, setIsCockpitMode] = useState<boolean>(false);
  const mousePosRef = useRef({x: window.innerWidth/2, y: window.innerHeight/2});
  const blackholeRef = useRef<HTMLDivElement>(null);
  // Feature States
  const [showQuiz, setShowQuiz] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [activeLayer, setActiveLayer] = useState<string>('deepsky');

  // Landing Page Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      setFilteredSuggestions(POPULAR_TARGETS.filter(t => t.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    executeSearch(suggestion);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  // Data Sonification State (Managed by ViewerContext)
  const scannerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const getSpectrumFilters = () => {
    let base = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`;
    if (spectrumMode === 'MIRI') base += ` hue-rotate(90deg) contrast(150%)`;
    if (spectrumMode === 'XRAY') base += ` invert(1) hue-rotate(180deg) saturate(200%)`;
    if (timeMachineYear < 2026) {
       const diff = 2026 - timeMachineYear;
       base += ` blur(${diff * 0.15}px) sepia(${diff * 1.5}%) contrast(${100 - diff}%)`;
    }
    return base;
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    const savedBadges = localStorage.getItem('jwst_badges');
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  // Audio Sonification Loop
  useEffect(() => {
    let animationFrameId: number;
    let next = 0;
    const playScan = () => {
       if (!isSonifying || !audioCtxRef.current || !oscRef.current || !gainRef.current) return;
       
       next = next + 0.2;
       if (next >= 100) next = 0;
       
       if (scannerRef.current) scannerRef.current.style.left = `${next}%`;
       
       const noise = Math.sin(next * 12) + Math.cos(next * 4);
       let brightness = (Math.sin(next * 0.1) + 1) / 2;
       if (noise > 1.6) brightness = 1.0;
       
       const freq = 100 + (brightness * 1000);
       const vol = brightness * 0.4;

       oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.1);
       gainRef.current.gain.setTargetAtTime(vol, audioCtxRef.current.currentTime, 0.1);
       
       animationFrameId = requestAnimationFrame(playScan);
    };

    if (isSonifying) animationFrameId = requestAnimationFrame(playScan);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSonifying]);

  const toggleSonification = () => {
    if (isSonifying) {
      setIsSonifying(false);
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
      if (scannerRef.current) scannerRef.current.style.left = '0%';
      return;
    }
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 200;
    gain.gain.value = 0;

    osc.connect(gain); gain.connect(ctx.destination); osc.start();
    oscRef.current = osc; gainRef.current = gain;
    setIsSonifying(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem('jwst_chat_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) { setCurrentSessionId(parsed[0].id); setMessages(parsed[0].messages); }
    } else handleNewSession();
  }, []);

  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      setSessions(prev => {
        const updated = prev.map(s => s.id === currentSessionId ? { ...s, messages, title: s.title === 'Phiên khám phá mới' ? (messages[0]?.text.slice(0, 25) + '...') : s.title } : s);
        if (!updated.some(s => s.id === currentSessionId)) updated.unshift({ id: currentSessionId, title: messages[0]?.text.slice(0, 25) + '...', messages });
        localStorage.setItem('jwst_chat_sessions', JSON.stringify(updated)); return updated;
      });
    }
  }, [messages, currentSessionId]);

  const handleNewSession = () => {
    const newId = Date.now().toString();
    setSessions(prev => [{ id: newId, title: 'Phiên khám phá mới', messages: [] }, ...prev]);
    setCurrentSessionId(newId); setMessages([]);
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
        viewer.panHorizontal = isNone; viewer.panVertical = isNone; viewer.zoomPerClick = isNone ? 2.0 : 1.0;
        
        const overlay = document.getElementById('magnify-overlay');
        if (overlay) overlay.style.display = (interactionMode === 'magnify') ? 'block' : 'none';
    }
  }, [interactionMode]);





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
        id: 'osd-viewer', prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: dziUrl, showNavigator: true, navigatorPosition: 'BOTTOM_RIGHT', showNavigationControl: false, crossOriginPolicy: "Anonymous", 
      });

      viewer.addHandler('open', () => {
         const nav = document.querySelector('.navigator') as HTMLElement;
         if (nav) { nav.style.border = '2px solid #3b82f6'; nav.style.borderRadius = '8px'; nav.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)'; }
      });

      viewer.addHandler('animation', () => {
         if (reticleCoordsRef.current && osdViewerRef.current) {
            const centerPoint = osdViewerRef.current.viewport.getCenter();
            reticleCoordsRef.current.innerText = `RA: ${centerPoint.x.toFixed(4)} | DEC: ${centerPoint.y.toFixed(4)}`;
         }
      });

      osdViewerRef.current = viewer;

      let dragStartPoint: OpenSeadragon.Point | null = null;
      let selectionOverlayElement: HTMLDivElement | null = null;

      const magnifyEl = document.createElement("div");
      magnifyEl.id = 'magnify-overlay';
      magnifyEl.className = "hidden absolute pointer-events-none rounded-full border-4 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center text-center p-2 transition-transform";
      magnifyEl.style.width = '180px'; magnifyEl.style.height = '180px'; magnifyEl.style.transform = 'translate(-50%, -50%)'; magnifyEl.style.zIndex = '50';
      document.getElementById('osd-viewer')?.appendChild(magnifyEl);

      new OpenSeadragon.MouseTracker({
        element: viewer.canvas,
        moveHandler: (event) => {
           if (interactionModeRef.current === 'magnify' && osdViewerRef.current) {
              const currentPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              magnifyEl.style.left = `${event.position.x}px`; magnifyEl.style.top = `${event.position.y}px`;
              const pseudoColor = (Math.sin(currentPoint.x * 20) + Math.cos(currentPoint.y * 20)) / 2;
              let material = "Bụi Carbon (Lạnh)"; let color = "text-slate-300";
              if (pseudoColor > 0.5) { material = "Khí Hydro Ion Hóa"; color = "text-red-400"; }
              else if (pseudoColor < -0.3) { material = "Khí Oxy & Lưu Huỳnh"; color = "text-blue-400"; }
              
              magnifyEl.innerHTML = `
                <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Quang Phổ</span>
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
                const x = Math.min(dragStartPoint.x, currentPoint.x); const y = Math.min(dragStartPoint.y, currentPoint.y);
                const width = Math.abs(currentPoint.x - dragStartPoint.x); const height = Math.abs(currentPoint.y - dragStartPoint.y);
                osdViewerRef.current.updateOverlay(selectionOverlayElement, new OpenSeadragon.Rect(x, y, width, height));
              } else if (mode === 'measure') {
                const dx = currentPoint.x - dragStartPoint.x; const dy = currentPoint.y - dragStartPoint.y;
                const distViewport = Math.sqrt(dx*dx + dy*dy); 
                let scale = 100000; if (currentTarget.toUpperCase().includes('M101')) scale = 170000;
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
    const tourData = MOCK_TOURS[currentTarget.toUpperCase()] || MOCK_TOURS["DEFAULT"];
    for (const point of tourData) {
       if (!osdViewerRef.current) break;
       osdViewerRef.current.viewport.panTo(new OpenSeadragon.Point(point.x, point.y));
       osdViewerRef.current.viewport.zoomTo(point.zoom);
       setMessages(prev => [...prev, {role: 'ai', text: `🛸 **Tour Guide:** ${point.text}`}]);
       speakText(point.text);
       await new Promise(r => setTimeout(r, 6000));
    }
  };

  const executeSearch = async (queryToSearch: string) => {
    if (queryToSearch.trim() === '') return;
    const formattedQuery = queryToSearch.trim().toUpperCase().replace(/\s+/g, '_');
    setCurrentTarget(queryToSearch.trim());

    setInteractionMode('none'); setFilters({ brightness: 100, contrast: 100, saturate: 100 }); setSpectrumMode('NIRCAM');
    if (osdViewerRef.current) osdViewerRef.current.clearOverlays();
    
    if (isSonifying) toggleSonification();

    const cleanApiUrl = "https://gbachnguyen-jwst-backend-processor.hf.space";
    if (dziUrl) { try { fetch(`${cleanApiUrl}/api/v1/cleanup/`, { method: 'DELETE' }); } catch (err) { } }

    setIsExploring(true); setDziUrl(''); setIsWaitingForDzi(false); setTimeLeft(180);

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


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { setSelectedFile(file); setFileContent(await file.text()); } };

  const handleChatSubmit = async (overrideText?: string) => {
    const submitText = overrideText || '';
    if (submitText !== '' || fileContent !== '') {
      let textToSend = submitText;
      if (fileContent) textToSend += `\n\n--- Dữ liệu đính kèm từ file ${selectedFile?.name} ---\n${fileContent}`;
      setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
      setSelectedFile(null); setFileContent(''); if (fileInputRef.current) fileInputRef.current.value = '';
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

  const generateCitizenReport = () => {
     let md = `# BÁO CÁO KHÁM PHÁ VŨ TRỤ (CITIZEN SCIENCE)\n\n`;
     md += `**Mục tiêu quan sát:** ${currentTarget.toUpperCase() || 'Không xác định'}\n`;
     md += `**Ngày thực hiện:** ${new Date().toLocaleString('vi-VN')}\n\n`;
     md += `## Lịch sử Phân tích AI\n`;
     messages.filter(m => !m.text.includes('Đang thiết lập lại tọa độ')).forEach(m => { md += `**[${m.role === 'user' ? 'Nhà nghiên cứu' : 'Trợ lý JWST-AI'}]**: ${m.text}\n\n`; });
     md += `## Chú thích tọa độ\n*Các vùng sáng và tọa độ đã được đánh dấu trực tiếp trên ứng dụng.*\n`;
     const blob = new Blob([md], { type: 'text/markdown' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a'); link.href = url; link.download = `JWST_BaoCao_${Date.now()}.md`; link.click(); URL.revokeObjectURL(url);
     speakText("Đã trích xuất báo cáo thành công.");
  };

  const playShutterSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { console.warn('AudioContext not supported'); }
  };

  const handleDownload = () => {
    const flash = document.createElement('div');
    flash.className = "fixed inset-0 bg-white z-[9999] pointer-events-none transition-opacity duration-500 opacity-100";
    document.body.appendChild(flash);
    playShutterSound();
    setTimeout(() => { flash.style.opacity = '0'; }, 50);
    setTimeout(() => { document.body.removeChild(flash); }, 550);

    const canvas = document.querySelector('#osd-viewer canvas') as HTMLCanvasElement;
    if (canvas) {
      try {
        const tempCanvas = document.createElement('canvas'); tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) { 
          ctx.filter = getSpectrumFilters(); 
          ctx.drawImage(canvas, 0, 0); 
          
          ctx.filter = 'none';
          ctx.fillStyle = 'black';
          ctx.fillRect(0, canvas.height - 120, canvas.width, 120);
          
          ctx.fillStyle = 'white';
          ctx.font = 'bold 32px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`JWST | ${currentTarget ? currentTarget.toUpperCase() : 'DEEP FIELD UNKNOWN'}`, 30, canvas.height - 70);
          
          ctx.fillStyle = '#a7f3d0';
          ctx.font = '18px monospace';
          ctx.fillText(`VIFOTEC 2026 SPACE EXPLORER PROJECT`, 30, canvas.height - 35);
          
          ctx.fillStyle = 'white';
          ctx.textAlign = 'right';
          ctx.font = '18px monospace';
          ctx.fillText(`INSTRUMENT: NIRCam / MIRI`, canvas.width - 30, canvas.height - 75);
          ctx.fillText(`FILTER: ${spectrumMode.toUpperCase()} | ERA: ${timeMachineYear}`, canvas.width - 30, canvas.height - 50);
          
          const centerPoint = osdViewerRef.current?.viewport.getCenter();
          ctx.fillStyle = '#f87171';
          ctx.fillText(`RA: ${(centerPoint?.x || 0).toFixed(6)} | DEC: ${(centerPoint?.y || 0).toFixed(6)}`, canvas.width - 30, canvas.height - 25);
          
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(canvas.width - 350, canvas.height - 80);
          ctx.lineTo(canvas.width - 350, canvas.height - 40);
          ctx.lineTo(canvas.width - 320, canvas.height - 40);
          ctx.stroke();
          
          const link = document.createElement('a'); link.download = `jwst_${currentTarget}_${spectrumMode}_${Date.now()}.png`; link.href = tempCanvas.toDataURL('image/png', 1.0); link.click(); 
        }
      } catch (err) { alert("Lỗi xuất ảnh: Không thể tải ảnh do giới hạn bảo mật CORS."); }
    }
  };

  const handleCopyText = (text: string) => { navigator.clipboard.writeText(text); alert("Đã sao chép vào bộ nhớ tạm!"); };

  const controls = [
    { icon: <IconPlus size={16} />, action: handleZoomIn, title: "Zoom In", type: "zoomIn" },
    { icon: <IconMinus size={16} />, action: handleZoomOut, title: "Zoom Out", type: "zoomOut" },
    { icon: <IconPin size={16} />, action: () => setInteractionMode(interactionMode === 'mark' ? 'none' : 'mark'), title: "Pin Location", type: "mark" },
    { icon: <IconSelect size={16} />, action: () => setInteractionMode(interactionMode === 'select' ? 'none' : 'select'), title: "Select Region", type: "select" },
    { icon: <IconRuler size={16} />, action: () => setInteractionMode(interactionMode === 'measure' ? 'none' : 'measure'), title: "Measure Distance", type: "measure" },
    { icon: <IconMagnify size={16} />, action: () => setInteractionMode(interactionMode === 'magnify' ? 'none' : 'magnify'), title: "Spectrum Analyzer", type: "magnify" },
    { icon: <IconBlackhole size={16} />, action: () => setInteractionMode(interactionMode === 'blackhole' ? 'none' : 'blackhole'), title: "Gravitational Lensing", type: "blackhole" },
    { icon: <IconRocket size={16} />, action: () => setIsCockpitMode(!isCockpitMode), title: "Cockpit Mode", type: "cockpit" },
    { icon: <IconExpand size={16} />, action: handleToggleFullScreen, title: "Fullscreen", type: "fullScreen" },
  ];

  const dockItems = [
    { id: 'stellarium', label: 'Stellarium Sky', icon: <IconStar size={20} />, isActive: activeLayer === 'stellarium', onClick: () => setActiveLayer('stellarium') },
    { id: 'deepsky', label: 'JWST Deep Sky', icon: <IconTelescope size={20} />, isActive: activeLayer === 'deepsky', onClick: () => setActiveLayer('deepsky') },
    { id: 'vrgallery', label: 'VR Gallery', icon: <IconGallery size={20} />, isActive: activeLayer === 'vrgallery', onClick: () => setActiveLayer('vrgallery') },
    { id: 'radar', label: 'Radar 3D', icon: <IconRadar size={20} />, isActive: activeLayer === 'radar', onClick: () => setActiveLayer('radar') }
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
      <SettingsToggle />
      {/* Landing Page (Premium Glassmorphism) */}
      {!isExploring && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-deep-space">
          {/* Premium ambient light effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6">
            
            {/* Minimalist Centerpiece */}
            <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-white/10 rounded-full"></div>
              <div className="absolute inset-4 border border-white/5 rounded-full"></div>
              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl backdrop-blur-3xl"></div>
              <IconTelescope size={32} className="text-white/80 z-10 drop-shadow-lg" />
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-3 mb-8 glass-pill px-5 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
              <span className="text-[10px] text-white/80 tracking-[0.25em] uppercase font-medium" style={{ fontFamily: 'var(--font-body)' }}>{t('system_ready')}</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-4 text-center text-gradient" style={{ fontFamily: 'var(--font-heading)' }}>
              JWST EXPLORER
            </h1>
            <p className="text-white/40 text-xs md:text-sm tracking-[0.4em] mb-16 text-center uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              NASA MAST Observatory
            </p>

            {/* Magnetic Search Pill */}
            <div className="relative w-full max-w-2xl group" ref={searchContainerRef}>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center glass-pill px-8 py-5 hover:bg-white/[0.08] focus-within:bg-white/[0.08] focus-within:border-white/20 transition-all duration-500">
                <IconSearch size={20} className="text-white/30 mr-4" />
                <input 
                  type="text" 
                  className="w-full bg-transparent outline-none text-white/90 font-mono text-base tracking-widest placeholder-white/20"
                  placeholder={t('search_placeholder')} 
                  value={searchQuery} 
                  onChange={handleInputChange} 
                  onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }} 
                />
                <button type="submit" className="ml-4 px-6 py-2.5 bg-white/10 text-white/90 font-mono text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/5">
                  {t('scan')}
                </button>
              </form>
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-4 glass-panel border-white/10 z-50 overflow-hidden">
                  <ul className="max-h-60 overflow-y-auto custom-scrollbar py-2" style={{ fontFamily: 'var(--font-mono)' }}>
                    {filteredSuggestions.map((suggestion, idx) => ( 
                      <li key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-6 py-4 hover:bg-white/5 cursor-pointer text-white/70 hover:text-white transition-colors flex items-center gap-6 text-sm border-b border-white/5 last:border-0 uppercase tracking-widest">
                        <span className="text-white/20 text-[10px] w-6">{(idx + 1).toString().padStart(2, '0')}</span> {suggestion}
                      </li> 
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Skip to explorer */}
            <button onClick={() => setIsExploring(true)} className="mt-20 text-white/30 hover:text-white/80 transition-all duration-500 flex items-center gap-3 group">
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono">{t('skip_startup')}</span>
            </button>
          </div>
          
          {/* Minimal Footer */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="text-left text-[10px] text-white/20 tracking-[0.2em] uppercase">
              <span>VIFOTEC 2026</span>
            </div>
            <div className="text-right text-[10px] text-white/20 tracking-[0.2em] uppercase">
              <span>{t('powered_by')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main HUD App */}
      {isExploring && (
        <>
          {/* Background Layers */}
          <div className="absolute inset-0 z-0">
            <StellariumSky 
              isVisible={activeLayer === 'stellarium'}
              onClose={() => setActiveLayer('deepsky')} 
              onSelectObject={async (name, type, details) => {
                const userText = `Tôi muốn phân tích thiên thể ${name} (${type}). Chi tiết tọa độ: ${details}`;
                setMessages(prev => [...prev, { role: 'user', text: userText }]);
                setMessages(prev => [...prev, { role: 'ai', text: 'Đang kết nối vệ tinh và phân tích dữ liệu...' }]);
                setRightPanelOpen(true);
                try {
                  const reply = await getGeminiResponse(`Người dùng đang xem thiên thể "${name}" (${type}) trên Kính thiên văn Stellarium Web với dữ liệu tọa độ: "${details}". Hãy cung cấp thông tin khoa học chuyên sâu, lịch sử phát hiện và ý nghĩa văn hóa dân gian (đặc biệt là mối liên hệ với văn hóa Việt Nam hoặc phương Đông nếu có) về thiên thể này.`, messages);
                  setMessages(prev => { const newMsgs = [...prev]; newMsgs[newMsgs.length - 1] = { role: 'ai', text: reply }; return newMsgs; });
                } catch (err) {
                  setMessages(prev => { const newMsgs = [...prev]; newMsgs[newMsgs.length - 1] = { role: 'ai', text: '⚠️ Lỗi: Không thể kết nối với lõi xử lý AI.' }; return newMsgs; });
                }
              }}
            />

            {activeLayer === 'deepsky' && (
              <div className="absolute inset-0 bg-black flex flex-col" onMouseMove={(e) => { 
                mousePosRef.current = {x: e.clientX, y: e.clientY}; 
                if (interactionModeRef.current === 'blackhole' && blackholeRef.current) {
                    blackholeRef.current.style.left = e.clientX + 'px';
                    blackholeRef.current.style.top = e.clientY + 'px';
                }
              }}>
                {!dziUrl && !isWaitingForDzi && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-slate-500 italic text-lg text-center px-4">Hãy sử dụng thanh tìm kiếm phía trên để nạp bản đồ ảnh Deep Zoom (JWST/Hubble).</p>
                  </div>
                )}
                
                {isWaitingForDzi && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0B0B10]/90 backdrop-blur-md">
                    <div className="scanline-overlay"></div>
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(0,255,255,0.5)]"></div>
                    <h2 className="text-2xl font-bold text-cyan-400 tracking-widest text-center glitch" style={{ fontFamily: 'var(--font-heading)' }}>ĐANG TRUY XUẤT NASA MAST</h2>
                    <p className="text-slate-300 mt-4 text-sm text-center" style={{ fontFamily: 'var(--font-mono)' }}>THỜI GIAN DỰ KIẾN CÒN LẠI: <span className="text-emerald-400 font-bold text-xl ml-2">{timeLeft > 0 ? `${timeLeft}s` : 'ĐANG ĐỒNG BỘ...'}</span></p>
                    
                    {/* Fake progress bar */}
                    <div className="w-64 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
                      <div className="h-full bg-cyan-500 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: `${Math.min(100, Math.max(5, (180 - timeLeft) / 180 * 100))}%` }}></div>
                    </div>
                  </div>
                )}
                
                <div id="osd-viewer" className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${interactionMode==='magnify' ? 'cursor-none' : ''} ${isCockpitMode ? 'scale-110 perspective-[1000px] rotate-x-[5deg]' : ''}`} style={{ filter: getSpectrumFilters() }}></div>
                
                {isCockpitMode && (
                  <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] border-[40px] border-slate-900/90 rounded-[100px] overflow-hidden flex items-center justify-center">
                    <div className="absolute top-0 w-full h-8 bg-slate-800 border-b border-blue-500/30 flex justify-around items-center px-20">
                      <div className="text-[10px] text-blue-400 font-mono animate-pulse">WARP DRIVE ACTIVE</div>
                      <div className="text-[10px] text-red-400 font-mono">SHIELDS: 100%</div>
                    </div>
                    <div className="absolute bottom-0 w-1/3 h-24 bg-slate-800 border-t border-x rounded-t-[50px] border-slate-600 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex items-end justify-center pb-4 gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/50 shadow-[0_0_10px_red]"></div>
                      <div className="w-12 h-12 rounded-full bg-blue-600 border border-blue-400 shadow-[0_0_20px_blue] flex flex-col items-center justify-center"><span className="text-[8px]">AUTO</span></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/50 shadow-[0_0_10px_emerald]"></div>
                    </div>
                  </div>
                )}

                <div ref={blackholeRef} className={`fixed z-40 pointer-events-none rounded-full ${interactionMode === 'blackhole' ? 'block' : 'hidden'}`} style={{ width: '300px', height: '300px', transform: 'translate(-50%, -50%)', backdropFilter: 'blur(8px) contrast(200%) hue-rotate(180deg)', boxShadow: 'inset 0 0 100px black, 0 0 30px rgba(168, 85, 247, 0.5)', background: 'radial-gradient(circle, black 15%, transparent 60%)' }}></div>

                <div ref={scannerRef} className={`absolute top-0 bottom-0 w-[2px] bg-orange-500 shadow-[0_0_20px_5px_rgba(234,88,12,0.8)] z-30 pointer-events-none ${isSonifying ? 'block' : 'hidden'}`} style={{ left: '0%' }}>
                  <div className="absolute -left-16 w-32 h-full bg-gradient-to-r from-transparent to-orange-500/20"></div>
                </div>
                
                {/* Center Reticle (Signature) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center justify-center">
                  <div className="relative w-[150px] h-[150px] flex items-center justify-center animate-[spin_60s_linear_infinite]">
                    {/* Outer dashed ring */}
                    <svg className="absolute inset-0 w-full h-full text-cyan-500/30" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    {/* Crosshairs */}
                    <div className="absolute top-0 bottom-0 w-[1px] bg-cyan-500/50"></div>
                    <div className="absolute left-0 right-0 h-[1px] bg-cyan-500/50"></div>
                    <div className="w-2 h-2 border border-cyan-400"></div>
                  </div>
                  <div className="absolute top-[110%] flex flex-col items-center">
                    <div className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-heading)' }}>TARGET: {currentTarget || 'UNKNOWN'}</div>
                    <div ref={reticleCoordsRef} id="reticle-coords-text" className="text-emerald-400 text-[10px] whitespace-nowrap bg-slate-900/80 px-2 py-1 rounded-sm border border-slate-700/50 backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.1)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      RA: 0.0000 | DEC: 0.0000
                    </div>
                  </div>
                </div>

                <SpaceNewsTicker />
              </div>
            )}

            {activeLayer === 'vrgallery' && (
              <React.Suspense fallback={<div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-cyan-500 font-mono tracking-widest animate-pulse">INITIATING VR ENVIRONMENT...</div>}>
                <VRGallery onClose={() => setActiveLayer('stellarium')} speakText={speakText} />
              </React.Suspense>
            )}
            {activeLayer === 'radar' && (
              <React.Suspense fallback={<div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-cyan-500 font-mono tracking-widest animate-pulse">CONNECTING TO RADAR TELEMETRY...</div>}>
                <div className="absolute inset-0 bg-slate-900"><Radar3D /></div>
              </React.Suspense>
            )}
          </div>

          {/* Top HUD - Search Bar */}
          <TopHUD 
            executeSearch={executeSearch}
            activeLayer={activeLayer}
          />

          {/* Bottom HUD - View Switcher Dock */}
          {bottomDockOpen && <BottomDock items={dockItems} />}

          {/* Left HUD - Hologram Tools (No Floating Panel) */}
          <div className={`absolute left-6 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${leftPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <LeftHUD 
              activeLayer={activeLayer}
              dziUrl={dziUrl}
              filters={filters}
              setFilters={setFilters}
              handleDownload={handleDownload}
              toggleSonification={toggleSonification}
              generateCitizenReport={generateCitizenReport}
              controls={controls}
              isCockpitMode={isCockpitMode}
              setShowQuiz={setShowQuiz}
              badges={badges}
            />
          </div>

          {/* Right Floating Panel - AI Assistant */}
          <FloatingPanel position="right" isOpen={rightPanelOpen} title="Trợ lý Gemini AI" width="w-80 md:w-96">
            <RightHUD 
              handleNewSession={handleNewSession}
              sessions={sessions}
              currentSessionId={currentSessionId}
              handleSwitchSession={handleSwitchSession}
              messages={messages}
              messagesEndRef={messagesEndRef}
              handleChatSubmit={handleChatSubmit}
              handleCopyText={handleCopyText}
              speakText={speakText}
              isSpeaking={isSpeaking}
              PROMPT_TEMPLATES={PROMPT_TEMPLATES}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setFileContent={setFileContent}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />
          </FloatingPanel>

          {/* Panel Toggle Controls */}
          <div className="absolute bottom-20 left-3 z-50 flex flex-col gap-2">
            <button 
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              className={`btn-icon rounded-lg cursor-pointer ${leftPanelOpen ? 'active' : ''}`}
              title="Toggle Tools Panel"
              aria-label="Toggle tools panel"
            >
              <IconPanel size={16} />
            </button>
          </div>

          <div className="absolute bottom-20 right-3 z-50 flex flex-col gap-2">
            <button 
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`btn-icon rounded-lg cursor-pointer ${rightPanelOpen ? 'active' : ''}`}
              title="Toggle AI Assistant"
              aria-label="Toggle AI assistant"
            >
              <IconBrain size={16} />
            </button>
          </div>
          
          {/* Modals & Overlays */}
          {showQuiz && <QuizOverlay onClose={() => setShowQuiz(false)} onWin={(badge) => { const newBadges = [...badges, badge]; setBadges(newBadges); localStorage.setItem('jwst_badges', JSON.stringify(newBadges)); setShowQuiz(false); }} />}
        </>
      )}
    </div>
  );
}
export default App;
