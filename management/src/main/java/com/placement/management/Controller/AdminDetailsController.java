	package com.placement.management.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.placement.management.Entity.AdminDetails;
import com.placement.management.Services.AdminDetailsService;

// import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AdminDetailsController {

    @Autowired
    private AdminDetailsService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminDetails loginRequest) {
        Optional<AdminDetails> admin = service.validateLogin(
                loginRequest.getUsername(),
                loginRequest.getPassword());
        if (admin.isPresent()) {
            return ResponseEntity.ok().body(admin);
        } else {
            return ResponseEntity.status(401).body("Unauthorized"); //
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createAdmin(@RequestBody AdminDetails adminDetails) {
        boolean isCreated = service.createAdmin(adminDetails);
        if (isCreated) {
            return ResponseEntity.ok("Admin created successfully!");
        } else {
            return ResponseEntity.status(500).body("Failed to create admin.");
        }
    }

    @GetMapping("/list")
    public List<AdminDetails> getAllAdmins() {
        return service.getAllAdmins();
        }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        boolean deleted = service.deleteAdminById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
