import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AssignRewardComponent } from './components/assign-reward/assign-reward.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'edit-employee/:id',
    component: AddEmployeeComponent
  },
  {
    path: 'rewards',
    component: RewardsComponent
  },
  {
    path: 'assign-reward',
    component: AssignRewardComponent
  },
  {
    path: 'edit-reward/:id',
    component: AssignRewardComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];