import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MobileNavigation from './MobileNavigation';

const navLinks = [
  { to: '/gallery/drawings',    label: 'Draw'   },
  { to: '/gallery/paintings',   label: 'Paint'  },
  { to: '/gallery/sculptures',  label: 'Sculpt' },
  { to: '/gallery/prints',      label: 'Print'  },
  { to: '/gallery/geometric',   label: 'Geom'   },
  { to: '/gallery/design',      label: 'Design' },
  { to: '/gallery/photography', label: 'Snap'   },
  { to: '/gallery/code',        label: 'Code'   },
  { to: '/bio',                 label: 'Bio'    },
];

const Navigation: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isMobile) return <MobileNavigation />;

  // On the homepage, nav is transparent until scrolled; elsewhere it's the canvas bg
  const bg = isHome
    ? (scrolled ? 'bg-canvas/95 backdrop-blur border-b border-stone-200/60' : 'bg-transparent')
    : 'bg-canvas/95 backdrop-blur border-b border-stone-200/60';

  const textBase = isHome && !scrolled ? 'text-white/80 hover:text-white' : 'text-stone-500 hover:text-ink';
  const nameColor = isHome && !scrolled ? 'text-white' : 'text-ink';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${bg}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <NavLink to="/" className={`text-sm font-light tracking-widest uppercase transition-colors duration-200 ${nameColor}`}>
            Douglas Gennetten
          </NavLink>

          <nav>
            <ul className="flex gap-7">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-accent text-xs tracking-widest uppercase border-b border-accent pb-0.5'
                        : `${textBase} text-xs tracking-widest uppercase transition-colors duration-200`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
