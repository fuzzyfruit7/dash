import React from 'react';

export const Card = ({ children, className = '', onClick }) => (
  <div
    className={`bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg ${className} ${onClick ? 'cursor-pointer hover:border-blue-500 transition-all' : ''}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const SectionTitle = ({ title }) => (
  <h3 className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">{title}</h3>
);

export const StatusBadge = ({ status }) => {
  const colors = {
    Normal: "text-green-400",
    Warning: "text-orange-400",
    Critical: "text-red-500",
    normal: "text-green-400",
    warning: "text-orange-400",
    critical: "text-red-500",
  };
  const colorClass = colors[status] || (status?.includes("%") ? "text-green-400" : "text-slate-300");
  
  return <span className={`font-bold ${colorClass}`}>{status}</span>;
};

export const StatusDot = ({ status }) => {
  const colors = {
    normal: 'bg-green-400',
    warning: 'bg-orange-400',
    critical: 'bg-red-500',
  };
  return <div className={`w-2 h-2 rounded-full mr-2 ${colors[status]}`}></div>;
};

export const HealthBar = ({ health }) => {
  let color = 'bg-green-400';
  if (health < 50) color = 'bg-red-500';
  else if (health < 80) color = 'bg-orange-400';

  return (
    <div className="flex items-center gap-3">
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
      <span className={`font-bold text-sm ${color.replace('bg-', 'text-')}`}>{health}%</span>
    </div>
  );
};

export const CircularHealth = ({ score, color = "#22c55e" }) => {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#334155"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">{score}</span>
    </div>
  );
};
