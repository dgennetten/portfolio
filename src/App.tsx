import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import BioPage from './pages/BioPage';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900 min-h-screen">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery/:category" element={<GalleryPage />} />
            <Route path="/bio" element={<BioPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;