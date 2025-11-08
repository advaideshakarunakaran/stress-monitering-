import React from 'react';

// Mock data for historical sessions
const mockHistoryData = [
  { id: 'S001', date: '2024-07-28', duration: '30 mins', avgHeartRate: 85, avgOxygen: 97.5, peakStress: 55, stressCategory: 'Moderate' },
  { id: 'S002', date: '2024-07-27', duration: '45 mins', avgHeartRate: 72, avgOxygen: 98.2, peakStress: 25, stressCategory: 'Relaxed' },
  { id: 'S003', date: '2024-07-26', duration: '20 mins', avgHeartRate: 110, avgOxygen: 94.1, peakStress: 82, stressCategory: 'High' },
  { id: 'S004', date: '2024-07-25', duration: '60 mins', avgHeartRate: 78, avgOxygen: 98.0, peakStress: 40, stressCategory: 'Moderate' },
  { id: 'S005', date: '2024-07-24', duration: '25 mins', avgHeartRate: 68, avgOxygen: 99.1, peakStress: 18, stressCategory: 'Relaxed' },
  { id: 'S006', date: '2024-07-23', duration: '35 mins', avgHeartRate: 95, avgOxygen: 96.5, peakStress: 71, stressCategory: 'High' },
];

const getStressColor = (category: string) => {
  switch (category) {
    case 'Relaxed': return 'text-green-400 bg-green-500/10';
    case 'Moderate': return 'text-yellow-400 bg-yellow-500/10';
    case 'High': return 'text-red-400 bg-red-500/10';
    default: return 'text-slate-400';
  }
};

const HistoryPage: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300">Session History</h1>
        <p className="text-slate-400 mt-2">Review your past wellness monitoring sessions.</p>
      </header>
      
      <main className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 font-semibold text-slate-300">Date</th>
                <th className="p-4 font-semibold text-slate-300">Duration</th>
                <th className="p-4 font-semibold text-slate-300">Avg. Heart Rate</th>
                <th className="p-4 font-semibold text-slate-300">Avg. Oxygen</th>
                <th className="p-4 font-semibold text-slate-300">Peak Stress</th>
                <th className="p-4 font-semibold text-slate-300">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockHistoryData.map((session) => (
                <tr key={session.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-slate-400">{session.date}</td>
                  <td className="p-4 text-slate-400">{session.duration}</td>
                  <td className="p-4 text-white font-medium">{session.avgHeartRate} BPM</td>
                  <td className="p-4 text-white font-medium">{session.avgOxygen}%</td>
                  <td className="p-4 text-white font-medium">{session.peakStress}%</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStressColor(session.stressCategory)}`}>
                      {session.stressCategory}
                    </span>
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

export default HistoryPage;