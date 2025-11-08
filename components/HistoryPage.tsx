import React from 'react';
import { VitalsHistoryPoint } from '../types';
import DataChart from './DataChart';

interface HistoryPageProps {
    data: VitalsHistoryPoint[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ data }) => {
    const stats = {
        avgHeartRate: data.length > 0 ? data.reduce((sum, p) => sum + p.heartRate, 0) / data.length : 0,
        avgOxygen: data.length > 0 ? data.reduce((sum, p) => sum + p.oxygenLevel, 0) / data.length : 0,
        avgStress: data.length > 0 ? data.reduce((sum, p) => sum + p.stressLevel, 0) / data.length : 0,
        peakStress: data.length > 0 ? Math.max(...data.map(p => p.stressLevel)) : 0,
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Vitals History</h1>
                <p className="text-slate-400 mt-2">Review your historical wellness data and trends.</p>
            </header>

            <section className="bg-slate-800/50 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-sm border border-slate-700 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-300 mb-4 ml-2">Trends Overview</h2>
                <DataChart data={data} />
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-sm">Avg. Heart Rate</p>
                    <p className="text-2xl font-bold text-white">{stats.avgHeartRate.toFixed(0)} BPM</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-sm">Avg. Oxygen Level</p>
                    <p className="text-2xl font-bold text-white">{stats.avgOxygen.toFixed(1)}%</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-sm">Avg. Stress</p>
                    <p className="text-2xl font-bold text-white">{stats.avgStress.toFixed(0)}%</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-sm">Peak Stress</p>
                    <p className="text-2xl font-bold text-white">{stats.peakStress.toFixed(0)}%</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Detailed Log</h2>
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-y-auto max-h-[400px]">
                        <table className="w-full text-left">
                            <thead className="bg-slate-700/50 sticky top-0">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-300">Time</th>
                                    <th className="p-4 font-semibold text-slate-300">Heart Rate (BPM)</th>
                                    <th className="p-4 font-semibold text-slate-300">Oxygen (SpO₂)</th>
                                    <th className="p-4 font-semibold text-slate-300">Stress Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...data].reverse().map((point, index) => (
                                    <tr key={`${point.time}-${index}`} className="border-t border-slate-700">
                                        <td className="p-4 font-mono text-slate-400">{point.time}</td>
                                        <td className="p-4 text-white">{point.heartRate.toFixed(0)}</td>
                                        <td className="p-4 text-white">{point.oxygenLevel.toFixed(1)}%</td>
                                        <td className="p-4 text-white">{point.stressLevel.toFixed(0)}%</td>
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

export default HistoryPage;