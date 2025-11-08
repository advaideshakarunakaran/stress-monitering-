import React from 'react';

// Mock data for the admin panel
const mockStats = {
  totalUsers: 142,
  activeSessions: 12,
  avgStress: '48%',
  historyRecords: 891,
};

const mockUsers = [
  { id: 'U001', name: 'Alex Doe', email: 'alex.doe@example.com', lastActive: '2 min ago', status: 'Active' },
  { id: 'U002', name: 'Jane Smith', email: 'jane.smith@example.com', lastActive: '1 hour ago', status: 'Active' },
  { id: 'U003', name: 'Sam Wilson', email: 'sam.wilson@example.com', lastActive: '2 days ago', status: 'Active' },
  { id: 'U004', name: 'Chris Lee', email: 'chris.lee@example.com', lastActive: '1 week ago', status: 'Banned' },
  { id: 'U005', name: 'Patricia Garcia', email: 'pat.g@example.com', lastActive: '3 days ago', status: 'Active' },
];

const getStatusColor = (status: string) => {
  return status === 'Active' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10';
};

const AdminPage: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Admin Panel</h1>
        <p className="text-slate-400 mt-2">Manage users and view application statistics.</p>
      </header>
      
      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700">
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="text-3xl font-bold text-white">{mockStats.totalUsers}</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700">
            <p className="text-sm text-slate-400">Active Sessions</p>
            <p className="text-3xl font-bold text-white">{mockStats.activeSessions}</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700">
            <p className="text-sm text-slate-400">Average Stress Level</p>
            <p className="text-3xl font-bold text-white">{mockStats.avgStress}</p>
        </div>
         <div className="bg-slate-800/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700">
            <p className="text-sm text-slate-400">History Records</p>
            <p className="text-3xl font-bold text-white">{mockStats.historyRecords}</p>
        </div>
      </section>

      {/* User Management Table */}
      <main className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700 shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 font-semibold text-slate-300">User</th>
                <th className="p-4 font-semibold text-slate-300">Last Active</th>
                <th className="p-4 font-semibold text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                  </td>
                  <td className="p-4 text-slate-400">{user.lastActive}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">Edit</button>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">History</button>
                    <button className="text-red-400 hover:text-red-300 text-sm font-semibold">Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
