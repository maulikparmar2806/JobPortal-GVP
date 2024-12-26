package com.placement.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placement.management.Entity.AdminDetails;

@Repository
public interface AdminDetailsRepository extends JpaRepository<AdminDetails, Integer> {
    Optional<AdminDetails> findByUsernameAndPassword(String username, String password);
    Optional<AdminDetails> findAdminByUsername(String username);
}
