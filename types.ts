import React from 'react';

export interface Vitals {
  heartRate: number;
  oxygenLevel: number;
}

export interface VitalsHistoryPoint extends Vitals {
  time: string;
  stressLevel: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
  vitals?: Vitals;
  stressLevel?: number;
  history?: VitalsHistoryPoint[];
}

export interface Activity {
  id: number;
  icon: React.ReactNode;
  description: string;
  timestamp: string;
}

export interface Notification {
    id: string;
    user: {
        id: number;
        name: string;
    };
    stressLevel: number;
    timestamp: string;
    read: boolean;
}