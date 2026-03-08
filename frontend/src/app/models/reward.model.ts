import { Employee } from './employee.model'; 
import { RewardType } from './reward-type.model';

export interface Reward {
  id?: number;
  employee: Employee;
  rewardName: string;
  dateAwarded: string; // ISO date string (YYYY-MM-DD)
  type: RewardType;
  points: number;
}
