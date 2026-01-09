import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { AlertTriangle, AlertOctagon, AlertCircle, Filter, Download, Search, Clock, CheckCircle, XCircle } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    motor: 'IDF301',
    motorName: 'ID Fan 1',
    severity: 'critical',
    type: 'Bearing Failure',
    message: 'Outer race bearing defect detected with 85% confidence',
    timestamp: '2026-01-09 13:45:23',
    status: 'active',
    rul: '7 days'
  },
  {
    id: 2,
    motor: 'MEF701',
    motorName: 'Main Exhaust Fan 1',
    severity: 'warning',
    type: 'High Temperature',
    message: 'Winding temperature exceeds threshold by 15°C',
    timestamp: '2026-01-09 12:30:15',
    status: 'active',
    rul: '21 days'
  },
  {
    id: 3,
    motor: 'PAF401',
    motorName: 'PA Fan 1',
    severity: 'warning',
    type: 'Vibration Anomaly',
    message: 'RMS vibration increased by 25% in last 48 hours',
    timestamp: '2026-01-09 10:15:42',
    status: 'active',
    rul: '30 days'
  },
  {
    id: 4,
    motor: 'IDF302',
    motorName: 'ID Fan 2',
    severity: 'info',
    type: 'Maintenance Due',
    message: 'Scheduled maintenance window approaching',
    timestamp: '2026-01-09 08:00:00',
    status: 'acknowledged',
    rul: '60 days'
  },
  {
    id: 5,
    motor: 'MEF702',
    motorName: 'Main Exhaust Fan 2',
    severity: 'critical',
    type: 'Electrical Fault',
    message: 'Phase current imbalance detected - Phase B 6.5% higher',
    timestamp: '2026-01-08 22:45:10',
    status: 'resolved',
    rul: '90 days'
  },
];

export default function Alerts() {
  const [filter, setFilter] = useState('all');

  const filteredAlerts = filter === 'all' 
    ? alertsData 
    : alertsData.filter(alert => alert.severity === filter || alert.status === filter);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-500/10 border-red-500/30 text-red-200',
      warning: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
      info: 'bg-blue-500/10 border-blue-500/30 text-blue-200',
    };
    return colors[severity] || colors.info;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: <AlertOctagon size={20} className="text-red-400" />,
      warning: <AlertTriangle size={20} className="text-orange-400" />,
      info: <AlertCircle size={20} className="text-blue-400" />,
    };
    return icons[severity] || icons.info;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <Clock size={16} className="text-orange-400" />,
      acknowledged: <CheckCircle size={16} className="text-blue-400" />,
      resolved: <CheckCircle size={16} className="text-green-400" />,
    };
    return icons[status];
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Alerts & Notifications</h2>
            <p className="text-slate-400">Real-time system alerts and warnings</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
              <Download size={16} /> Export
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-500">2</p>
              </div>
              <AlertOctagon size={32} className="text-red-500" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Warnings</p>
                <p className="text-3xl font-bold text-orange-400">2</p>
              </div>
              <AlertTriangle size={32} className="text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active</p>
                <p className="text-3xl font-bold text-blue-400">3</p>
              </div>
              <Clock size={32} className="text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Resolved Today</p>
                <p className="text-3xl font-bold text-green-400">1</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'critical', 'warning', 'active', 'resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search alerts..."
          />
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg">{alert.motor} - {alert.motorName}</h3>
                      <p className="text-slate-400 text-sm">{alert.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alert.status)}
                      <span className="text-sm capitalize text-slate-300">{alert.status}</span>
                    </div>
                  </div>
                  <p className="text-slate-200 mb-3">{alert.message}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">
                        <Clock size={14} className="inline mr-1" />
                        {alert.timestamp}
                      </span>
                      <span className="text-slate-400">
                        RUL: <span className="font-semibold text-white">{alert.rul}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <>
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition">
                            Acknowledge
                          </button>
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition">
                            Escalate
                          </button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm transition">
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
