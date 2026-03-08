import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reward } from '../models/reward.model';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private apiUrl = `${environment.apiUrl}/rewards`;

  constructor(private http: HttpClient) {}

  loadRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.apiUrl);
  }

  assignReward(reward: Reward): Observable<Reward> {
    const rewardPayload = {
      employee: { id: (reward.employee as any).id || reward.employee },
      rewardName: reward.rewardName,
      dateAwarded: reward.dateAwarded,
      type: reward.type,
      points: reward.points
    };
    return this.http.post<Reward>(this.apiUrl, rewardPayload);
  }

  updateReward(id: number, reward: Reward): Observable<Reward> {
    const rewardPayload = {
      employee: { id: (reward.employee as any).id || reward.employee },
      rewardName: reward.rewardName,
      dateAwarded: reward.dateAwarded,
      type: reward.type,
      points: reward.points
    };
    return this.http.put<Reward>(`${this.apiUrl}/${id}`, rewardPayload);
  }

  deleteReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRewardsByEmployee(employeeId: number): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.apiUrl}/employee/${employeeId}`);
  }
}