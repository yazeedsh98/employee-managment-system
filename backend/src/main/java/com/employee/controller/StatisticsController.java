package com.employee.controller;

import com.employee.repository.EmployeeRepository;
import com.employee.repository.RewardRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
@Tag(name = "Statistics", description = "Dashboard statistics and analytics APIs")
public class StatisticsController {

    private final EmployeeRepository employeeRepository;
    private final RewardRepository rewardRepository;

    @Autowired
    public StatisticsController(EmployeeRepository employeeRepository, RewardRepository rewardRepository) {
        this.employeeRepository = employeeRepository;
        this.rewardRepository = rewardRepository;
    }

    // Get total employee count
    @Operation(summary = "Get employee count", description = "Get the total number of employees")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved employee count")
    @GetMapping("/employee-count")
    public ResponseEntity<Map<String, Object>> getEmployeeCount() {
        long count = employeeRepository.count();
        Map<String, Object> response = new HashMap<>();
        response.put("totalEmployees", count);
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    // Get rewards per month
    @GetMapping("/rewards-per-month")
    public ResponseEntity<Map<String, Object>> getRewardsPerMonth() {
        List<Object[]> results = rewardRepository.countRewardsPerMonth();
        Map<String, Object> response = new HashMap<>();
        response.put("rewardsPerMonth", results);
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    // Get top employees by points
    @GetMapping("/top-employees")
    public ResponseEntity<Map<String, Object>> getTopEmployees(
            @RequestParam(defaultValue = "10") int limit) {
        List<Object[]> results = rewardRepository.getTopEmployeesByPoints(limit);
        Map<String, Object> response = new HashMap<>();
        response.put("topEmployees", results);
        response.put("limit", limit);
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }

    // Get rewards by department
    @GetMapping("/rewards-by-department")
    public ResponseEntity<Map<String, Object>> getRewardsByDepartment() {
        List<Object[]> results = rewardRepository.countRewardsByDepartment();
        Map<String, Object> response = new HashMap<>();
        response.put("rewardsByDepartment", results);
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
}
