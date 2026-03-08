import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EmployeeCountResponse,
  RewardsPerMonthResponse,
  TopEmployeesResponse,
  RewardsByDepartmentResponse
} from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getEmployeeCount(): Observable<EmployeeCountResponse> {
    return this.http.get<EmployeeCountResponse>(`${this.apiUrl}/employee-count`);
  }

  getRewardsPerMonth(): Observable<RewardsPerMonthResponse> {
    return this.http.get<RewardsPerMonthResponse>(`${this.apiUrl}/rewards-per-month`);
  }

  getTopEmployees(limit: number = 10): Observable<TopEmployeesResponse> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<TopEmployeesResponse>(`${this.apiUrl}/top-employees`, { params });
  }

  getRewardsByDepartment(): Observable<RewardsByDepartmentResponse> {
    return this.http.get<RewardsByDepartmentResponse>(`${this.apiUrl}/rewards-by-department`);
  }
}