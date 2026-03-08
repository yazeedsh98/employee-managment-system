import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { RewardService } from '../../services/reward.service';
import { Employee } from '../../models/employee.model';
import { Reward } from '../../models/reward.model';
import { RewardType, RewardTypeLabels } from '../../models/reward-type.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  isLoading: boolean = false;
  selectedEmployeeRewards: Reward[] = [];
  selectedEmployee: Employee | null = null;
  showRewardsModal: boolean = false;
  isLoadingRewards: boolean = false;
  rewardTypeLabels = RewardTypeLabels;

  searchControl = new FormControl('');
  private searchSubject = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private rewardService: RewardService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.setupSearch();
  }

  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        this.isLoading = true;
        if (searchTerm && searchTerm.trim().length > 0) {
          return this.employeeService.searchEmployees(searchTerm.trim());
        } else {
          return this.employeeService.loadEmployees();
        }
      })
    ).subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search failed', error);
        this.isLoading = false;
      }
    });

    // Listen to search input changes
    this.searchControl.valueChanges.subscribe(value => {
      this.searchSubject.next(value || '');
    });
  }

  onSearchClear(): void {
    this.searchControl.setValue('');
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.loadEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load employees', error);
        this.isLoading = false;
      }
    });
  }

  viewEmployeeRewards(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showRewardsModal = true;
    this.isLoadingRewards = true;

    this.rewardService.getRewardsByEmployee(employee.id!).subscribe({
      next: (rewards) => {
        this.selectedEmployeeRewards = rewards;
        this.isLoadingRewards = false;
      },
      error: (error) => {
        console.error('Failed to load rewards', error);
        this.isLoadingRewards = false;
        this.selectedEmployeeRewards = [];
      }
    });
  }

  closeRewardsModal(): void {
    this.showRewardsModal = false;
    this.selectedEmployee = null;
    this.selectedEmployeeRewards = [];
  }

  getRewardTypeLabel(type: RewardType): string {
    return this.rewardTypeLabels[type] || type;
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log('Employee deleted successfully');
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Failed to delete employee', error);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }

  getTotalPoints(): number {
    return this.selectedEmployeeRewards
      .reduce((sum, reward) => sum + reward.points, 0);
  }
}