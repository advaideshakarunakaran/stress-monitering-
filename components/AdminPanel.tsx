import React from 'react';
import { UsersIcon, HeartIcon, PulseIcon } from '../constants';
import { useAdminData } from '../hooks/useAdminData';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl flex items-center space-x-4 backdrop-blur-sm border border-slate-700">
        <div className="bg-slate-700/50 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-slate-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const StressBar: React.FC<{ level: number }> = ({ level }) => {
    const getBarColor = () => {
        if (level < 30) return "bg-green-500";
        if (level < 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="w-full bg-slate-600 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${getBarColor()}`}
                style={{ width: `${level}%` }}
            ></div>
        </div>
    );
};


const AdminPanel: React.FC = () => {
    const { users, stats } = useAdminData();

    const handleUserAction = (action: string, userName: string) => {
        alert(`${action} action for user: ${userName} (Simulation)`);
    };
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Admin Panel</h1>
                <p className="text-slate-400 mt-2">Real-time system overview and user management.</p>
            </header>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-white mb-4">Live System Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard icon={<UsersIcon />} label="Total Users" value={stats.totalUsers.toString()} />
                    <StatCard icon={<PulseIcon />} label="Active Now" value={stats.activeNow.toString()} />
                    <StatCard icon={<HeartIcon />} label="Avg. Stress Level" value={`${stats.avgStressLevel.toFixed(0)}%`} />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Live User Monitoring</h2>
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-300">Name</th>
                                    <th className="p-4 font-semibold text-slate-300">Status</th>
                                    <th className="p-4 font-semibold text-slate-300">Role</th>
                                    <th className="p-4 font-semibold text-slate-300">Current Vitals</th>
                                    <th className="p-4 font-semibold text-slate-300">Stress Level</th>
                                    <th className="p-4 font-semibold text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className={`border-t border-slate-700 transition-colors duration-300 ${index % 2 === 1 ? 'bg-slate-800/20' : ''}`}>
                                        <td className="p-4">
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-sm text-slate-400">{user.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-300">{user.role}</td>
                                        <td className="p-4 text-slate-300 font-mono text-sm">
                                            {user.status === 'Active' && user.vitals ? (
                                                <div className="flex items-center space-x-4">
                                                    <span>HR: {user.vitals.heartRate.toFixed(0)}</span>
                                                    <span>O₂: {user.vitals.oxygenLevel.toFixed(1)}%</span>
                                                </div>
                                            ) : (
                                                <span>--</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {user.status === 'Active' && typeof user.stressLevel !== 'undefined' ? (
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-mono w-12 text-right">{user.stressLevel.toFixed(0)}%</span>
                                                    <StressBar level={user.stressLevel} />
                                                </div>
                                            ) : (
                                                <span>--</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleUserAction('Edit', user.name)} className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">Edit</button>
                                                <button onClick={() => handleUserAction('Delete', user.name)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminPanel;