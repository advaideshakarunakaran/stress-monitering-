import { useState, useEffect, useCallback } from 'react';
import { User, Vitals } from '../types';

const initialUsers: User[] = [
  { id: 1, name: 'Alex Doe', email: 'user@example.com', role: 'User', status: 'Active', vitals: { heartRate: 75, oxygenLevel: 98.5 }, stressLevel: 10 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', vitals: { heartRate: 85, oxygenLevel: 97.5 }, stressLevel: 25 },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active', vitals: { heartRate: 72, oxygenLevel: 99.0 }, stressLevel: 8 },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', vitals: { heartRate: 0, oxygenLevel: 0 }, stressLevel: 0 },
  { id: 5, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', vitals: { heartRate: 110, oxygenLevel: 96.0 }, stressLevel: 75 },
  { id: 6, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active', vitals: { heartRate: 68, oxygenLevel: 98.2 }, stressLevel: 5 },
];

const calculateStress = (vitals: Vitals): number => {
  const hrScore = Math.max(0, Math.min(1, (vitals.heartRate - 70) / (140 - 70)));
  const o2Score = Math.max(0, Math.min(1, (96 - vitals.oxygenLevel) / (96 - 92)));
  const stress = (hrScore * 0.7 + o2Score * 0.3) * 100;
  return Math.max(0, Math.min(100, stress));
};

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


export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [stats, setStats] = useState({
      totalUsers: 0,
      activeNow: 0,
      avgStressLevel: 0,
  });

  const updateAllVitals = useCallback(() => {
    setUsers(currentUsers => 
      currentUsers.map(user => {
        if (user.status === 'Inactive' || !user.vitals) {
          return user;
        }
        
        const newVitals = simulateVitalUpdate(user.vitals);
        const newStressLevel = calculateStress(newVitals);

        return { ...user, vitals: newVitals, stressLevel: newStressLevel };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateAllVitals, 2000);
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