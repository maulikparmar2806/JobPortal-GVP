// InterviewDetails.java
package com.placement.management.Entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDetails {

    @NotNull(message = "Interview date cannot be null")
    private LocalDate date;

    @NotNull(message = "Interview time cannot be null")
    private LocalTime time;

    @NotBlank(message = "Interview location is required")
    private String location;
}
