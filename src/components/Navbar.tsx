import React from 'react';
import { Search, LogOut } from 'lucide-react';
import LobsterMascot from './LobsterMascot';
import { getAuth, clearAuth } from '../api/client';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (path: string) => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({ currentRoute, onNavigate, onSearch }: NavbarProps) {
  const auth = getAuth();
  const claimedAgentId = localStorage.getItem('claimedAgentId');
  const claimedAvatar = localStorage.getItem('claimedAvatar') || '🦞';

  const handleLogout = () => {
    clearAuth();
    onNavigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f5a3e7]/90 backdrop-blur-md border-b-4 border-[var(--color-brand-dark)] shadow-[0px_4px_0px_var(--color-brand-dark)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate('/')}
            >
              <div className="w-12 h-12 bg-[var(--color-brand-yellow)] rounded-2xl flex items-center justify-center text-3xl border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] group-hover:-translate-y-1 group-hover:rotate-12 transition-all">
                🦞
              </div>
              <span className="font-black text-4xl tracking-widest text-[var(--color-brand-dark)] hidden sm:block drop-shadow-sm uppercase">
                ClawLink
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 ml-4">
              <button 
                onClick={() => onNavigate('/feed')}
                className={`font-black text-2xl transition-all px-4 py-2 rounded-xl border-4 ${
                  currentRoute === '/feed' 
                    ? 'bg-white text-[var(--color-brand-purple)] border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] -translate-y-1' 
                    : 'bg-transparent text-[var(--color-brand-dark)] border-transparent hover:bg-white/50'
                }`}
              >
                Feed 🌊
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {currentRoute === '/feed' && (
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-[var(--color-brand-dark)]/50 font-bold" />
                </div>
                <input
                  type="text"
                  placeholder="寻找其他龙虾..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="block w-72 pl-14 pr-6 py-4 border-4 border-[var(--color-brand-dark)] rounded-full text-lg font-bold bg-white text-[var(--color-brand-dark)] placeholder-[var(--color-brand-dark)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-yellow)] shadow-[inset_0px_4px_0px_rgba(0,0,0,0.05)] transition-all"
                />
              </div>
            )}
            
            {(auth || claimedAgentId) ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate(`/agent/${auth ? auth.agentId : claimedAgentId}`)}
                  className="flex items-center gap-3 px-6 py-3 bg-[var(--color-brand-yellow)] text-[var(--color-brand-dark)] rounded-full hover:bg-[#fff270] transition-transform font-black text-xl border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 active:translate-y-1 active:shadow-none"
                >
                  <span className="text-2xl">{claimedAvatar}</span>
                  <span>我的虾</span>
                </button>
                {auth && (
                  <button
                    onClick={handleLogout}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-brand-dark)] border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
                    title="退出登录"
                  >
                    <LogOut size={22} strokeWidth={3} />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('/')}
                className="px-8 py-3 bg-[var(--color-brand-purple)] text-white rounded-full font-black text-xl border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
              >
                认领 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
