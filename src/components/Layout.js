import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  List,
  Bell,
  Wrench,
  LineChart,
  FileText,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active = false, onClick }) => (
  <div
    onClick={() => onClick(path)}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: List, label: 'Equipment Overview', path: '/fleet' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
    { icon: LineChart, label: 'Analytics', path: '/analytics' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
        <div className="mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-xl font-bold text-white">PdM System</h1>
          <p className="text-xs text-slate-400">Amrita Chemicals, Puduchery</p>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
              onClick={handleNavigation}
            />
          ))}
        </nav>
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Operator</p>
              <p className="text-xs text-slate-400">Shift A</p>
            </div>
          </div>
          <SidebarItem icon={LogOut} label="Logout" path="/logout" onClick={() => alert('Logout clicked')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
