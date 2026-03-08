import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ])
  });

  employeeId: number | null = null;
  isEditMode: boolean = false;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = +params['id'];
        this.isEditMode = true;
        this.loadEmployeeForEdit();
      }
    });
  }

  loadEmployeeForEdit(): void {
    // Load all employees and find the one to edit
    this.employeeService.loadEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        const employee = employees.find(emp => emp.id === this.employeeId);
        if (employee) {
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email,
            department: employee.department
          });
        } else {
          alert('Employee not found');
          this.router.navigate(['/employee']);
        }
      },
      error: (error) => {
        console.error('Failed to load employees', error);
        alert('Failed to load employee data');
        this.router.navigate(['/employee']);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
          next: (data) => {
            console.log('Employee updated successfully', data);
            this.router.navigate(['/employee']);
          },
          error: (error) => {
            console.error('Failed to update employee', error);
            alert('Failed to update employee. Please try again.');
          }
        });
      } else {
        this.employeeService.addEmployee(employeeData).subscribe({
          next: (data) => {
            console.log('Employee added successfully', data);
            this.router.navigate(['/employee']);
          },
          error: (error) => {
            console.error('Failed to add employee', error);
            alert('Failed to add employee. Please try again.');
          }
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || field.dirty));
  }

  onCancel(): void {
    this.router.navigate(['/employee']);
  }
}