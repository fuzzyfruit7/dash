import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FleetOverview from './pages/FleetOverview';
import Alerts from './pages/Alerts';
import Maintenance from './pages/Maintenance';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import MotorDetail from './pages/MotorDetail';
import VibrationFFT from './pages/VibrationFFT';
import FaultDiagnosis from './pages/FaultDiagnosis';
import FaultDiagnosisSecondary from './pages/FaultDiagnosisSecondary';
import TemperatureTrends from './pages/TemperatureTrends';
import RMSKurtosis from './pages/RMSKurtosis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FleetOverview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fleet" element={<FleetOverview />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/motor/:id" element={<MotorDetail />} />
        <Route path="/vibration-fft" element={<VibrationFFT />} />
        <Route path="/fault-diagnosis" element={<FaultDiagnosis />} />
        <Route path="/fault-diagnosis-secondary" element={<FaultDiagnosisSecondary />} />
        <Route path="/temperature-trends" element={<TemperatureTrends />} />
        <Route path="/rms-kurtosis" element={<RMSKurtosis />} />
      </Routes>
    </Router>
  );
}

export default App;
