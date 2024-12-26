package com.placement.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placement.management.Entity.StudentDetails;

@Repository
public interface StudentDetailsRepository extends JpaRepository<StudentDetails, Integer> {
    Optional<StudentDetails> findByEmailAndPasswordAndCourse(String email, String password, String course);

    Optional<StudentDetails> findStudentByEmail(String email);
}
