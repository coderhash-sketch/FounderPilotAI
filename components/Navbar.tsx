
import React from 'react';
import { AppState } from '../types';

interface NavbarProps {
  currentState: AppState;
  onNavigate: (state: AppState) => void;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentState, onNavigate, onReset }) => {
  const navItems = [
    { label: 'Pilot Hub', state: 'idle' as AppState },
    { label: 'Resources', state: 'resources' as AppState },
    { label: 'Community', state: 'community' as AppState },
  ];

  return (
    <nav className="border-b border-white/10 bg-navy-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={onReset}
          >
            <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-2.5 rounded-xl mr-3 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              FOUNDERPILOT
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.state)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  currentState === item.state 
                  ? 'bg-white/10 text-white shadow-inner' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-4" />
            <button 
              onClick={onReset}
              className="px-6 py-2.5 text-sm font-bold text-navy-950 bg-white rounded-full hover:bg-cyan-400 transition-all shadow-xl shadow-white/5 active:scale-95"
            >
              Start New Project
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
