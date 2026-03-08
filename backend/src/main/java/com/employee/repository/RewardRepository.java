package com.employee.repository;

import com.employee.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {

    // Find all rewards with employees eagerly fetched
    @Query("SELECT r FROM Reward r JOIN FETCH r.employee")
    List<Reward> findAllWithEmployees();

    // Find rewards by employee
    List<Reward> findByEmployeeId(Long employeeId);

    // Count rewards per month
    @Query("SELECT FUNCTION('YEAR', r.dateAwarded) as year, " +
           "FUNCTION('MONTH', r.dateAwarded) as month, " +
           "COUNT(r) as count " +
           "FROM Reward r " +
           "GROUP BY FUNCTION('YEAR', r.dateAwarded), FUNCTION('MONTH', r.dateAwarded) " +
           "ORDER BY year DESC, month DESC")
    List<Object[]> countRewardsPerMonth();

    // Get top employees by total points
    @Query(value = "SELECT r.employee_id, e.name, SUM(r.points) as totalPoints " +
           "FROM rewards r JOIN employees e ON r.employee_id = e.id " +
           "GROUP BY r.employee_id, e.name " +
           "ORDER BY totalPoints DESC " +
           "LIMIT :limit", nativeQuery = true)
    List<Object[]> getTopEmployeesByPoints(@Param("limit") int limit);

    // Count rewards by department
    @Query("SELECT e.department, COUNT(r) as count " +
           "FROM Reward r JOIN r.employee e " +
           "GROUP BY e.department")
    List<Object[]> countRewardsByDepartment();
}
