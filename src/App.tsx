import { getGeminiResponse } from './aiService';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatSession, InteractionMode, SpectrumMode, POPULAR_TARGETS, PROMPT_TEMPLATES, MOCK_TOURS } from './data';
import { SpaceNewsTicker } from './components/SpaceNewsTicker';
import { Radar3D } from './components/Radar3D';
import { QuizOverlay } from './components/QuizOverlay';
import { SpectrumPanel } from './components/SpectrumPanel';
import { VRGallery } from './components/VRGallery';
import { StellariumSky } from './components/StellariumSky';
import { BottomDock } from './components/layout/BottomDock';
import { FloatingPanel } from './components/layout/FloatingPanel';
import { TopHUD } from './components/layout/TopHUD';
import { LeftHUD } from './components/layout/LeftHUD';
import { RightHUD } from './components/layout/RightHUD';


function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);

  // Session & UI Management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [showSessionSidebar, setShowSessionSidebar] = useState<boolean>(false);
  const [showAiSidebar, setShowAiSidebar] = useState<boolean>(false);

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
  const [timeMachineYear, setTimeMachineYear] = useState<number>(2026);
  const [isCockpitMode, setIsCockpitMode] = useState<boolean>(false);
  const mousePosRef = useRef({x: window.innerWidth/2, y: window.innerHeight/2});
  const blackholeRef = useRef<HTMLDivElement>(null);
  // Suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Feature States
  const [showQuiz, setShowQuiz] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [showRadar, setShowRadar] = useState(false);

  // HUD & Layer States
  const [activeLayer, setActiveLayer] = useState<'stellarium' | 'deepsky' | 'vrgallery'>('stellarium');
  const [leftPanelOpen, setLeftPanelOpen] = useState<boolean>(true);
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);
  const [bottomDockOpen, setBottomDockOpen] = useState<boolean>(true);

  // Data Sonification State
  const [isSonifying, setIsSonifying] = useState(false);
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
  // This will be replacing the current return statement in App.tsx

  const dockItems = [
    {
      id: 'stellarium',
      label: 'Kính Stellarium',
      icon: '🌌',
      isActive: activeLayer === 'stellarium',
      onClick: () => setActiveLayer('stellarium')
    },
    {
      id: 'deepsky',
      label: 'Kính JWST (Deep Sky)',
      icon: '🔭',
      isActive: activeLayer === 'deepsky',
      onClick: () => setActiveLayer('deepsky')
    },
    {
      id: 'vrgallery',
      label: 'Triển Lãm VR',
      icon: '🏛️',
      isActive: activeLayer === 'vrgallery',
      onClick: () => setActiveLayer('vrgallery')
    },
    {
      id: 'radar',
      label: 'Radar 3D',
      icon: '🌐',
      isActive: activeLayer === 'radar',
      onClick: () => setActiveLayer('radar')
    }
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      
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
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-blue-400 animate-pulse tracking-widest text-center">ĐANG TRUY XUẤT NASA MAST</h2>
                <p className="text-slate-300 mt-4 text-xl text-center">Thời gian dự kiến còn lại: <span className="text-emerald-400 font-mono font-bold text-3xl ml-2">{timeLeft > 0 ? `${timeLeft}s` : 'Đang đồng bộ...'}</span></p>
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
            
            <SpaceNewsTicker />
          </div>
        )}

        {activeLayer === 'vrgallery' && <VRGallery onClose={() => setActiveLayer('stellarium')} speakText={speakText} />}
        {activeLayer === 'radar' && <div className="absolute inset-0 bg-slate-900"><Radar3D /></div>}
      </div>

      {/* Top HUD - Search Bar */}
      <TopHUD 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearchSubmit}
        suggestions={filteredSuggestions}
        showSuggestions={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }}
      />

      {/* Bottom HUD - Apple Dock Style */}
      {bottomDockOpen && <BottomDock items={dockItems} />}

      {/* Left Floating Panel - Tools & Controls */}
      <FloatingPanel 
        position="left" 
        isOpen={leftPanelOpen} 
        title="Bảng Tùy Chỉnh (Tools)"
      >
        <LeftHUD 
          activeLayer={activeLayer}
          dziUrl={dziUrl}
          filters={filters}
          setFilters={setFilters}
          handleDownload={handleDownload}
          isSonifying={isSonifying}
          toggleSonification={toggleSonification}
          generateCitizenReport={generateCitizenReport}
          spectrumMode={spectrumMode}
          setSpectrumMode={setSpectrumMode}
          timeMachineYear={timeMachineYear}
          setTimeMachineYear={setTimeMachineYear}
          controls={controls}
          interactionMode={interactionMode}
          isCockpitMode={isCockpitMode}
          setShowQuiz={setShowQuiz}
          badges={badges}
        />
      </FloatingPanel>

      {/* Right Floating Panel - AI Assistant */}
      <FloatingPanel 
        position="right" 
        isOpen={rightPanelOpen} 
        title="Trợ lý Gemini AI"
        width="w-80 md:w-96"
      >
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
          chatInput={chatInput}
          setChatInput={setChatInput}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setFileContent={setFileContent}
          fileInputRef={fileInputRef}
          startListening={startListening}
          isListening={isListening}
          handleFileChange={handleFileChange}
        />
      </FloatingPanel>

      {/* HUD Toggle Controls */}
      <div className="absolute bottom-6 left-6 z-50 flex gap-2">
        <button 
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors ${leftPanelOpen ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white'}`}
          title="Tắt/Bật bảng trái"
        >
          🛠️
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-50 flex gap-2">
        <button 
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors ${rightPanelOpen ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white'}`}
          title="Tắt/Bật Trợ lý AI"
        >
          🤖
        </button>
      </div>
      
    </div>
  );
}

export default App;
