import React, { useState } from 'react';
import { UsersIcon, HeartIcon, PulseIcon, WarningIcon, BellIcon } from '../constants';
import { useAdminData } from '../hooks/useAdminData';
import { User, Notification } from '../types';
import UserVitalsModal from './UserVitalsModal';
import { useNotifications } from '../hooks/useNotifications';


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

const NotificationsPanel: React.FC<{ notifications: Notification[], isOpen: boolean }> = ({ notifications, isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute top-14 right-0 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-20">
            <div className="p-3 border-b border-slate-700">
                <h3 className="font-semibold text-white">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-slate-400 text-center p-4">No new notifications.</p>
                ) : (
                    <ul>
                        {[...notifications].reverse().map(notif => (
                            <li key={notif.id} className={`border-b border-slate-700 p-3 ${!notif.read ? 'bg-cyan-500/10' : ''}`}>
                                <p className="text-sm text-white font-medium">{notif.user.name} has high stress</p>
                                <p className="text-xs text-slate-400">
                                    Stress Level: <span className="font-bold text-red-400">{notif.stressLevel.toFixed(0)}%</span> - {notif.timestamp}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

const AdminPanel: React.FC = () => {
    const { notifications, unreadCount, addNotification, markAllAsRead } = useNotifications();
    const { users, stats } = useAdminData({ onHighStress: addNotification });
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const highStressUsers = users.filter(u => u.status === 'Active' && u.stressLevel && u.stressLevel >= 60);

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        if (!isNotificationsOpen) {
            markAllAsRead();
        }
    }

    return (
        <div>
            <header className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Admin Panel</h1>
                    <p className="text-slate-400 mt-2">Real-time system overview and user management.</p>
                </div>
                <div className="relative">
                    <button onClick={toggleNotifications} className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-full bg-slate-800/50 border border-slate-700">
                        <BellIcon />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <NotificationsPanel notifications={notifications} isOpen={isNotificationsOpen} />
                </div>
            </header>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-white mb-4">Live System Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard icon={<UsersIcon />} label="Total Users" value={stats.totalUsers.toString()} />
                    <StatCard icon={<PulseIcon />} label="Active Now" value={stats.activeNow.toString()} />
                    <StatCard icon={<HeartIcon />} label="Avg. Stress Level" value={`${stats.avgStressLevel.toFixed(0)}%`} />
                </div>
            </section>
            
            {highStressUsers.length > 0 && (
                 <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <WarningIcon />
                        High-Stress Alerts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highStressUsers.map(user => (
                            <div key={user.id} className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-white">{user.name}</p>
                                        <p className="text-sm text-amber-300">High Stress Detected</p>
                                    </div>
                                    <p className="text-xl font-bold text-amber-300">{user.stressLevel?.toFixed(0)}%</p>
                                </div>
                                <button onClick={() => setSelectedUser(user)} className="mt-3 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                                    View Details &rarr;
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Live User Monitoring</h2>
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-300">Name</th>
                                    <th className="p-4 font-semibold text-slate-300">Status</th>
                                    <th className="p-4 font-semibold text-slate-300">Current Vitals</th>
                                    <th className="p-4 font-semibold text-slate-300">Stress Level</th>
                                    <th className="p-4 font-semibold text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className={`border-t border-slate-700 transition-colors duration-300 ${index % 2 === 1 ? 'bg-slate-800/20' : ''} ${user.stressLevel && user.stressLevel > 50 ? 'bg-red-500/10' : ''}`}>
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
                                                    <span className={`font-mono w-12 text-right ${user.stressLevel > 50 ? 'text-red-400' : ''}`}>{user.stressLevel.toFixed(0)}%</span>
                                                    <StressBar level={user.stressLevel} />
                                                </div>
                                            ) : (
                                                <span>--</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <button onClick={() => setSelectedUser(user)} className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                                                View History
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <UserVitalsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        </div>
    );
};

export default AdminPanel;