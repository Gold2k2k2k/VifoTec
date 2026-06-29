import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Rocket, Map, Newspaper, Globe } from 'lucide-react';
import Home from './pages/Home';
import StarMap from './pages/StarMap';
import NewsGallery from './pages/NewsGallery';
import Planets from './pages/Planets';

const App = () => {
  return (
    <Router>
      <div className="layout-container">
        {/* Navigation Bar */}
        <nav className="navbar glass-panel">
          <div className="navbar-brand title-gradient">
            <Rocket className="animate-float" style={{ color: 'var(--accent-blue)' }} />
            <span>Astropy Explorer</span>
          </div>
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Khám phá
            </NavLink>
            <NavLink to="/planets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Hành tinh
            </NavLink>
            <NavLink to="/starmap" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Bản đồ sao
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Tin tức & Ảnh
            </NavLink>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/starmap" element={<StarMap />} />
          <Route path="/news" element={<NewsGallery />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
