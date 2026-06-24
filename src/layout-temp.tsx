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
        <div className="flex flex-col gap-4">
          {/* Quick Tools for Deep Sky */}
          {activeLayer === 'deepsky' && dziUrl && (
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">🔭 Phân Tích Hình Ảnh</h4>
                <div className="mb-2"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ sáng</span><span>{filters.brightness}%</span></div><input type="range" min="50" max="200" value={filters.brightness} onChange={e => setFilters({...filters, brightness: parseInt(e.target.value)})} className="w-full accent-sky-500" /></div>
                <div className="mb-2"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Tương phản</span><span>{filters.contrast}%</span></div><input type="range" min="50" max="200" value={filters.contrast} onChange={e => setFilters({...filters, contrast: parseInt(e.target.value)})} className="w-full accent-sky-500" /></div>
                <div className="mb-3"><div className="flex justify-between text-slate-300 text-xs mb-1"><span>Độ bão hòa</span><span>{filters.saturate}%</span></div><input type="range" min="0" max="200" value={filters.saturate} onChange={e => setFilters({...filters, saturate: parseInt(e.target.value)})} className="w-full accent-sky-500" /></div>
                <button onClick={handleDownload} className="w-full bg-emerald-600/80 hover:bg-emerald-500 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border border-emerald-500/50">📸 Chụp ảnh (HD)</button>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">🔊 Âm thanh hóa & Báo Cáo</h4>
                <button onClick={toggleSonification} className={`w-full py-2 mb-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border ${isSonifying ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
                  🎵 {isSonifying ? 'Dừng phát' : 'Phát âm thanh phổ'}
                </button>
                <button onClick={generateCitizenReport} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border border-slate-600">
                  🖨️ Xuất Báo Cáo Khoa Học
                </button>
              </div>

              <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
            </div>
          )}

          {/* Tool Grid for interactive mode */}
          {activeLayer === 'deepsky' && (
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 grid grid-cols-4 gap-2">
              {controls.map((control, idx) => (
                <button key={idx} onClick={control.action} title={control.title} className={`aspect-square bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg shadow border border-slate-700 flex items-center justify-center text-xl transition-all ${['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) ? 'bg-blue-600 border-blue-400 text-white' : ''}`}>
                  {control.label}
                </button>
              ))}
            </div>
          )}

          {/* Quiz Button */}
          <button onClick={() => setShowQuiz(true)} className="w-full bg-purple-900/50 hover:bg-purple-800 border border-purple-500/50 text-purple-200 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            🎮 Trắc nghiệm Kiến Thức
          </button>
          
          {/* Badge display */}
          {badges.length > 0 && (
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 flex flex-wrap gap-2 justify-center">
              {badges.map((b, i) => <span key={i} title={b} className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">🎖️</span>)}
            </div>
          )}
        </div>
      </FloatingPanel>

      {/* Right Floating Panel - AI Assistant */}
      <FloatingPanel 
        position="right" 
        isOpen={rightPanelOpen} 
        title="Trợ lý Gemini AI"
        width="w-80 md:w-96"
      >
        <div className="flex flex-col h-full relative">
          {/* Session Switcher Mini */}
          <div className="mb-2 flex gap-1 overflow-x-auto hide-scrollbar pb-2">
            <button onClick={handleNewSession} className="px-3 py-1 bg-emerald-900/40 text-emerald-300 border border-emerald-500/50 rounded-full text-xs font-bold shrink-0">+</button>
            {sessions.map(s => (
               <button key={s.id} onClick={() => handleSwitchSession(s.id)} className={`px-3 py-1 rounded-full text-xs truncate max-w-[120px] shrink-0 border transition-colors ${currentSessionId === s.id ? 'bg-blue-600/40 border-blue-500 text-blue-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
                 {s.title}
               </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 pr-1">
            <div className="flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col group ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                  <div className={`p-3 rounded-2xl text-sm border shadow-lg max-w-[90%] overflow-x-auto ${msg.role === 'ai' ? 'bg-slate-800/80 text-slate-200 border-slate-700/50 rounded-tl-sm' : 'bg-blue-600/40 text-blue-100 border-blue-500/50 rounded-tr-sm backdrop-blur'}`}>
                    {msg.role === 'ai' ? (
                      <ReactMarkdown 
                        components={{
                          code(props) {
                            const {children, className, node, ...rest} = props;
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <div className="relative group/code mt-2 mb-2 rounded-lg overflow-hidden border border-slate-700">
                                <div className="flex justify-between items-center bg-slate-900 px-3 py-1 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider"><span>{match[1]}</span><div className="flex gap-2"><button onClick={() => handleChatSubmit(`Hãy giải thích kỹ hơn về đoạn code ${match[1]} này.`)} className="hover:text-emerald-400 transition-colors">Giải thích</button><button onClick={() => handleCopyText(String(children))} className="hover:text-blue-400 transition-colors">Copy</button></div></div>
                                <SyntaxHighlighter {...rest} PreTag="div" children={String(children).replace(/\n$/, '')} language={match[1]} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0' }} />
                              </div>
                            ) : ( <code {...rest} className="bg-slate-900/50 px-1.5 py-0.5 rounded text-emerald-300 font-mono text-[11px] border border-slate-700/50">{children}</code> );
                          }
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : ( <div className="whitespace-pre-wrap">{msg.text}</div> )}
                  </div>
                  {msg.role === 'ai' && msg.text !== 'Đang phân tích dữ liệu...' && (
                    <div className="flex gap-2 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => speakText(msg.text)} className={`text-[10px] text-slate-500 hover:text-amber-400 bg-slate-800/50 px-2 py-1 rounded-full border border-slate-700/50 ${isSpeaking ? 'text-amber-400 animate-pulse border-amber-500/50' : ''}`}>🔊 {isSpeaking ? 'Đang đọc...' : 'Đọc'}</button>
                      <button onClick={() => handleCopyText(msg.text)} className="text-[10px] text-slate-500 hover:text-blue-400 bg-slate-800/50 px-2 py-1 rounded-full border border-slate-700/50">📋 Copy</button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 p-2 flex flex-col gap-2">
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {PROMPT_TEMPLATES.map((pt, i) => ( <button key={i} onClick={() => setChatInput(pt)} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] text-slate-300 transition-colors">✨ {pt}</button> ))}
            </div>
            {selectedFile && (
              <div className="flex items-center justify-between bg-blue-900/30 border border-blue-500/50 px-2 py-1 rounded text-xs text-blue-200"><span className="truncate max-w-[200px]">📎 {selectedFile.name}</span><button onClick={() => { setSelectedFile(null); setFileContent(''); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="hover:text-red-400 px-1">✕</button></div>
            )}
            <div className="flex items-center gap-1.5">
              <button onClick={startListening} className={`p-1.5 rounded-lg transition-colors ${isListening ? 'text-red-400 bg-red-900/30 animate-pulse' : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'}`} title="Nhập bằng giọng nói">🎙️</button>
              <input type="file" accept=".txt,.md,.csv,.json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button onClick={() => fileInputRef.current?.click()} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors" title="Đính kèm tài liệu">📎</button>
              <input type="text" placeholder="Nhập câu hỏi..." className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleChatSubmit(); }} />
              <button onClick={() => handleChatSubmit()} className="p-1.5 text-slate-900 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors" title="Gửi">➤</button>
            </div>
          </div>
        </div>
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
