import React from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const healthTrendData = [
  { month: 'Jul', avgHealth: 88 },
  { month: 'Aug', avgHealth: 86 },
  { month: 'Sep', avgHealth: 85 },
  { month: 'Oct', avgHealth: 84 },
  { month: 'Nov', avgHealth: 82 },
  { month: 'Dec', avgHealth: 84 },
  { month: 'Jan', avgHealth: 85 },
];

const faultDistribution = [
  { name: 'Bearing', value: 45, color: '#ef4444' },
  { name: 'Electrical', value: 25, color: '#f97316' },
  { name: 'Mechanical', value: 20, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#84cc16' },
];

const mtbfData = [
  { motor: 'IDF301', mtbf: 120 },
  { motor: 'MEF701', mtbf: 180 },
  { motor: 'PAF401', mtbf: 150 },
  { motor: 'IDF302', mtbf: 200 },
  { motor: 'MEF702', mtbf: 190 },
];

export default function Analytics() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-slate-400">Performance metrics and trend analysis</p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Avg Fleet Health</p>
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">85%</p>
            <p className="text-green-400 text-sm">+3% from last month</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">MTBF</p>
              <Activity size={20} className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">168</p>
            <p className="text-slate-400 text-sm">days average</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Total Downtime</p>
              <TrendingDown size={20} className="text-red-400" />
            </div>
            <p className="text-3xl font-bold text-white">42h</p>
            <p className="text-red-400 text-sm">This month</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Maintenance Cost</p>
              <Activity size={20} className="text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-white">₹2.4L</p>
            <p className="text-orange-400 text-sm">This month</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Health Trend */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Fleet Health Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" tick={{fill: '#94a3b8'}} />
                  <YAxis domain={[70, 100]} tick={{fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155'}} />
                  <Line type="monotone" dataKey="avgHealth" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Fault Distribution */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Fault Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={faultDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {faultDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* MTBF Chart */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Mean Time Between Failures (MTBF)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mtbfData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="motor" tick={{fill: '#94a3b8'}} />
                <YAxis tick={{fill: '#94a3b8'}} label={{ value: 'Days', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155'}} />
                <Bar dataKey="mtbf" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
