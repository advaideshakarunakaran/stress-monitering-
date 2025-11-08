import React from 'react';
import { User } from '../types';
import DataChart from './DataChart';
import MetricCard from './MetricCard';
import { HeartIcon, LungsIcon } from '../constants';
import StressGauge from './StressGauge';

interface UserVitalsModalProps {
    user: User | null;
    onClose: () => void;
}

const UserVitalsModal: React.FC<UserVitalsModalProps> = ({ user, onClose }) => {
    if (!user) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-slate-800/80 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-cyan-300">{user.name}'s Vitals</h2>
                        <p className="text-slate-400">{user.email}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-2 rounded-full bg-slate-700/50 hover:bg-slate-700"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex flex-col gap-6">
                         {user.vitals && (
                            <MetricCard
                                label="Heart Rate"
                                value={user.vitals.heartRate.toFixed(0)}
                                unit="BPM"
                                icon={<HeartIcon />}
                            />
                         )}
                         {user.vitals && (
                            <MetricCard
                                label="Oxygen Level"
                                value={user.vitals.oxygenLevel.toFixed(1)}
                                unit="SpO₂ %"
                                icon={<LungsIcon />}
                            />
                         )}
                    </div>
                    <div className="lg:col-span-2 bg-slate-900/50 rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-700">
                         <h3 className="text-xl font-semibold text-slate-300 mb-2">Current Stress Level</h3>
                         {typeof user.stressLevel !== 'undefined' ? (
                            <StressGauge percentage={user.stressLevel} />
                         ) : <p className="text-slate-500">No stress data available.</p>}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Recent History</h3>
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700">
                        {user.history && user.history.length > 0 ? (
                           <DataChart data={user.history} />
                        ): (
                            <div className="flex items-center justify-center h-40">
                                <p className="text-slate-500">No historical data available for this user.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserVitalsModal;
