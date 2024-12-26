package com.placement.management.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Admin_details")
public class AdminDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "admin_email", nullable = false, unique = true, columnDefinition = "CHAR(50)")
    @Email(message = "Email should be valid")
    // @Pattern(regexp = "^[0-9]{9}\\.gvp@gujaratvidyapith\\.org$", message = "Email should be from gujaratvidyapith.org domain")
    private String username;

    @Column(name = "password", nullable = false, columnDefinition = "CHAR(10)")
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, max = 10, message = "Password must be between 8 and 10 characters")
    private String password;

    @Column(name = "profile_picture")
    private String profilePicture;
}
