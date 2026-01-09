import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { Wrench, Calendar, Clock, CheckCircle, AlertCircle, Plus, Filter } from 'lucide-react';

const maintenanceData = [
  {
    id: 1,
    motor: 'IDF301',
    motorName: 'ID Fan 1',
    type: 'Emergency',
    task: 'Bearing Replacement',
    priority: 'critical',
    scheduled: '2026-01-12',
    status: 'pending',
    assignedTo: 'Team A',
    estimatedHours: 8
  },
  {
    id: 2,
    motor: 'MEF701',
    motorName: 'Main Exhaust Fan 1',
    type: 'Preventive',
    task: 'Lubrication & Inspection',
    priority: 'medium',
    scheduled: '2026-01-15',
    status: 'scheduled',
    assignedTo: 'Team B',
    estimatedHours: 4
  },
  {
    id: 3,
    motor: 'PAF402',
    motorName: 'PA Fan 2',
    type: 'Predictive',
    task: 'Vibration Analysis',
    priority: 'low',
    scheduled: '2026-01-18',
    status: 'scheduled',
    assignedTo: 'Team C',
    estimatedHours: 2
  },
  {
    id: 4,
    motor: 'MEF702',
    motorName: 'Main Exhaust Fan 2',
    type: 'Corrective',
    task: 'Winding Repair',
    priority: 'high',
    scheduled: '2026-01-10',
    status: 'in-progress',
    assignedTo: 'Team A',
    estimatedHours: 12
  },
  {
    id: 5,
    motor: 'IDF302',
    motorName: 'ID Fan 2',
    type: 'Preventive',
    task: 'General Inspection',
    priority: 'low',
    scheduled: '2026-01-08',
    status: 'completed',
    assignedTo: 'Team B',
    estimatedHours: 3
  },
];

export default function Maintenance() {
  const [filter, setFilter] = useState('all');

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-red-500 bg-red-500/10',
      high: 'text-orange-500 bg-orange-500/10',
      medium: 'text-yellow-500 bg-yellow-500/10',
      low: 'text-green-500 bg-green-500/10',
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-red-400 bg-red-500/10',
      scheduled: 'text-blue-400 bg-blue-500/10',
      'in-progress': 'text-orange-400 bg-orange-500/10',
      completed: 'text-green-400 bg-green-500/10',
    };
    return colors[status];
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Maintenance Schedule</h2>
            <p className="text-slate-400">Plan and track maintenance activities</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-md transition">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md transition">
              <Plus size={16} /> New Task
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-red-400">1</p>
              </div>
              <AlertCircle size={32} className="text-red-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Scheduled</p>
                <p className="text-3xl font-bold text-blue-400">2</p>
              </div>
              <Calendar size={32} className="text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-orange-400">1</p>
              </div>
              <Clock size={32} className="text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-400">1</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </Card>
        </div>

        {/* Maintenance Table */}
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-700 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Motor</th>
                <th className="p-4 font-medium">Task</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Priority</th>
                <th className="p-4 font-medium">Scheduled</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Assigned To</th>
                <th className="p-4 font-medium">Est. Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {maintenanceData.map((task) => (
                <tr key={task.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">{task.motor}</p>
                      <p className="text-xs text-slate-400">{task.motorName}</p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-200">{task.task}</td>
                  <td className="p-4 text-slate-200">{task.type}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-4 text-slate-200">{task.scheduled}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-200">{task.assignedTo}</td>
                  <td className="p-4 text-slate-200">{task.estimatedHours}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  );
}
