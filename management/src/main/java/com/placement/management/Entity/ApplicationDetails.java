// ApplicationDetails.java
package com.placement.management.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "application_details")
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ApplicationDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @NotNull(message = "Student ID cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentDetails student;

    @NotNull(message = "Job Post ID cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_post_id", nullable = false)
    private JobPost jobPost;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Contact is required")
    @Pattern(regexp = "^\\d{10}$", message = "Contact must be a 10-digit number")
    private String contact;

    @NotBlank(message = "Resume is required")
    private String resume;

    @NotNull(message = "Application Date cannot be null")
    private LocalDate applicationDate;

    @NotNull(message = "Status cannot be null")
    private Character status; // 'P' for Pending, 'A' for Approved

    @Embedded
    private InterviewDetails interviewDetails;
}
