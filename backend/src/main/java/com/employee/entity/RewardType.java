package com.employee.entity;

public enum RewardType {
    EMPLOYEE_OF_THE_MONTH("Employee of the Month"),
    INNOVATION_AWARD("Innovation Award"),
    TEAM_PLAYER_AWARD("Team Player Award");

    private final String displayName;

    RewardType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
