import React from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react';

const reportsData = [
  { id: 1, name: 'Monthly Fleet Health Report', date: '2026-01-01', type: 'Monthly', status: 'available', size: '2.4 MB' },
  { id: 2, name: 'Maintenance Summary - December', date: '2025-12-31', type: 'Monthly', status: 'available', size: '1.8 MB' },
  { id: 3, name: 'Predictive Maintenance Analysis', date: '2026-01-08', type: 'Weekly', status: 'available', size: '3.2 MB' },
  { id: 4, name: 'Fault Analysis Report', date: '2026-01-05', type: 'Adhoc', status: 'available', size: '1.5 MB' },
  { id: 5, name: 'Annual Performance Review', date: '2025-12-31', type: 'Annual', status: 'available', size: '5.6 MB' },
];

export default function Reports() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Reports</h2>
            <p className="text-slate-400">View and download system reports</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md transition">
              <FileText size={16} /> Generate Report
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Reports</p>
                <p className="text-3xl font-bold text-white">25</p>
              </div>
              <FileText size={32} className="text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">This Month</p>
                <p className="text-3xl font-bold text-green-400">3</p>
              </div>
              <Calendar size={32} className="text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Size</p>
                <p className="text-3xl font-bold text-orange-400">45MB</p>
              </div>
              <TrendingUp size={32} className="text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Last Generated</p>
                <p className="text-lg font-bold text-white">Today</p>
              </div>
              <FileText size={32} className="text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Reports Table */}
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-700 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Report Name</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Size</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {reportsData.map((report) => (
                <tr key={report.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-medium text-white">{report.name}</td>
                  <td className="p-4 text-slate-200">{report.type}</td>
                  <td className="p-4 text-slate-200">{report.date}</td>
                  <td className="p-4 text-slate-200">{report.size}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-semibold">
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition">
                        <Download size={18} />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  );
}
