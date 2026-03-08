import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../services/statistics.service';
import {
  EmployeeCountResponse,
  RewardsPerMonthResponse,
  TopEmployeesResponse,
  RewardsByDepartmentResponse,
  RewardsPerMonthItem,
  TopEmployeeItem,
  RewardsByDepartmentItem
} from '../../models/statistics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // Statistics data
  totalEmployees: number = 0;
  rewardsPerMonth: RewardsPerMonthItem[] = [];
  topEmployees: TopEmployeeItem[] = [];
  rewardsByDepartment: RewardsByDepartmentItem[] = [];

  // Loading states
  isLoading: boolean = false;
  isLoadingStats: boolean = false;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadAllStatistics();
  }

  loadAllStatistics(): void {
    this.isLoading = true;
    this.isLoadingStats = true;

    // Load all statistics in parallel
    this.loadEmployeeCount();
    this.loadRewardsPerMonth();
    this.loadTopEmployees();
    this.loadRewardsByDepartment();
  }

  loadEmployeeCount(): void {
    this.statisticsService.getEmployeeCount().subscribe({
      next: (response: EmployeeCountResponse) => {
        this.totalEmployees = response.totalEmployees;
        this.checkLoadingComplete();
      },
      error: (error: any) => {
        console.error('Failed to load employee count', error);
        this.checkLoadingComplete();
      }
    });
  }

  loadRewardsPerMonth(): void {
    this.statisticsService.getRewardsPerMonth().subscribe({
      next: (response: RewardsPerMonthResponse) => {
        // Backend returns array of [year, month, count]
        this.rewardsPerMonth = response.rewardsPerMonth.map((item: any) => ({
          year: item[0] || item.year,
          month: item[1] || item.month,
          count: item[2] || item.count
        }));
        this.checkLoadingComplete();
      },
      error: (error: any) => {
        console.error('Failed to load rewards per month', error);
        this.checkLoadingComplete();
      }
    });
  }

  loadTopEmployees(): void {
    this.statisticsService.getTopEmployees(10).subscribe({
      next: (response: TopEmployeesResponse) => {
        // Backend returns array of [employee_id, name, totalPoints]
        this.topEmployees = response.topEmployees.map((item: any) => ({
          employee_id: item[0] || item.employee_id,
          name: item[1] || item.name,
          totalPoints: item[2] || item.totalPoints
        }));
        this.checkLoadingComplete();
      },
      error: (error: any) => {
        console.error('Failed to load top employees', error);
        this.checkLoadingComplete();
      }
    });
  }

  loadRewardsByDepartment(): void {
    this.statisticsService.getRewardsByDepartment().subscribe({
      next: (response: RewardsByDepartmentResponse) => {
        // Backend returns array of [department, count]
        this.rewardsByDepartment = response.rewardsByDepartment.map((item: any) => ({
          department: item[0] || item.department,
          count: item[1] || item.count
        }));
        this.checkLoadingComplete();
      },
      error: (error: any) => {
        console.error('Failed to load rewards by department', error);
        this.checkLoadingComplete();
      }
    });
  }

  checkLoadingComplete(): void {
    this.isLoadingStats = false;
    // Check if all stats are loaded
    if (!this.isLoadingStats) {
      this.isLoading = false;
    }
  }

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || month.toString();
  }

  // Helper methods for template calculations
  getTotalRewards(): number {
    return this.rewardsPerMonth.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPoints(): number {
    return this.topEmployees.reduce((sum, emp) => sum + emp.totalPoints, 0);
  }

  refreshDashboard(): void {
    this.loadAllStatistics();
  }
}