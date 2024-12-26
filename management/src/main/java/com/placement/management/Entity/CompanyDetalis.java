package com.placement.management.Entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Company_Detalis")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CompanyDetalis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is mandatory")
    @Size(max = 100, message = "Company name should not exceed 100 characters")
    private String name;

    @Size(max = 255, message = "Description should not exceed 255 characters")
    private String description;

    @Column(nullable = true)
    @Size(max = 255, message = "LinkedIn link should not exceed 255 characters")
    private String linkedinLink;

    @Column(nullable = true)
    @Size(max = 255, message = "Website link should not exceed 255 characters")
    private String websiteLink;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email should not exceed 100 characters")
    private String email;

    @Size(max = 100, message = "Specializing should not exceed 100 characters")
    private String specializing;

    @NotBlank(message = "street is mandatory")
    @Size(max = 100, message = "Street should not exceed 100 characters")
    private String street;

    @Size(max = 100, message = "Landmark should not exceed 100 characters")
    private String landmark;

    @NotBlank(message = "Area is mandatory")
    @Size(max = 100, message = "Area should not exceed 100 characters")
    private String area;

    @NotBlank(message = "City is mandatory")
    @Size(max = 100, message = "City should not exceed 100 characters")
    private String city;

    @NotBlank(message = "State is mandatory")
    @Size(max = 100, message = "State should not exceed 100 characters")
    private String state;

    @NotBlank(message = "Pincode is mandatory")
    @Size(max = 10, message = "Pincode should not exceed 10 characters")
    private String pincode;

    @Column(nullable = true)
    private String logo;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;
}
