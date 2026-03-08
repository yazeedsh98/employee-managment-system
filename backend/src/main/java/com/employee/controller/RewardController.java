package com.employee.controller;

import com.employee.entity.Reward;
import com.employee.service.RewardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
@Tag(name = "Reward Management", description = "APIs for managing employee rewards")
public class RewardController {

    private final RewardService rewardService;

    @Autowired
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    // Get all rewards
    @GetMapping
    public ResponseEntity<List<Reward>> getAllRewards() {
        List<Reward> rewards = rewardService.getAllRewards();
        return ResponseEntity.ok(rewards);
    }

    // Get reward by ID
    @GetMapping("/{id}")
    public ResponseEntity<Reward> getRewardById(@PathVariable Long id) {
        Optional<Reward> reward = rewardService.getRewardById(id);
        return reward.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Assign reward
    @Operation(summary = "Assign a reward", description = "Assign a new reward to an employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Reward assigned successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or employee not found")
    })
    @PostMapping
    public ResponseEntity<?> assignReward(@Valid @RequestBody Reward reward) {
        try {
            Reward assignedReward = rewardService.assignReward(reward);
            return ResponseEntity.status(HttpStatus.CREATED).body(assignedReward);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Update reward
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReward(@PathVariable Long id, 
                                         @Valid @RequestBody Reward rewardDetails) {
        try {
            Reward updatedReward = rewardService.updateReward(id, rewardDetails);
            return ResponseEntity.ok(updatedReward);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Delete reward
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReward(@PathVariable Long id) {
        try {
            rewardService.deleteReward(id);
            return ResponseEntity.ok(Map.of("message", "Reward deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get rewards by employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Reward>> getRewardsByEmployee(@PathVariable Long employeeId) {
        List<Reward> rewards = rewardService.getRewardsByEmployee(employeeId);
        return ResponseEntity.ok(rewards);
    }
}
