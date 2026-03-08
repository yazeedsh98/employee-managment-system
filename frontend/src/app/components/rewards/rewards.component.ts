import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/reward.model';
import { RewardType, RewardTypeLabels } from '../../models/reward-type.model';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent implements OnInit {

  rewards: Reward[] = [];
  isLoading: boolean = false;
  rewardTypeLabels = RewardTypeLabels;

  constructor(
    private rewardService: RewardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRewards();
  }

  loadRewards(): void {
    this.isLoading = true;
    this.rewardService.loadRewards().subscribe({
      next: (data) => {
        this.rewards = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load rewards', error);
        this.isLoading = false;
      }
    });
  }

  getRewardTypeLabel(type: RewardType): string {
    return this.rewardTypeLabels[type] || type;
  }

  editReward(id: number): void {
    this.router.navigate(['/edit-reward', id]);
  }

  deleteReward(id: number): void {
    if (confirm('Are you sure you want to delete this reward?')) {
      this.rewardService.deleteReward(id).subscribe({
        next: () => {
          console.log('Reward deleted successfully');
          this.loadRewards();
        },
        error: (error) => {
          console.error('Failed to delete reward', error);
          alert('Failed to delete reward. Please try again.');
        }
      });
    }
  }
}