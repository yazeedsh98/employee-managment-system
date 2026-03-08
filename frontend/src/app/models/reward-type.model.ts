export type RewardType = 
  | 'EMPLOYEE_OF_THE_MONTH'
  | 'INNOVATION_AWARD'
  | 'TEAM_PLAYER_AWARD';

export const RewardTypeLabels: Record<RewardType, string> = {
  EMPLOYEE_OF_THE_MONTH: 'Employee of the Month',
  INNOVATION_AWARD: 'Innovation Award',
  TEAM_PLAYER_AWARD: 'Team Player Award'
};
 
export const RewardTypes: RewardType[] = [
  'EMPLOYEE_OF_THE_MONTH',
  'INNOVATION_AWARD',
  'TEAM_PLAYER_AWARD'
];