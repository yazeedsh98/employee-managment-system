import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';
  showNavbar = false;

  constructor(private router: Router) {
    // Check current route and update on navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Show navbar if NOT on login page
        this.showNavbar = event.url !== '/login' && event.url !== '/';
      });
    
    // Check initial route
    this.showNavbar = this.router.url !== '/login' && this.router.url !== '/';
  }
}