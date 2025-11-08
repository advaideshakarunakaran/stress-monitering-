import { useState, useEffect, useCallback, useRef } from 'react';
import { User, Vitals, VitalsHistoryPoint } from '../types';

const HISTORY_LENGTH = 30; // 30 points * 10 minutes = 5 hours of history
const HISTORY_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
const VITALS_UPDATE_INTERVAL = 2000; // 2 seconds

const calculateStress = (vitals: Vitals): number => {
  const hrScore = Math.max(0, Math.min(1, (vitals.heartRate - 70) / (140 - 70)));
  const o2Score = Math.max(0, Math.min(1, (96 - vitals.oxygenLevel) / (96 - 92)));
  const stress = (hrScore * 0.7 + o2Score * 0.3) * 100;
  return Math.max(0, Math.min(100, stress));
};

// Generates unique, plausible-looking history for each user.
const generateInitialUserHistory = (): VitalsHistoryPoint[] => {
    const history: VitalsHistoryPoint[] = [];
    const now = new Date();
    const historyPoints = 25; // Start with 25 points to see it grow
    let currentTime = new Date(now.getTime() - historyPoints * HISTORY_INTERVAL);

    // Give each user a slightly different baseline
    let heartRate = 70 + Math.random() * 20;
    let oxygenLevel = 96 + Math.random() * 3;

    for (let i = 0; i < historyPoints; i++) {
        // Simulate some vitals fluctuation
        heartRate += (Math.random() - 0.5) * 4 + Math.sin(i / (5 + Math.random() * 2)) * 5;
        oxygenLevel += (Math.random() - 0.5) * 0.2 - Math.cos(i/ (6 + Math.random() * 2)) * 0.3;
        
        const vitals = {
            heartRate: Math.max(60, Math.min(150, heartRate)),
            oxygenLevel: Math.max(92, Math.min(100, oxygenLevel)),
        };
        const stressLevel = calculateStress(vitals);
        
        const time = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
        
        history.push({
          ...vitals,
          time,
          stressLevel,
        });
        
        currentTime = new Date(currentTime.getTime() + HISTORY_INTERVAL);
    }
    return history;
};

const initialUsers: User[] = [
  { id: 1, name: 'Alex Doe', email: 'user@example.com', role: 'User', status: 'Active', vitals: { heartRate: 75, oxygenLevel: 98.5 }, stressLevel: 10, history: generateInitialUserHistory() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', vitals: { heartRate: 85, oxygenLevel: 97.5 }, stressLevel: 25, history: generateInitialUserHistory() },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active', vitals: { heartRate: 72, oxygenLevel: 99.0 }, stressLevel: 8, history: generateInitialUserHistory() },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', vitals: { heartRate: 0, oxygenLevel: 0 }, stressLevel: 0, history: [] },
  { id: 5, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', vitals: { heartRate: 110, oxygenLevel: 96.0 }, stressLevel: 75, history: generateInitialUserHistory() },
  { id: 6, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', vitals: { heartRate: 68, oxygenLevel: 98.2 }, stressLevel: 5, history: generateInitialUserHistory() },
];

const simulateVitalUpdate = (currentVitals: Vitals): Vitals => {
    const isStressed = Math.random() > 0.8;
    
    let hrChange = (Math.random() - 0.5) * 4;
    let o2Change = (Math.random() - 0.5) * 0.2;

    if (isStressed) {
      hrChange += Math.random() * 5;
      o2Change -= Math.random() * 0.3;
    } else {
       if (currentVitals.heartRate > 80) hrChange -= Math.random() * 2;
       if (currentVitals.heartRate < 70) hrChange += Math.random() * 2;
       if (currentVitals.oxygenLevel < 98) o2Change += Math.random() * 0.2;
    }
    
    const newHeartRate = Math.max(60, Math.min(150, currentVitals.heartRate + hrChange));
    const newOxygenLevel = Math.max(92, Math.min(100, currentVitals.oxygenLevel + o2Change));

    return { heartRate: newHeartRate, oxygenLevel: newOxygenLevel };
};

interface UseAdminDataProps {
    onHighStress?: (user: User, stressLevel: number) => void;
}

export const useAdminData = ({ onHighStress }: UseAdminDataProps = {}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [stats, setStats] = useState({
      totalUsers: 0,
      activeNow: 0,
      avgStressLevel: 0,
  });
  const lastHistoryTime = useRef<number>(Date.now());

  const updateAllVitals = useCallback(() => {
    const shouldRecordHistory = Date.now() - lastHistoryTime.current >= HISTORY_INTERVAL;
    if(shouldRecordHistory) {
        lastHistoryTime.current = Date.now();
    }

    setUsers(currentUsers => 
      currentUsers.map(user => {
        if (user.status === 'Inactive' || !user.vitals) {
          return user;
        }
        
        const newVitals = simulateVitalUpdate(user.vitals);
        const newStressLevel = calculateStress(newVitals);

        if (onHighStress && newStressLevel > 50 && (!user.stressLevel || user.stressLevel <= 50)) {
            onHighStress(user, newStressLevel);
        }

        let updatedHistory = user.history || [];
        if(shouldRecordHistory) {
            const now = new Date();
            const newPoint: VitalsHistoryPoint = {
                ...newVitals,
                time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
                stressLevel: newStressLevel,
            };
            
            updatedHistory = [...updatedHistory, newPoint];
            if (updatedHistory.length > HISTORY_LENGTH) {
                updatedHistory.shift();
            }
        }
        
        return { ...user, vitals: newVitals, stressLevel: newStressLevel, history: updatedHistory };
      })
    );
  }, [onHighStress]);

  useEffect(() => {
    const interval = setInterval(updateAllVitals, VITALS_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [updateAllVitals]);

  useEffect(() => {
    const activeUsers = users.filter(u => u.status === 'Active');
    const totalStress = activeUsers.reduce((sum, user) => sum + (user.stressLevel || 0), 0);
    const avgStress = activeUsers.length > 0 ? totalStress / activeUsers.length : 0;

    setStats({
        totalUsers: users.length,
        activeNow: activeUsers.length,
        avgStressLevel: avgStress,
    });
  }, [users]);

  return { users, stats };
};