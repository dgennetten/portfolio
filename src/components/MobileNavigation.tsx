import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pencil, Brush, Box, DraftingCompass, Camera, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  return (
    <>
      {/* Hidden header for mobile */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            <div className="text-xl font-light tracking-wide">
              <NavLink to="/" className="hover:opacity-70 transition-opacity duration-200">
                K. Douglas Gennetten
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
              to="/gallery/drawings"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Pencil size={20} />
              <span className="text-xs mt-1">Draw</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/gallery/paintings"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Brush size={20} />
              <span className="text-xs mt-1">Paint</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/gallery/sculptures"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <Box size={20} />
              <span className="text-xs mt-1">Sculpt</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/gallery/geometric"
              className={({ isActive }) => `
                flex flex-col items-center py-3 
                ${isActive ? 'text-black' : 'text-gray-500'}
              `}
            >
              <DraftingCompass size={20} />
              <span className="text-xs mt-1">Tile</span>
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
              <Camera size={20} />
              <span className="text-xs mt-1">Click</span>
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
              <span className="text-xs mt-1">Me</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavigation;