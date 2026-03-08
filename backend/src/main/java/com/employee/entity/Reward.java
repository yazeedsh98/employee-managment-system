package com.employee.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Employee is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @NotBlank(message = "Reward name is required")
    @Column(nullable = false)
    private String rewardName;

    @NotNull(message = "Date awarded is required")
    @Column(nullable = false)
    private LocalDate dateAwarded;

    @NotNull(message = "Reward type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RewardType type;

    @NotNull(message = "Points are required")
    @Positive(message = "Points must be positive")
    @Column(nullable = false)
    private Integer points;

    public Reward() {
    }

    public Reward(Employee employee, String rewardName, LocalDate dateAwarded, RewardType type, Integer points) {
        this.employee = employee;
        this.rewardName = rewardName;
        this.dateAwarded = dateAwarded;
        this.type = type;
        this.points = points;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getRewardName() {
        return rewardName;
    }

    public void setRewardName(String rewardName) {
        this.rewardName = rewardName;
    }

    public LocalDate getDateAwarded() {
        return dateAwarded;
    }

    public void setDateAwarded(LocalDate dateAwarded) {
        this.dateAwarded = dateAwarded;
    }

    public RewardType getType() {
        return type;
    }

    public void setType(RewardType type) {
        this.type = type;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
