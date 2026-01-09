import React from 'react';
import Layout from '../components/Layout';
import { Card, StatusDot, HealthBar } from '../components/SharedComponents';
import { Filter, Download, RefreshCw, Search, Eye, Edit } from 'lucide-react';

// --- Mock Data ---

const kpiData = [
  { title: 'Total Motors', value: '52', color: 'text-blue-400' },
  { title: 'Healthy', value: '42', color: 'text-green-400' },
  { title: 'Warning', value: '7', color: 'text-orange-400' },
  { title: 'Critical', value: '3', color: 'text-red-500' },
  { title: 'Avg Health', value: '84%', color: 'text-blue-400' },
];

const motorTableData = [
  { id: 'MEF701', name: 'Main Exhaust Fan 1', status: 'warning', health: 72, rul: '21 days' },
  { id: 'MEF702', name: 'Main Exhaust Fan 2', status: 'normal', health: 94, rul: '90 days' },
  { id: 'IDF301', name: 'ID Fan 1', status: 'critical', health: 43, rul: '7 days' },
  { id: 'IDF302', name: 'ID Fan 2', status: 'normal', health: 87, rul: '60 days' },
  { id: 'PAF401', name: 'PA Fan 1', status: 'warning', health: 78, rul: '30 days' },
  { id: 'PAF402', name: 'PA Fan 2', status: 'normal', health: 91, rul: '75 days' },
  { id: 'SAF501', name: 'Secondary Air Fan 1', status: 'normal', health: 89, rul: '65 days' },
  { id: 'SAF502', name: 'Secondary Air Fan 2', status: 'warning', health: 76, rul: '28 days' },
  { id: 'CF601', name: 'Cooling Fan 1', status: 'normal', health: 92, rul: '80 days' },
  { id: 'CF602', name: 'Cooling Fan 2', status: 'critical', health: 38, rul: '5 days' },
];

export default function FleetOverview() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Fleet Overview</h2>
            <p className="text-slate-400">Complete motor fleet monitoring and management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-white font-medium">02:44:30 PM</p>
              <p className="text-xs text-slate-400">Friday, January 09, 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
                <Filter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
                <Download size={16} /> Export
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md transition">
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="flex flex-col justify-center">
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">
                {kpi.title}
              </h3>
              <p className={`text-4xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search motors by ID, name, or status..."
          />
        </div>

        {/* Motor Table */}
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-700 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Motor ID</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium w-1/4">Health Score</th>
                  <th className="p-4 font-medium">RUL</th>
                  <th className="p-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {motorTableData.map((motor) => (
                  <tr key={motor.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium text-white">{motor.id}</td>
                    <td className="p-4 text-slate-200">{motor.name}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <StatusDot status={motor.status} />
                        <span className="text-slate-200 capitalize">{motor.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <HealthBar health={motor.health} />
                    </td>
                    <td
                      className={`p-4 font-medium ${
                        parseInt(motor.rul) < 10
                          ? 'text-red-500'
                          : parseInt(motor.rul) < 30
                          ? 'text-orange-400'
                          : 'text-green-400'
                      }`}
                    >
                      {motor.rul}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          className="text-slate-400 hover:text-blue-400 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="text-slate-400 hover:text-blue-400 transition"
                          title="Edit Motor"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-slate-400 text-sm">
            Showing <span className="font-semibold text-white">1-10</span> of{' '}
            <span className="font-semibold text-white">52</span> motors
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-md transition">
              2
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-md transition">
              3
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-md transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
