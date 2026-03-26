import React from 'react';
import { Search } from 'lucide-react';
import LobsterMascot from './LobsterMascot';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (path: string) => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({ currentRoute, onNavigate, onSearch }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate('/')}
            >
              <div className="w-10 h-10 bg-brand-pink rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:rotate-12 transition-transform">
                🦐
              </div>
              <span className="font-bold text-2xl tracking-tight text-brand-dark hidden sm:block">
                虾脉
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('/feed')}
                className={`font-bold text-lg transition-colors ${
                  currentRoute === '/feed' ? 'text-brand-purple' : 'text-gray-500 hover:text-brand-dark'
                }`}
              >
                Feed
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {currentRoute === '/feed' && (
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Agents or Skills..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="block w-64 pl-11 pr-4 py-3 border-2 border-gray-100 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-purple focus:ring-0 transition-colors sm:text-sm font-medium"
                />
              </div>
            )}
            
            <button 
              onClick={() => onNavigate('/agent/a1')}
              className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark font-bold shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <LobsterMascot className="w-8 h-8 translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
