import { useState, useEffect, useCallback } from 'react';
import { Vitals, VitalsHistoryPoint } from '../types';

const HISTORY_LENGTH = 30;

// Helper to calculate stress level
const calculateStress = (vitals: Vitals): number => {
  // Normalize heart rate (assuming normal is 60-100, stress range 100-140)
  const hrScore = Math.max(0, Math.min(1, (vitals.heartRate - 70) / (140 - 70)));

  // Normalize oxygen level (assuming normal is 95-100, stress when dropping to 90)
  // Inverted score: lower oxygen = higher score
  const o2Score = Math.max(0, Math.min(1, (96 - vitals.oxygenLevel) / (96 - 92)));

  // Weighted average
  const stress = (hrScore * 0.7 + o2Score * 0.3) * 100;
  return Math.max(0, Math.min(100, stress));
};

export const useVitals = () => {
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 75,
    oxygenLevel: 98.5,
  });
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [history, setHistory] = useState<VitalsHistoryPoint[]>([]);

  const updateVitals = useCallback(() => {
    setVitals(prevVitals => {
      const isStressed = Math.random() > 0.8; // Chance to enter a stressed state
      
      let hrChange = (Math.random() - 0.5) * 4; // small fluctuation
      let o2Change = (Math.random() - 0.5) * 0.2; // small fluctuation

      if (isStressed) {
        hrChange += Math.random() * 5; // increase HR
        o2Change -= Math.random() * 0.3; // decrease O2
      } else {
         // Tendency to return to normal
         if (prevVitals.heartRate > 80) hrChange -= Math.random() * 2;
         if (prevVitals.heartRate < 70) hrChange += Math.random() * 2;
         if (prevVitals.oxygenLevel < 98) o2Change += Math.random() * 0.2;
      }
      
      const newHeartRate = Math.max(60, Math.min(150, prevVitals.heartRate + hrChange));
      const newOxygenLevel = Math.max(92, Math.min(100, prevVitals.oxygenLevel + o2Change));

      return {
        heartRate: newHeartRate,
        oxygenLevel: newOxygenLevel,
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateVitals, 2000);
    return () => clearInterval(interval);
  }, [updateVitals]);
  
  useEffect(() => {
    const newStressLevel = calculateStress(vitals);
    setStressLevel(newStressLevel);

    setHistory(prevHistory => {
      const now = new Date();
      const newPoint: VitalsHistoryPoint = {
        ...vitals,
        time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
        stressLevel: newStressLevel,
      };
      const updatedHistory = [...prevHistory, newPoint];
      if (updatedHistory.length > HISTORY_LENGTH) {
        return updatedHistory.slice(1);
      }
      return updatedHistory;
    });
  }, [vitals]);

  return { vitals, stressLevel, history };
};