export interface EmployeeCountResponse {
  totalEmployees: number;
  timestamp: string;
}

export interface RewardsPerMonthResponse {
  rewardsPerMonth: RewardsPerMonthItem[];
  timestamp: string;
}

export interface RewardsPerMonthItem {
  year: number;
  month: number;
  count: number;
}

export interface TopEmployeesResponse {
  topEmployees: TopEmployeeItem[];
  limit: number;
  timestamp: string;
}

export interface TopEmployeeItem {
  employee_id: number;
  name: string;
  totalPoints: number;
}

export interface RewardsByDepartmentResponse {
  rewardsByDepartment: RewardsByDepartmentItem[];
  timestamp: string;
}

export interface RewardsByDepartmentItem {
  department: string;
  count: number;
}