import React, { useEffect, useState } from 'react';
import { VitalsHistoryPoint } from '../types';

// This is a placeholder for recharts, as we cannot import it directly.
// We assume it's available on the window object from a CDN script in index.html.
declare global {
    interface Window {
        Recharts: any;
    }
}

interface DataChartProps {
    data: VitalsHistoryPoint[];
}

// Stub components to satisfy JSX syntax
const LineChart: React.FC<any> = ({ children, ...props }) => React.createElement(window.Recharts?.LineChart, props, children);
const CartesianGrid: React.FC<any> = (props) => React.createElement(window.Recharts?.CartesianGrid, props);
const XAxis: React.FC<any> = (props) => React.createElement(window.Recharts?.XAxis, props);
const YAxis: React.FC<any> = (props) => React.createElement(window.Recharts?.YAxis, props);
const Tooltip: React.FC<any> = (props) => React.createElement(window.Recharts?.Tooltip, props);
const Legend: React.FC<any> = (props) => React.createElement(window.Recharts?.Legend, props);
const Line: React.FC<any> = (props) => React.createElement(window.Recharts?.Line, props);
const ResponsiveContainer: React.FC<any> = ({ children, ...props }) => React.createElement(window.Recharts?.ResponsiveContainer, props, children);


const DataChart: React.FC<DataChartProps> = ({ data }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Recharts depends on window, so we only render it on the client side.
        setIsClient(true);
    }, []);

    if (!isClient || !window.Recharts) {
        return (
            <div className="flex items-center justify-center h-80 bg-slate-800 rounded-lg">
                <p className="text-slate-400">Loading Chart...</p>
            </div>
        );
    }
    
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#ef4444" fontSize={12} domain={[60, 150]} />
                    <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                        }}
                        labelStyle={{ color: '#d1d5db' }}
                    />
                    <Legend iconSize={10} />
                    <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="oxygenLevel" name="Oxygen Level" stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={{ r: 6 }}/>
                    <Line yAxisId="right" type="monotone" dataKey="stressLevel" name="Stress Level" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 6 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataChart;