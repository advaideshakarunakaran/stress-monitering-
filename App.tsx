
import React, { useState } from 'react';
import { useVitals } from './hooks/useVitals';
import MetricCard from './components/MetricCard';
import StressGauge from './components/StressGauge';
import DataChart from './components/DataChart';
import { HeartIcon, LungsIcon, PulseIcon, LogoutIcon } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { vitals, stressLevel, history } = useVitals();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate credentials here.
    // For this simulation, we'll just grant access.
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700 shadow-2xl shadow-cyan-500/10">
          <h1 className="text-3xl font-bold text-center text-cyan-300 mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-center mb-8">Sign in to access your dashboard</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-400 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue="user@example.com"
                className="shadow appearance-none border border-slate-600 rounded-lg w-full py-3 px-4 bg-slate-700/50 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-400 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                defaultValue="password"
                className="shadow appearance-none border border-slate-600 rounded-lg w-full py-3 px-4 bg-slate-700/50 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard if authenticated
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Real-Time Stress Monitor</h1>
            <p className="text-slate-400 mt-2">Your personal wellness dashboard.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-slate-700/50 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center sm:justify-start space-x-2 transition-colors duration-300 border border-slate-600 self-start sm:self-center"
            aria-label="Logout"
            >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <MetricCard
              label="Heart Rate"
              value={vitals.heartRate.toFixed(0)}
              unit="BPM"
              icon={<HeartIcon />}
            />
            <MetricCard
              label="Pulse Rate"
              value={vitals.heartRate.toFixed(0)}
              unit="BPM"
              icon={<PulseIcon />}
            />
            <MetricCard
              label="Oxygen Level"
              value={vitals.oxygenLevel.toFixed(1)}
              unit="SpO₂ %"
              icon={<LungsIcon />}
            />
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] lg:min-h-0 backdrop-blur-sm border border-slate-700 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold text-slate-300 mb-4">Current Stress Level</h2>
            <StressGauge percentage={stressLevel} />
          </div>

          <div className="lg:col-span-3 bg-slate-800/50 rounded-2xl p-4 sm:p-6 mt-4 backdrop-blur-sm border border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-300 mb-4 ml-2">Vitals History</h2>
            <DataChart data={history} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>This application provides simulated data for demonstration purposes only.</p>
            <p>&copy; 2024 Wellness Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
