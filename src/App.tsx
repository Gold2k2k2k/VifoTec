import { getGeminiResponse } from './aiService';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// BỘ TỪ ĐIỂN THIÊN VĂN THÔNG MINH
const POPULAR_TARGETS = [
  "M1 (Crab Nebula)", "M8 (Lagoon Nebula)", "M16 (Eagle Nebula / Pillars of Creation)", 
  "M31 (Andromeda Galaxy)", "M42 (Orion Nebula)", "M45 (Pleiades)", "M51 (Whirlpool Galaxy)", 
  "M57 (Ring Nebula)", "M87 (Virgo A)", "M101 (Pinwheel Galaxy)", "M104 (Sombrero Galaxy)",
  "Carina Nebula", "Tarantula Nebula", "Stephan's Quintet", "Cartwheel Galaxy", 
  "Southern Ring Nebula", "NGC 3324", "NGC 7320", "SMACS 0723", "Jupiter", "Saturn", "Neptune"
];

const PROMPT_TEMPLATES = [
  "Tóm tắt thông tin thành 3 ý chính",
  "Giải thích đoạn mã này cho người mới",
  "Phân tích dữ liệu FITS của vật thể này"
];

type ChatSession = { id: string; title: string; messages: {role: string, text: string}[] };

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);

  // Session Management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [showSessionSidebar, setShowSessionSidebar] = useState<boolean>(false);

  // File Upload QA
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dziUrl, setDziUrl] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);

  const [interactionMode, setInteractionMode] = useState<'none'|'mark'|'select'>('none');
  const interactionModeRef = useRef(interactionMode);
  
  const [isWaitingForDzi, setIsWaitingForDzi] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180); 
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturate: 100 });

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load Sessions
  useEffect(() => {
    const saved = localStorage.getItem('jwst_chat_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) {
        setCurrentSessionId(parsed[0].id);
        setMessages(parsed[0].messages);
      }
    } else {
      handleNewSession();
    }
  }, []);

  // Save Sessions
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      setSessions(prev => {
        const updated = prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages, title: s.title === 'Phiên khám phá mới' ? (messages[0]?.text.slice(0, 25) + '...') : s.title } 
            : s
        );
        // Nếu session chưa tồn tại thì thêm vào
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
    const newSession = { id: newId, title: 'Phiên khám phá mới', messages: [] };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages([]);
  };

  const handleSwitchSession = (id: string) => {
    const target = sessions.find(s => s.id === id);
    if (target) {
      setCurrentSessionId(id);
      setMessages(target.messages);
    }
  };

  // Sync mode with ref and handle panning lock
  useEffect(() => {
    interactionModeRef.current = interactionMode;
    if (osdViewerRef.current) {
        const viewer = osdViewerRef.current;
        const isNone = interactionMode === 'none';
        viewer.panHorizontal = isNone;
        viewer.panVertical = isNone;
        viewer.zoomPerClick = isNone ? 2.0 : 1.0;
    }
  }, [interactionMode]);

  // Hide suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const filtered = POPULAR_TARGETS.filter(target => 
        target.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const coreName = suggestion.split(" (")[0];
    setSearchQuery(coreName);
    setShowSuggestions(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWaitingForDzi) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWaitingForDzi]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isExploring && dziUrl) {
      if (osdViewerRef.current) {
        osdViewerRef.current.destroy();
      }

      const viewer = OpenSeadragon({
        id: 'osd-viewer',
        prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: dziUrl,
        showNavigator: true,
        navigatorPosition: 'BOTTOM_RIGHT',
        showNavigationControl: false,
        crossOriginPolicy: "Anonymous", 
      });

      osdViewerRef.current = viewer;

      let dragStartPoint: OpenSeadragon.Point | null = null;
      let selectionOverlayElement: HTMLDivElement | null = null;

      new OpenSeadragon.MouseTracker({
        element: viewer.canvas,
        pressHandler: (event) => {
           if (interactionModeRef.current === 'select' && osdViewerRef.current) {
              dragStartPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              selectionOverlayElement = document.createElement("div");
              selectionOverlayElement.className = "border-2 border-emerald-400 bg-emerald-500/20 pointer-events-none";
              osdViewerRef.current.addOverlay({
                  element: selectionOverlayElement,
                  location: new OpenSeadragon.Rect(dragStartPoint.x, dragStartPoint.y, 0, 0)
              });
           }
        },
        dragHandler: (event) => {
           if (interactionModeRef.current === 'select' && dragStartPoint && selectionOverlayElement && osdViewerRef.current) {
              const currentPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
              const x = Math.min(dragStartPoint.x, currentPoint.x);
              const y = Math.min(dragStartPoint.y, currentPoint.y);
              const width = Math.abs(currentPoint.x - dragStartPoint.x);
              const height = Math.abs(currentPoint.y - dragStartPoint.y);
              osdViewerRef.current.updateOverlay(selectionOverlayElement, new OpenSeadragon.Rect(x, y, width, height));
           }
        },
        releaseHandler: () => {
           if (interactionModeRef.current === 'select') {
               dragStartPoint = null;
               selectionOverlayElement = null;
           }
        },
        clickHandler: (event: any) => {
          if (interactionModeRef.current === 'mark' && osdViewerRef.current) {
            const viewportPoint = osdViewerRef.current.viewport.pointFromPixel(event.position);
            const markerElement = document.createElement("div");
            markerElement.className = "w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.8)] pointer-events-none animate-pulse";
            osdViewerRef.current.addOverlay({
                element: markerElement,
                location: viewportPoint,
                placement: OpenSeadragon.Placement.CENTER
            });
          }
        }
      });
    }

    return () => {
      if (osdViewerRef.current) {
        osdViewerRef.current.destroy();
      }
    };
  }, [isExploring, dziUrl]);

  const handleZoomIn = () => { osdViewerRef.current?.viewport.zoomBy(1.5); osdViewerRef.current?.viewport.applyConstraints(); };
  const handleZoomOut = () => { osdViewerRef.current?.viewport.zoomBy(0.66); osdViewerRef.current?.viewport.applyConstraints(); };
  const handleToggleFullScreen = () => { if (osdViewerRef.current) osdViewerRef.current.setFullScreen(!osdViewerRef.current.isFullPage()); };

  const executeSearch = async (queryToSearch: string) => {
    if (queryToSearch.trim() === '') return;

    setShowSuggestions(false); 
    const formattedQuery = queryToSearch.trim().toUpperCase().replace(/\s+/g, '_');

    setInteractionMode('none');
    setFilters({ brightness: 100, contrast: 100, saturate: 100 });
    
    if (osdViewerRef.current) {
      osdViewerRef.current.clearOverlays();
    }

    const cleanApiUrl = "https://gbachnguyen-jwst-backend-processor.hf.space";

    if (dziUrl) {
       try { fetch(`${cleanApiUrl}/api/v1/cleanup/`, { method: 'DELETE' }); } catch (err) { }
    }

    setIsExploring(true);
    setDziUrl('');
    setIsWaitingForDzi(false);
    setTimeLeft(180);

    const introMsg = {
      role: 'ai',
      text: `Đang thiết lập lại tọa độ. Khởi động quy trình quét dữ liệu cho mục tiêu mới: **${queryToSearch}**...`
    };
    
    if (messages.length === 0) {
       setMessages([introMsg]);
    } else {
       handleNewSession();
       setTimeout(() => setMessages([introMsg]), 100);
    }

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
                    const noCacheUrl = `${fullDziUrl}?t=${new Date().getTime()}`;
                    const statusRes = await fetch(noCacheUrl, { method: 'HEAD', cache: 'no-store' });
                    
                    if (statusRes.ok) {
                        clearInterval(checkInterval);
                        setIsWaitingForDzi(false);
                        setMessages(prev => [...prev, { role: 'ai', text: `✨ **Xử lý hoàn tất!** Bản đồ của **${queryToSearch}** đã sẵn sàng hiển thị.` }]);
                        setDziUrl(fullDziUrl);
                    }
                } catch (err) { }
            }, 3000);

            setTimeout(() => {
                clearInterval(checkInterval);
                setIsWaitingForDzi(false);
            }, 300000);
        }
      } else {
        setIsWaitingForDzi(false);
      }
    } catch (error) {
      setIsWaitingForDzi(false);
      setMessages(prev => [...prev, { role: 'ai', text: 'Lỗi: Không thể kết nối tới máy chủ lõi. Vui lòng kiểm tra lại Backend.' }]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  // Handle File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const text = await file.text();
      setFileContent(text);
    }
  };

  const handleChatSubmit = async (overrideText?: string) => {
    const submitText = overrideText || chatInput.trim();
    if (submitText !== '' || fileContent !== '') {
      
      let textToSend = submitText;
      if (fileContent) {
        textToSend += `\n\n--- Dữ liệu đính kèm từ file ${selectedFile?.name} ---\n${fileContent}`;
      }

      setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
      setChatInput('');
      setSelectedFile(null);
      setFileContent('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      setMessages(prev => [...prev, { role: 'ai', text: 'Đang phân tích dữ liệu...' }]);

      try {
        const currentHistory = messages.filter(m => m.text !== 'Đang phân tích dữ liệu...');
        const aiReply = await getGeminiResponse(textToSend, currentHistory);
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'ai', text: aiReply };
          return newMessages;
        });
      } catch (err) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'ai', text: '⚠️ Lỗi: Cảm biến AI đang nhiễu sóng hoặc API Key không hợp lệ. Vui lòng thử lại!' };
          return newMessages;
        });
      }
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#osd-viewer canvas') as HTMLCanvasElement;
    if (canvas) {
      try {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)`;
          ctx.drawImage(canvas, 0, 0);
          const link = document.createElement('a');
          link.download = `jwst_${searchQuery}_${Date.now()}.png`;
          link.href = tempCanvas.toDataURL('image/png', 1.0);
          link.click();
        }
      } catch (err) {
        alert("Lỗi xuất ảnh: Không thể tải ảnh do giới hạn bảo mật CORS từ máy chủ chứa ảnh gốc.");
      }
    }
  };

  // Export to Notion / Markdown
  const handleExportToNotion = (text: string) => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI_Export_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    alert("Đã lưu vào Workspace (Tải xuống file Markdown thành công)!");
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép vào bộ nhớ tạm!");
  };

  const controls = [
    { label: "+", action: handleZoomIn, title: "Phóng to", type: "zoomIn" },
    { label: "-", action: handleZoomOut, title: "Thu nhỏ", type: "zoomOut" },
    { label: "⚲", action: () => setInteractionMode(interactionMode === 'mark' ? 'none' : 'mark'), title: "Ghim địa điểm (Click)", type: "mark" },
    { label: "⬚", action: () => setInteractionMode(interactionMode === 'select' ? 'none' : 'select'), title: "Khoanh vùng (Drag chuột)", type: "select" },
    { label: "⛶", action: handleToggleFullScreen, title: "Toàn màn hình", type: "fullScreen" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {!isExploring && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-cosmic">
          <h1 className="text-6xl font-bold text-blue-400 tracking-widest mb-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] text-center px-4">
            JWST SPACE EXPLORER
          </h1>
          
          <div className="relative w-full max-w-2xl px-4" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-full z-20 relative">
              <input
                type="text"
                className="w-full px-6 py-4 bg-slate-900/90 backdrop-blur-md border border-slate-600 rounded-l-full text-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400"
                placeholder="Khám phá thiên hà (VD: M101, Tinh vân Orion,...)"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }}
              />
              <button type="submit" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-r-full font-bold text-lg transition-colors shadow-lg">
                Khám phá
              </button>
            </form>

            {showSuggestions && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-down mx-4" style={{width: 'calc(100% - 2rem)'}}>
                {filteredSuggestions.length > 0 ? (
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <li key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-6 py-3 hover:bg-blue-600/50 cursor-pointer border-b border-slate-700/50 last:border-0 text-slate-200 transition-colors flex items-center gap-3">
                        <span className="text-blue-400">✨</span> {suggestion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-4 text-slate-400 italic">
                    Chưa có trong danh mục phổ biến. Nhấn "Khám phá" để quét sâu...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isExploring && (
        <header className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-blue-400 tracking-widest cursor-pointer" onClick={() => setIsExploring(false)}>JWST EXPLORER</h1>
            <button 
              onClick={() => setShowSessionSidebar(!showSessionSidebar)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-sm text-slate-300"
            >
              🕒 Lịch sử Chat
            </button>
          </div>
          
          <div className="relative w-1/3" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input type="text" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:border-blue-500" placeholder="Khám phá thiên hà (VD: M1)..." value={searchQuery} onChange={handleInputChange} onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }} />
              <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-r-md font-medium transition-colors">Khám phá</button>
            </form>
            {showSuggestions && (
              <div className="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-2xl overflow-hidden z-50">
                {filteredSuggestions.length > 0 ? (
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <li key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-4 py-2 hover:bg-blue-600/50 cursor-pointer border-b border-slate-700/50 last:border-0 text-sm text-slate-200">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-xs text-slate-400 italic">Nhấn "Khám phá" để quét sâu...</div>
                )}
              </div>
            )}
          </div>
        </header>
      )}

      <main className="flex-1 flex relative overflow-hidden">
        {/* Session Sidebar */}
        {isExploring && showSessionSidebar && (
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="font-bold text-slate-200">Các phiên Chat</h2>
              <button onClick={handleNewSession} className="text-emerald-400 hover:text-emerald-300 font-bold text-xl">+</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sessions.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => handleSwitchSession(s.id)}
                  className={`p-3 mb-2 rounded cursor-pointer text-sm truncate border transition-colors ${currentSessionId === s.id ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-slate-800/30 border-transparent hover:bg-slate-800 text-slate-400'}`}
                >
                  {s.title}
                </div>
              ))}
            </div>
          </aside>
        )}

        <section className="flex-1 relative bg-black flex items-center justify-center">
          {!isExploring ? (
            <p className="text-slate-500 italic text-lg">Vui lòng nhập tên thiên thể để nạp bản đồ vũ trụ.</p>
          ) : (
            <>
              {isWaitingForDzi && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h2 className="text-2xl font-bold text-blue-400 animate-pulse tracking-widest text-center">ĐANG TRUY XUẤT NASA MAST</h2>
                  <p className="text-slate-300 mt-4 text-xl text-center">
                    Thời gian dự kiến còn lại: <span className="text-emerald-400 font-mono font-bold text-3xl ml-2">{timeLeft > 0 ? `${timeLeft}s` : 'Đang đồng bộ hóa dữ liệu...'}</span>
                  </p>
                </div>
              )}
              
              {dziUrl && !isWaitingForDzi && (
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 w-64">
                  <h3 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">Xử lý hình ảnh</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ sáng</span><span>{filters.brightness}%</span></div>
                    <input type="range" min="50" max="200" value={filters.brightness} onChange={e => setFilters({...filters, brightness: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-slate-300 text-xs mb-1"><span>Tương phản</span><span>{filters.contrast}%</span></div>
                    <input type="range" min="50" max="200" value={filters.contrast} onChange={e => setFilters({...filters, contrast: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                  </div>
                  <div className="mb-5">
                    <div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ bão hòa</span><span>{filters.saturate}%</span></div>
                    <input type="range" min="0" max="200" value={filters.saturate} onChange={e => setFilters({...filters, saturate: parseInt(e.target.value)})} className="w-full accent-blue-500" />
                  </div>
                  <button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-900/50">
                    Tải ảnh chất lượng cao
                  </button>
                </div>
              )}

              <div id="osd-viewer" className="absolute inset-0 w-full h-full" style={{ filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%)` }}></div>
            </>
          )}

          {isExploring && (
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
              {controls.map((control, idx) => (
                <button
                  key={idx} onClick={control.action} title={control.title}
                  className={`w-11 h-11 bg-slate-800/80 hover:bg-slate-700 text-white rounded shadow-lg border border-slate-600 flex items-center justify-center text-xl transition-all ${((control.type === 'mark' && interactionMode === 'mark') || (control.type === 'select' && interactionMode === 'select')) ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)]' : ''}`}
                >
                  {control.label}
                </button>
              ))}
            </div>
          )}
        </section>

        {isExploring && (
          <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col z-10 shadow-2xl relative">
            <div className="p-4 border-b border-slate-800 font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Trợ lý Gemini AI
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
                              const {children, className, node, ...rest} = props
                              const match = /language-(\w+)/.exec(className || '')
                              return match ? (
                                <div className="relative group/code mt-2 mb-2 rounded overflow-hidden">
                                  <div className="flex justify-between items-center bg-slate-800 px-3 py-1 border-b border-slate-700 text-xs text-slate-400">
                                    <span>{match[1]}</span>
                                    <div className="flex gap-2">
                                      <button onClick={() => handleChatSubmit(`Hãy giải thích kỹ hơn về đoạn code ${match[1]} này cho tôi.`)} className="hover:text-emerald-400 transition-colors">Giải thích</button>
                                      <button onClick={() => handleCopyText(String(children))} className="hover:text-blue-400 transition-colors">Copy</button>
                                    </div>
                                  </div>
                                  <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, borderRadius: '0 0 0.25rem 0.25rem' }}
                                  />
                                </div>
                              ) : (
                                <code {...rest} className="bg-slate-700 px-1 py-0.5 rounded text-emerald-300">
                                  {children}
                                </code>
                              )
                            }
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                    </div>
                    {/* Action buttons under AI message */}
                    {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && (
                      <div className="flex gap-2 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleCopyText(msg.text)} className="text-xs text-slate-500 hover:text-blue-400 bg-slate-800 px-2 py-1 rounded">📋 Copy</button>
                        <button onClick={() => handleExportToNotion(msg.text)} className="text-xs text-slate-500 hover:text-emerald-400 bg-slate-800 px-2 py-1 rounded">💾 Lưu Workspace</button>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-950 flex flex-col gap-2">
              {/* Prompt Templates */}
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {PROMPT_TEMPLATES.map((pt, i) => (
                  <button key={i} onClick={() => setChatInput(pt)} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-300 transition-colors">
                    ✨ {pt}
                  </button>
                ))}
              </div>

              {/* File Upload Info */}
              {selectedFile && (
                <div className="flex items-center justify-between bg-blue-900/30 border border-blue-500/50 px-3 py-1.5 rounded text-xs text-blue-200">
                  <span className="truncate max-w-[200px]">📎 {selectedFile.name}</span>
                  <button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="hover:text-red-400">✕</button>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* File Upload Button */}
                <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors" title="Đính kèm tài liệu (TXT, MD, CSV)">
                  📎
                </button>
                
                <input
                  type="text"
                  placeholder="Nhập câu hỏi hoặc chọn file..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm focus:outline-none focus:border-emerald-500 text-white"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleChatSubmit(); }}
                />
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;