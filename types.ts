
export interface Vitals {
  heartRate: number;
  oxygenLevel: number;
}

export interface VitalsHistoryPoint extends Vitals {
  time: string;
}
