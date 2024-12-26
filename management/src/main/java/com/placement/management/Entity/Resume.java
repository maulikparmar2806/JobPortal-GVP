package com.placement.management.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "resume")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String objective;

    private String resumeFile; // Assuming file is stored as a blob

    private String hobbies;

    @ElementCollection
    @CollectionTable(name = "resume_languages", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "language")
    private List<String> languagesKnown;

    @ElementCollection
    @CollectionTable(name = "resume_certificates", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "certificate")
    private List<String> certificates;

    // One-to-One with StudentDetails
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private StudentDetails student;

    // One-to-Many with EducationDetails
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EducationDetails> educationDetails;

    // One-to-Many with ProjectDetails
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectDetails> projectDetails;

    // One-to-Many with ExperienceDetails
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExperienceDetails> experienceDetails;

    // One-to-Many with Skills
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skills> skills;

}
