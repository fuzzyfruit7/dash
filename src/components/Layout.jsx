import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
        <div className="mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-xl font-bold text-white">PdM System</h1>
          <p className="text-xs text-slate-400">NALCO Smelter</p>
        </div>
        <nav className="space-y-2 flex-1">
          <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`} onClick={() => navigate('/')}>
            <span className="w-5 h-5 bg-blue-500 rounded-sm"></span>
            <span className="font-medium">Dashboard</span>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${location.pathname === '/fleet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`} onClick={() => navigate('/fleet')}>
            <span className="w-5 h-5 bg-green-500 rounded-sm"></span>
            <span className="font-medium">Fleet Overview</span>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

