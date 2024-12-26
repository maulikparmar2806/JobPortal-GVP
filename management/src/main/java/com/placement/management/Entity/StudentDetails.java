package com.placement.management.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "student_details")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class StudentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    @Column(name = "first_name", nullable = false, columnDefinition = "CHAR(20)")
    @NotBlank(message = "First name is mandatory")
    @Size(max = 15, message = "First name must be less than 15 characters")
    private String firstName;

    @Column(name = "last_name", nullable = false, columnDefinition = "CHAR(20)")
    @NotBlank(message = "Last name is mandatory")
    @Size(max = 15, message = "Last name must be less than 15 characters")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, columnDefinition = "CHAR(50)")
    @Email(message = "Email should be valid")
    @Pattern(regexp = "^[0-9]{6,10}\\.gvp@gujaratvidyapith\\.org$", message = "Email should be from gujaratvidyapith.org domain")
    private String email;

    @Column(name = "password", nullable = false, columnDefinition = "CHAR(10)")
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, max = 10, message = "Password must be between 8 and 10 characters")
    private String password;

    @Column(name = "gender", nullable = false, columnDefinition = "CHAR(2)")
    @NotNull(message = "Gender is mandatory")
    private char gender;

    @Column(name = "mobile_number", nullable = false, columnDefinition = "CHAR(10)")
    @NotBlank(message = "Mobile number is mandatory")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @Column(name = "address_temporary", nullable = false, length = 150)
    @NotBlank(message = "Temporary address is mandatory")
    @Size(max = 150, message = "Temporary address must be less than 150 characters")
    private String addressTemporary;

    @Column(name = "address_permanent", length = 150)
    @Size(max = 150, message = "Permanent address must be less than 150 characters")
    private String addressPermanent;

    @Column(name = "city", nullable = false, columnDefinition = "CHAR(20)")
    @NotBlank(message = "City is mandatory")
    @Size(max = 20, message = "Cit must be less than 20 characters")
    private String city;

    @Column(name = "course", nullable = false, columnDefinition = "CHAR(10)")
    @NotBlank(message = "Course is mandatory")
    @Size(max = 10, message = "must be less than 10 characters")
    private String course;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "on_create", nullable = false)
    private LocalDateTime onCreate;

    @Column(name = "on_update", nullable = false)
    private LocalDateTime onUpdate;
}
