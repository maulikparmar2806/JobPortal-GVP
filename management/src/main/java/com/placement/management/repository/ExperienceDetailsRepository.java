package com.placement.management.repository;

import com.placement.management.Entity.ExperienceDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceDetailsRepository extends JpaRepository<ExperienceDetails, Long> {
}
