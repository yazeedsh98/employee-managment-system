# Employee Management System - Backend

Spring Boot REST API for managing employees and rewards.

## Features

- **Employee Management**: CRUD operations for employees
- **Reward Management**: Assign and manage rewards for employees
- **Dynamic Search**: Search employees by name, department, or email
- **Statistics API**: Dashboard statistics endpoints
- **Reward Types**: Employee of the Month, Innovation Award, Team Player Award

## Technology Stack

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (development)
- MySQL (production ready)

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/employee/
│   │   │       ├── EmployeeManagementApplication.java
│   │   │       ├── entity/
│   │   │       │   ├── Employee.java
│   │   │       │   ├── Reward.java
│   │   │       │   └── RewardType.java
│   │   │       ├── repository/
│   │   │       │   ├── EmployeeRepository.java
│   │   │       │   └── RewardRepository.java
│   │   │       ├── service/
│   │   │       │   ├── EmployeeService.java
│   │   │       │   └── RewardService.java
│   │   │       ├── controller/
│   │   │       │   ├── EmployeeController.java
│   │   │       │   ├── RewardController.java
│   │   │       │   └── StatisticsController.java
│   │   │       └── filter/
│   │   │           └── OnePerRequestFilter.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
└── pom.xml
```

## API Endpoints

### Employee Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/search?q={searchTerm}` - Dynamic search
- `GET /api/employees/department/{department}` - Get employees by department

### Reward Endpoints

- `GET /api/rewards` - Get all rewards
- `GET /api/rewards/{id}` - Get reward by ID
- `POST /api/rewards` - Assign new reward
- `PUT /api/rewards/{id}` - Update reward
- `DELETE /api/rewards/{id}` - Delete reward
- `GET /api/rewards/employee/{employeeId}` - Get rewards by employee
- `GET /api/rewards/type/{type}` - Get rewards by type
- `GET /api/rewards/date-range?startDate={date}&endDate={date}` - Get rewards by date range

### Statistics Endpoints

- `GET /api/stats/employee-count` - Get total employee count
- `GET /api/stats/rewards-per-month` - Get rewards per month
- `GET /api/stats/top-employees?limit={number}` - Get top employees by points
- `GET /api/stats/rewards-by-department` - Get rewards count by department

## Running the Application

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Access H2 Console (Development)

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:employeedb`
- Username: `sa`
- Password: (empty)

## Example API Requests

### Create Employee

```bash
POST http://localhost:8080/api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "department": "Engineering",
  "email": "john.doe@example.com"
}
```

### Assign Reward

```bash
POST http://localhost:8080/api/rewards
Content-Type: application/json

{
  "employee": {
    "id": 1
  },
  "rewardName": "Outstanding Performance",
  "dateAwarded": "2024-01-15",
  "type": "EMPLOYEE_OF_THE_MONTH",
  "points": 100
}
```

### Search Employees

```bash
GET http://localhost:8080/api/employees/search?q=engineering
```

## Reward Types

- `EMPLOYEE_OF_THE_MONTH` - Employee of the Month
- `INNOVATION_AWARD` - Innovation Award
- `TEAM_PLAYER_AWARD` - Team Player Award

## Configuration

### Development (H2 Database)

Uses in-memory H2 database. Configuration in `application.properties`

### Production (MySQL)

Uncomment and configure MySQL settings in `application-prod.properties`

## Notes

- OnePerRequestFilter is included but empty - ready for custom logic
- CORS is enabled for all origins (configure properly for production)
- Validation is enabled for all entities
