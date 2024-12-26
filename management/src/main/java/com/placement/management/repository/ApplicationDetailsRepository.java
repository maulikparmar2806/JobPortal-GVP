package com.placement.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.management.Entity.ApplicationDetails;
import com.placement.management.Entity.StudentDetails;

public interface ApplicationDetailsRepository extends JpaRepository<ApplicationDetails, Long> {
    List<ApplicationDetails> findByStudent(StudentDetails student);
}
