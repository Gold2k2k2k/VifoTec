const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

const returnIdx = app.indexOf('  return (\n    <div className="flex flex-col h-screen w-screen');
if (returnIdx === -1) {
    console.error("Could not find return statement in App.tsx");
    process.exit(1);
}

const part1 = app.substring(0, returnIdx);

const newLayout = `  const dockItems = [
    { id: 'stellarium', label: 'Kính Stellarium', icon: '🌌', isActive: activeLayer === 'stellarium', onClick: () => setActiveLayer('stellarium') },
    { id: 'deepsky', label: 'Kính JWST (Deep Sky)', icon: '🔭', isActive: activeLayer === 'deepsky', onClick: () => setActiveLayer('deepsky') },
    { id: 'vrgallery', label: 'Triển Lãm VR', icon: '🏛️', isActive: activeLayer === 'vrgallery', onClick: () => setActiveLayer('vrgallery') },
    { id: 'radar', label: 'Radar 3D', icon: '🌐', isActive: activeLayer === 'radar', onClick: () => setActiveLayer('radar') }
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      {/* Landing Page */}
      {!isExploring && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-cosmic">
          <h1 className="text-6xl font-bold text-blue-400 tracking-widest mb-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] text-center px-4">JWST SPACE EXPLORER</h1>
          <div className="relative w-full max-w-2xl px-4" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-full z-20 relative">
              <input type="text" className="w-full px-6 py-4 bg-slate-900/90 backdrop-blur-md border border-slate-600 rounded-l-full text-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400" placeholder="Khám phá thiên hà (VD: M101, Tinh vân Orion,...)" value={searchQuery} onChange={handleInputChange} onFocus={() => { if(searchQuery.trim().length > 0) setShowSuggestions(true); }} />
              <button type="submit" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-r-full font-bold text-lg transition-colors shadow-lg">Khám phá</button>
            </form>
            {showSuggestions && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-down mx-4" style={{width: 'calc(100% - 2rem)'}}>
                {filteredSuggestions.length > 0 ? (
                  <ul className="max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredSuggestions.map((suggestion, idx) => ( <li key={idx} onClick={() => handleSuggestionClick(suggestion)} className="px-6 py-3 hover:bg-blue-600/50 cursor-pointer border-b border-slate-700/50 last:border-0 text-slate-200 transition-colors flex items-center gap-3"><span className="text-blue-400">✨</span> {suggestion}</li> ))}
                  </ul>
                ) : ( <div className="px-6 py-4 text-slate-400 italic">Nhấn "Khám phá" để yêu cầu NASA quét sâu...</div> )}
              </div>
            )}
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
                const userText = \`Tôi muốn phân tích thiên thể \${name} (\${type}). Chi tiết tọa độ: \${details}\`;
                setMessages(prev => [...prev, { role: 'user', text: userText }]);
                setMessages(prev => [...prev, { role: 'ai', text: 'Đang kết nối vệ tinh và phân tích dữ liệu...' }]);
                setRightPanelOpen(true);
                try {
                  const reply = await getGeminiResponse(\`Người dùng đang xem thiên thể "\${name}" (\${type}) trên Kính thiên văn Stellarium Web với dữ liệu tọa độ: "\${details}". Hãy cung cấp thông tin khoa học chuyên sâu, lịch sử phát hiện và ý nghĩa văn hóa dân gian (đặc biệt là mối liên hệ với văn hóa Việt Nam hoặc phương Đông nếu có) về thiên thể này.\`, messages);
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
                    <p className="text-slate-300 mt-4 text-xl text-center">Thời gian dự kiến còn lại: <span className="text-emerald-400 font-mono font-bold text-3xl ml-2">{timeLeft > 0 ? \`\${timeLeft}s\` : 'Đang đồng bộ...'}</span></p>
                  </div>
                )}
                
                <div id="osd-viewer" className={\`absolute inset-0 w-full h-full transition-transform duration-1000 \${interactionMode==='magnify' ? 'cursor-none' : ''} \${isCockpitMode ? 'scale-110 perspective-[1000px] rotate-x-[5deg]' : ''}\`} style={{ filter: getSpectrumFilters() }}></div>
                
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

                <div ref={blackholeRef} className={\`fixed z-40 pointer-events-none rounded-full \${interactionMode === 'blackhole' ? 'block' : 'hidden'}\`} style={{ width: '300px', height: '300px', transform: 'translate(-50%, -50%)', backdropFilter: 'blur(8px) contrast(200%) hue-rotate(180deg)', boxShadow: 'inset 0 0 100px black, 0 0 30px rgba(168, 85, 247, 0.5)', background: 'radial-gradient(circle, black 15%, transparent 60%)' }}></div>

                <div ref={scannerRef} className={\`absolute top-0 bottom-0 w-[2px] bg-orange-500 shadow-[0_0_20px_5px_rgba(234,88,12,0.8)] z-30 pointer-events-none \${isSonifying ? 'block' : 'hidden'}\`} style={{ left: '0%' }}>
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
          <FloatingPanel position="left" isOpen={leftPanelOpen} title="Bảng Tùy Chỉnh (Tools)">
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
              className={\`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors \${leftPanelOpen ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white'}\`}
              title="Tắt/Bật bảng trái"
            >
              🛠️
            </button>
          </div>

          <div className="absolute bottom-6 right-6 z-50 flex gap-2">
            <button 
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={\`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors \${rightPanelOpen ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white'}\`}
              title="Tắt/Bật Trợ lý AI"
            >
              🤖
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
`;

fs.writeFileSync('src/App.tsx', part1 + newLayout);
console.log('App.tsx fixed successfully');
