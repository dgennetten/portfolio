import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MobileNavigation from './MobileNavigation';

const Navigation: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (isMobile) {
    return <MobileNavigation />;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-light tracking-wide">
            <NavLink to="/" className="hover:opacity-70 transition-opacity duration-200">
              Darren Gennetten
            </NavLink>
          </div>
          
          <nav>
            <ul className="flex gap-8">
              {/* <li>
                <NavLink 
                  to="/"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-black border-b border-black pb-1' 
                      : 'text-gray-600 hover:text-black transition-colors duration-200'
                  }
                >
                  Home
                </NavLink>
              </li> */}
              <li>
                <NavLink 
                  to="/gallery/logos"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-black border-b border-black pb-1' 
                      : 'text-gray-600 hover:text-black transition-colors duration-200'
                  }
                >
                  Logos
                </NavLink>
              </li>
             <li>
                <NavLink 
                  to="/gallery/photography"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-black border-b border-black pb-1' 
                      : 'text-gray-600 hover:text-black transition-colors duration-200'
                  }
                >
                  Photographs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/gallery/projects"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-black border-b border-black pb-1' 
                      : 'text-gray-600 hover:text-black transition-colors duration-200'
                  }
                >
                  Design Projects
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/bio"
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-black border-b border-black pb-1' 
                      : 'text-gray-600 hover:text-black transition-colors duration-200'
                  }
                >
                  Bio
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;