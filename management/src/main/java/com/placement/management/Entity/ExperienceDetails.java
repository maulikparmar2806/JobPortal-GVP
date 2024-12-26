package com.placement.management.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "experience_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String position;
    private String duration;

    // Many-to-One with Resume
    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    // Getters and Setters
}
