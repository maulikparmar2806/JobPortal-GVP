package com.placement.management.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "project_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String description;
    private String technologiesUsed;

    // Many-to-One with Resume
    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    // Getters and Setters
}
