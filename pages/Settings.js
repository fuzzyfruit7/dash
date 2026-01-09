import React from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/SharedComponents';
import { Settings as SettingsIcon, User, Bell, Database, Shield, Save } from 'lucide-react';

export default function Settings() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-slate-400">Configure system preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <User size={24} className="text-blue-400" />
              <h3 className="text-lg font-semibold text-white">User Profile</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="Tanmay Operator"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="tanmay@nalco.com"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue="Operator"
                  disabled
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-slate-400"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Bell size={24} className="text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-slate-300">Critical Alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-slate-300">Warning Alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-slate-300">Maintenance Reminders</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-slate-300">Email Notifications</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-slate-300">SMS Notifications</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
            </div>
          </Card>

          {/* System Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon size={24} className="text-green-400" />
              <h3 className="text-lg font-semibold text-white">System</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Refresh Interval</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>30 seconds</option>
                  <option>1 minute</option>
                  <option>5 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Theme</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Language</label>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition font-semibold">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
