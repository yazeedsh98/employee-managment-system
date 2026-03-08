import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RewardService } from '../../services/reward.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { RewardType, RewardTypeLabels, RewardTypes } from '../../models/reward-type.model';
import { Reward } from '../../models/reward.model';

@Component({
  selector: 'app-assign-reward',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assign-reward.component.html',
  styleUrl: './assign-reward.component.css'
})
export class AssignRewardComponent implements OnInit {

  employees: Employee[] = [];
  rewardTypes = RewardTypes;
  rewardTypeLabels = RewardTypeLabels;
  rewardId: number | null = null;
  isEditMode: boolean = false;
  rewards: Reward[] = [];

  rewardForm: FormGroup = new FormGroup({
    employeeId: new FormControl('', [Validators.required]),
    rewardName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    dateAwarded: new FormControl('', [Validators.required]),
    type: new FormControl<RewardType | ''>('', [Validators.required]),
    points: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/)
    ])
  });

  constructor(
    private rewardService: RewardService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.rewardId = +params['id'];
        this.isEditMode = true;
        this.loadRewardForEdit();
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.loadEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Failed to load employees', error);
      }
    });
  }

  loadRewardForEdit(): void {
    // Load all rewards and find the one to edit
    this.rewardService.loadRewards().subscribe({
      next: (rewards) => {
        this.rewards = rewards;
        const reward = rewards.find(r => r.id === this.rewardId);
        if (reward) {
          this.rewardForm.patchValue({
            employeeId: reward.employee.id,
            rewardName: reward.rewardName,
            dateAwarded: reward.dateAwarded,
            type: reward.type,
            points: reward.points
          });
        } else {
          alert('Reward not found');
          this.router.navigate(['/rewards']);
        }
      },
      error: (error) => {
        console.error('Failed to load rewards', error);
        alert('Failed to load reward data');
        this.router.navigate(['/rewards']);
      }
    });
  }

  onSubmit(): void {
    if (this.rewardForm.valid) {
      const formValue = this.rewardForm.value;
      const rewardData: Reward = {
        employee: { id: formValue.employeeId } as Employee,
        rewardName: formValue.rewardName,
        dateAwarded: formValue.dateAwarded,
        type: formValue.type,
        points: parseInt(formValue.points)
      };

      if (this.isEditMode && this.rewardId) {
        this.rewardService.updateReward(this.rewardId, rewardData).subscribe({
          next: (reward) => {
            console.log('Reward updated successfully', reward);
            this.router.navigate(['/rewards']);
          },
          error: (error) => {
            console.error('Failed to update reward', error);
            alert('Failed to update reward. Please try again.');
          }
        });
      } else {
        this.rewardService.assignReward(rewardData).subscribe({
          next: (reward) => {
            console.log('Reward assigned successfully', reward);
            this.router.navigate(['/rewards']);
          },
          error: (error) => {
            console.error('Failed to assign reward', error);
            alert('Failed to assign reward. Please try again.');
          }
        });
      }
    } else {
      this.rewardForm.markAllAsTouched();
    }
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.rewardForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || field.dirty));
  }

  getRewardTypeLabel(type: RewardType): string {
    return this.rewardTypeLabels[type] || type;
  }

  onCancel(): void {
    this.router.navigate(['/rewards']);
  }
}