package com.placement.management.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_posts")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyDetalis company;

    @NotBlank(message = "Job title is mandatory")
    @Size(max = 100, message = "Job title should not exceed 100 characters")
    @Column(name = "job_title")
    private String jobTitle;

    @Size(max = 512, message = "Job description should not exceed 255 characters")
    @Column(name = "job_description", length = 512)
    private String jobDescription;

    @Column(name = "job_post_img")
    private String jobPostImg;

    @Size(max = 255, message = "Job requirement skill should not exceed 255 characters")
    @Column(name = "job_requirement_skill")
    private String jobRequirementSkill;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "job_vacancy")
    private Integer jobVacancy;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "job_salary")
    private String jobSalary;

    // @NotBlank(message = "Company location is mandatory")
    // @Size(max = 100, message = "Company location should not exceed 100
    // characters")
    // @Column(name = "company_location")
    // private String companyLocation;
    @Column(name = "last_Application_Date")
    private LocalDate lastApplicationDate;

    @Column(name = "active")
    private boolean active = true;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

}
