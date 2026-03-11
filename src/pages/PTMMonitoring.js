import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { Activity, MapPin, AlertTriangle, Droplet, ThermometerSun, Wind, Zap, Filter, Eye, Navigation } from 'lucide-react';

const ptmData = [
  {
    id: 'BC-1',
    name: 'Battery Car-1',
    location: { lat: 11.946767106712645, lng: 79.80998425866964, address: 'Line 1, Area A' },
    status: 'active',
    health: 87,
    fillStatus: 'Full',
    currentPot: 'Conveyor-A',
    temperature: 78,
    pressure: 4.2,
    voltage: 420,
    lastMaintenance: '2026-01-20',
    operatingHours: 3240,
    anomalyScore: 12,
    compressorStatus: 'normal',
    pumpStatus: 'normal',
    chuteStatus: 'normal',
    sensorHealth: 92,
    dustLevel: 'low'
  },
  {
    id: 'BC-2',
    name: 'Battery Car-2',
    location: { lat: 11.9475, lng: 79.8097, address: 'Line 1, Area B' },
    status: 'filling',
    health: 92,
    fillStatus: 'Full',
    currentPot: 'Mixer-B',
    temperature: 82,
    pressure: 4.5,
    voltage: 435,
    lastMaintenance: '2026-01-18',
    operatingHours: 2890,
    anomalyScore: 8,
    compressorStatus: 'normal',
    pumpStatus: 'normal',
    chuteStatus: 'normal',
    sensorHealth: 95,
    dustLevel: 'moderate'
  },
  {
    id: 'BC-3',
    name: 'Battery Car-3',
    location: { lat: 11.9478, lng: 79.8095, address: 'Line 2, Area A' },
    status: 'warning',
    health: 64,
    fillStatus: 'Empty',
    currentPot: 'Hopper-C',
    temperature: 95,
    pressure: 3.8,
    voltage: 445,
    lastMaintenance: '2026-01-15',
    operatingHours: 4120,
    anomalyScore: 34,
    compressorStatus: 'warning',
    pumpStatus: 'normal',
    chuteStatus: 'warning',
    sensorHealth: 78,
    dustLevel: 'high'
  },
  {
    id: 'HV-1',
    name: 'Truck Load 3T',
    location: { lat: 11.9472, lng: 79.8077, address: 'Line 2, Area B' },
    status: 'critical',
    health: 38,
    fillStatus: 'Empty',
    currentPot: 'Storage-D',
    temperature: null,
    pressure: 3.2,
    voltage: 468,
    lastMaintenance: '2026-01-10',
    operatingHours: 5340,
    anomalyScore: 67,
    compressorStatus: 'critical',
    pumpStatus: 'warning',
    chuteStatus: 'critical',
    sensorHealth: 54,
    dustLevel: 'high'
  },
  {
    id: 'HV-2',
    name: 'Truck Load 12T',
    location: { lat: 11.9485, lng: 79.8097, address: 'Line 3, Area A' },
    status: 'active',
    health: 89,
    fillStatus: 'Full',
    currentPot: 'Tank-E',
    temperature: null,
    pressure: 4.4,
    voltage: 428,
    lastMaintenance: '2026-01-22',
    operatingHours: 2650,
    anomalyScore: 10,
    compressorStatus: 'normal',
    pumpStatus: 'normal',
    chuteStatus: 'normal',
    sensorHealth: 94,
    dustLevel: 'low'
  },
  {
    id: 'HV-3',
    name: 'Truck Load 12T',
    location: { lat: 11.9470, lng: 79.8077, address: 'Line 3, Area B' },
    status: 'maintenance',
    health: 72,
    fillStatus: 'Empty',
    currentPot: 'N/A',
    temperature: null,
    pressure: 0,
    voltage: 0,
    lastMaintenance: '2026-01-26',
    operatingHours: 3890,
    anomalyScore: 0,
    compressorStatus: 'offline',
    pumpStatus: 'offline',
    chuteStatus: 'offline',
    sensorHealth: 88,
    dustLevel: 'low'
  },
];

export default function PTMMonitoring() {
  const [selectedPTM, setSelectedPTM] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500/10 text-green-400',
      filling: 'bg-blue-500/10 text-blue-400',
      warning: 'bg-orange-500/10 text-orange-400',
      critical: 'bg-red-500/10 text-red-400',
      maintenance: 'bg-slate-500/10 text-slate-400',
      normal: 'bg-green-500/10 text-green-400',
      offline: 'bg-slate-500/10 text-slate-400',
    };
    return colors[status] || colors.active;
  };

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-400 bg-green-500';
    if (health >= 60) return 'text-orange-400 bg-orange-500';
    return 'text-red-400 bg-red-500';
  };

  const openInMaps = (lat, lng, name) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const filteredData = filterStatus === 'all' 
    ? ptmData 
    : ptmData.filter(ptm => ptm.status === filterStatus);

  const stats = {
    total: ptmData.length,
    active: ptmData.filter(p => p.status === 'active' || p.status === 'filling').length,
    warning: ptmData.filter(p => p.status === 'warning').length,
    critical: ptmData.filter(p => p.status === 'critical').length,
    avgHealth: Math.round(ptmData.reduce((acc, p) => acc + p.health, 0) / ptmData.length),
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Load Monitoring</h2>
            <p className="text-slate-400">Real-time tracking of Loaders</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilterStatus('all')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition"
            >
              <Filter size={16} /> Filter
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Loaders</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Activity size={32} className="text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active/Filling</p>
                <p className="text-3xl font-bold text-green-400">{stats.active}</p>
              </div>
              <Zap size={32} className="text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Warnings</p>
                <p className="text-3xl font-bold text-orange-400">{stats.warning}</p>
              </div>
              <AlertTriangle size={32} className="text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Critical</p>
                <p className="text-3xl font-bold text-red-400">{stats.critical}</p>
              </div>
              <AlertTriangle size={32} className="text-red-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Health</p>
                <p className="text-3xl font-bold text-purple-400">{stats.avgHealth}%</p>
              </div>
              <Activity size={32} className="text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'active', 'filling', 'warning', 'critical', 'maintenance'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md font-medium transition-all text-sm ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* PTM Table */}
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-700 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Loader ID</th>
                  <th className="p-4 font-medium">Equipment Name</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Current Eqpt</th>
                  <th className="p-4 font-medium">Health</th>
                  <th className="p-4 font-medium">Fill</th>
                  <th className="p-4 font-medium">Temp (°C)</th>
                  <th className="p-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredData.map((ptm) => (
                  <tr key={ptm.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium text-blue-400">{ptm.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{ptm.name}</p>
                        <p className="text-xs text-slate-500">
                          {ptm.operatingHours.toLocaleString()}h operated
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openInMaps(ptm.location.lat, ptm.location.lng, ptm.name)}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
                        title="Open in Google Maps"
                      >
                        <MapPin size={16} />
                        <span>{ptm.location.address}</span>
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ptm.status)}`}>
                        {ptm.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-200">{ptm.currentPot}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getHealthColor(ptm.health)}`}
                            style={{ width: `${ptm.health}%` }}
                          />
                        </div>
                        <span className={`font-semibold text-sm ${getHealthColor(ptm.health).split(' ')[0]}`}>
                          {ptm.health}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        ptm.fillStatus === 'Full' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {ptm.fillStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {ptm.temperature !== null ? (
                        <div className="flex items-center gap-2">
                          <ThermometerSun 
                            size={16} 
                            className={ptm.temperature > 90 ? 'text-red-400' : 'text-orange-400'} 
                          />
                          <span className={`font-semibold ${ptm.temperature > 90 ? 'text-red-400' : 'text-slate-200'}`}>
                            {ptm.temperature}°C
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedPTM(ptm)}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => openInMaps(ptm.location.lat, ptm.location.lng, ptm.name)}
                          className="flex items-center gap-1 text-green-400 hover:text-green-300 transition"
                          title="Open in Maps"
                        >
                          <Navigation size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Modal */}
        {selectedPTM && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPTM.name}</h2>
                  <p className="text-slate-400">{selectedPTM.id}</p>
                </div>
                <button
                  onClick={() => setSelectedPTM(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Operational Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <p className="text-slate-400 text-sm mb-2">Status</p>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedPTM.status)}`}>
                        {selectedPTM.status.toUpperCase()}
                      </span>
                    </Card>
                    <Card>
                      <p className="text-slate-400 text-sm mb-2">Current Eqpt</p>
                      <p className="text-xl font-bold text-white">{selectedPTM.currentPot}</p>
                    </Card>
                    <Card>
                      <p className="text-slate-400 text-sm mb-2">Health Score</p>
                      <p className={`text-xl font-bold ${getHealthColor(selectedPTM.health).split(' ')[0]}`}>
                        {selectedPTM.health}%
                      </p>
                    </Card>
                    <Card>
                      <p className="text-slate-400 text-sm mb-2">Fill Status</p>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        selectedPTM.fillStatus === 'Full' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {selectedPTM.fillStatus}
                      </span>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Environmental Parameters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedPTM.temperature !== null && (
                      <Card>
                        <div className="flex items-center gap-2 mb-2">
                          <ThermometerSun size={16} className="text-orange-400" />
                          <p className="text-slate-400 text-sm">Temperature</p>
                        </div>
                        <p className="text-xl font-bold text-white">{selectedPTM.temperature}°C</p>
                      </Card>
                    )}
                    <Card>
                      <div className="flex items-center gap-2 mb-2">
                        <Activity size={16} className="text-blue-400" />
                        <p className="text-slate-400 text-sm">Pressure</p>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedPTM.pressure} bar</p>
                    </Card>
                    <Card>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-yellow-400" />
                        <p className="text-slate-400 text-sm">Voltage</p>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedPTM.voltage}V</p>
                    </Card>
                    <Card>
                      <div className="flex items-center gap-2 mb-2">
                        <Wind size={16} className="text-green-400" />
                        <p className="text-slate-400 text-sm">Dust Level</p>
                      </div>
                      <p className="text-xl font-bold text-white capitalize">{selectedPTM.dustLevel}</p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Component Health</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Compressor', status: selectedPTM.compressorStatus },
                      { name: 'Pump', status: selectedPTM.pumpStatus },
                      { name: 'Chute', status: selectedPTM.chuteStatus },
                    ].map((component) => (
                      <Card key={component.name}>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200 font-medium">{component.name}</span>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(component.status)}`}>
                            {component.status.toUpperCase()}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Location & Operations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <div className="flex items-start gap-4">
                        <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-semibold mb-1">{selectedPTM.location.address}</p>
                          <p className="text-slate-400 text-sm">
                            {selectedPTM.location.lat.toFixed(4)}, {selectedPTM.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </Card>
                    <Card>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400 mb-1">Last Maintenance</p>
                          <p className="font-bold text-white">{selectedPTM.lastMaintenance}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1">Operating Hours</p>
                          <p className="font-bold text-white">{selectedPTM.operatingHours.toLocaleString()}h</p>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1">Anomaly Score</p>
                          <p className={`font-bold ${selectedPTM.anomalyScore > 50 ? 'text-red-400' : selectedPTM.anomalyScore > 25 ? 'text-orange-400' : 'text-green-400'}`}>
                            {selectedPTM.anomalyScore}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
