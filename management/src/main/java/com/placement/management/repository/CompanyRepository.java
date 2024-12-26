package com.placement.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placement.management.Entity.CompanyDetalis;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyDetalis, Long> {

}
