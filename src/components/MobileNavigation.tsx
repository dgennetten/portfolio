import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pencil, Brush, Box, DraftingCompass, PenTool, Aperture, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  return (
    <>
      {/* Hidden header for mobile */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            <div className="text-xl font-light tracking-wide">
              <NavLink to="/" className="hover:opacity-70 transition-opacity duration-200">
                Darren Gennetten
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm border-t border-gray-200">
        <ul className="flex justify-around">
          <li className="flex-1">
            <NavLink 
              to="/"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/gallery/logos"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Pencil size={20} />
              <span className="text-xs mt-1">Logos</span>
            </NavLink>
          </li>
         <li className="flex-1">
            <NavLink 
              to="/gallery/photography"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Aperture size={20} />
              <span className="text-xs mt-1">Photos</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/gallery/projects"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <DraftingCompass size={20} />
              <span className="text-xs mt-1">Projects</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/bio"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <User size={20} />
              <span className="text-xs mt-1">About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavigation;