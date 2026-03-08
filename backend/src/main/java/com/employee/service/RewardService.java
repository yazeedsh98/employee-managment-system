package com.employee.service;

import com.employee.entity.Employee;
import com.employee.entity.Reward;
import com.employee.repository.EmployeeRepository;
import com.employee.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RewardService {

    private final RewardRepository rewardRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public RewardService(RewardRepository rewardRepository, EmployeeRepository employeeRepository) {
        this.rewardRepository = rewardRepository;
        this.employeeRepository = employeeRepository;
    }

    // Assign reward
    public Reward assignReward(Reward reward) {
        // Verify employee exists
        Employee employee = employeeRepository.findById(reward.getEmployee().getId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + reward.getEmployee().getId()));

        reward.setEmployee(employee);
        return rewardRepository.save(reward);
    }

    // Update reward
    public Reward updateReward(Long id, Reward rewardDetails) {
        Reward reward = rewardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward not found with id: " + id));

        // Verify employee exists if changed
        if (rewardDetails.getEmployee() != null && 
            !reward.getEmployee().getId().equals(rewardDetails.getEmployee().getId())) {
            Employee employee = employeeRepository.findById(rewardDetails.getEmployee().getId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + rewardDetails.getEmployee().getId()));
            reward.setEmployee(employee);
        }

        if (rewardDetails.getRewardName() != null) {
            reward.setRewardName(rewardDetails.getRewardName());
        }
        if (rewardDetails.getDateAwarded() != null) {
            reward.setDateAwarded(rewardDetails.getDateAwarded());
        }
        if (rewardDetails.getType() != null) {
            reward.setType(rewardDetails.getType());
        }
        if (rewardDetails.getPoints() != null) {
            reward.setPoints(rewardDetails.getPoints());
        }

        return rewardRepository.save(reward);
    }

    // Delete reward
    public void deleteReward(Long id) {
        if (!rewardRepository.existsById(id)) {
            throw new RuntimeException("Reward not found with id: " + id);
        }
        rewardRepository.deleteById(id);
    }

    // Get all rewards
    public List<Reward> getAllRewards() {
        return rewardRepository.findAllWithEmployees();
    }

    // Get reward by ID
    public Optional<Reward> getRewardById(Long id) {
        return rewardRepository.findById(id);
    }

    // Get rewards by employee
    public List<Reward> getRewardsByEmployee(Long employeeId) {
        return rewardRepository.findByEmployeeId(employeeId);
    }
}
