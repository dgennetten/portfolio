import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Pencil, Brush, Box, Layers, DraftingCompass, PenTool, Aperture, Code, User } from 'lucide-react';

const navItems = [
  { to: '/',                    icon: Home,             label: 'Home'   },
  { to: '/gallery/drawings',    icon: Pencil,           label: 'Draw'   },
  { to: '/gallery/paintings',   icon: Brush,            label: 'Paint'  },
  { to: '/gallery/sculptures',  icon: Box,              label: 'Sculpt' },
  { to: '/gallery/prints',      icon: Layers,           label: 'Print'  },
  { to: '/gallery/geometric',   icon: DraftingCompass,  label: 'Geom'   },
  { to: '/gallery/design',      icon: PenTool,          label: 'Design' },
  { to: '/gallery/photography', icon: Aperture,         label: 'Snap'   },
  { to: '/gallery/code',        icon: Code,             label: 'Code'   },
  { to: '/bio',                 icon: User,             label: 'Bio'    },
];

const MobileNavigation: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur border-b border-stone-200/60">
        <div className="flex justify-center items-center h-12 text-xs font-light tracking-widest uppercase text-ink">
          <NavLink to="/admin" className="hover:text-accent transition-colors duration-150">K.</NavLink>
          <NavLink to="/" className="text-ink hover:text-ink"> Douglas Gennetten</NavLink>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur border-t border-stone-200/60">
        <ul className="flex justify-around">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <NavLink
                  to={to}
                  className="flex flex-col items-center py-2.5 relative"
                >
                  <Icon
                    size={21}
                    className={`transition-colors duration-150 ${isActive ? 'text-accent' : 'text-stone-500'}`}
                  />
                  <span className={`text-[11px] mt-1 tracking-wide transition-colors duration-150 ${isActive ? 'text-accent font-medium' : 'text-stone-500'}`}>
                    {label}
                  </span>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MobileNavigation;
