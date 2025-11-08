import React, { useState } from 'react';
import { useVitals } from './hooks/useVitals';
import MetricCard from './components/MetricCard';
import StressGauge from './components/StressGauge';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import HistoryPage from './components/HistoryPage';
import { HeartIcon, LungsIcon, PulseIcon, LogoutIcon, DashboardIcon, UserIcon, AdminIcon, HistoryIcon } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<{ email: string; role: 'user' | 'admin' } | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile' | 'admin' | 'history'>('dashboard');
  const { vitals, stressLevel, history } = useVitals();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;

    if (email.toLowerCase() === 'admin@example.com') {
      setUser({ email, role: 'admin' });
    } else {
      setUser({ email, role: 'user' });
    }
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard'); // Reset to default page on logout
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700 shadow-2xl shadow-cyan-500/10">
          <h1 className="text-3xl font-bold text-center text-cyan-300 mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-center mb-2">Sign in to access your dashboard.</p>
          <p className="text-slate-500 text-center text-xs mb-8">Try <code className="bg-slate-700 px-1 rounded">admin@example.com</code> for admin access.</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-400 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
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

  const NavLink: React.FC<{
    page: 'dashboard' | 'profile' | 'admin' | 'history';
    children: React.ReactNode;
  }> = ({ page, children }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        currentPage === page
          ? 'bg-cyan-500/20 text-cyan-300'
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
  
  const DashboardContent = () => (
    <>
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Real-Time Stress Monitor</h1>
          <p className="text-slate-400 mt-2">Welcome back, {user?.email}!</p>
        </div>
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
      </main>
    </>
  );


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-slate-800/50 border-r border-slate-700 p-4 flex flex-col">
          <div className="text-2xl font-bold text-cyan-300 mb-10">Wellness+</div>
          <nav className="flex flex-col space-y-2">
             <NavLink page="dashboard">
                <DashboardIcon />
                <span>Dashboard</span>
            </NavLink>
            <NavLink page="history">
                <HistoryIcon />
                <span>History</span>
            </NavLink>
            <NavLink page="profile">
                <UserIcon />
                <span>Profile</span>
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink page="admin">
                  <AdminIcon />
                  <span>Admin Panel</span>
              </NavLink>
            )}
          </nav>
          <div className="mt-auto">
             <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-slate-400 hover:bg-slate-700/50 hover:text-white"
                aria-label="Logout"
                >
                <LogoutIcon />
                <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentPage === 'dashboard' && <DashboardContent />}
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'history' && <HistoryPage data={history} />}
            {currentPage === 'admin' && user?.role === 'admin' && <AdminPanel />}
            
            <footer className="text-center mt-12 text-slate-500 text-sm">
                <p>This application provides simulated data for demonstration purposes only.</p>
                <p>&copy; 2024 Wellness Dashboard. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;