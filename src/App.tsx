import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import BioPage from './pages/BioPage';
import AdminPage from './pages/AdminPage';

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="font-sans text-stone-900 min-h-screen bg-[#F8F6F1]">
      {!isAdmin && <Navigation />}
      <main>
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/gallery/:category"   element={<GalleryPage />} />
          <Route path="/bio"                 element={<BioPage />} />
          <Route path="/admin"               element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
