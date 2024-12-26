package com.placement.management.Controller;

import com.placement.management.Entity.EducationDetails;
import com.placement.management.Services.EducationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationDetailsController {

    @Autowired
    private EducationDetailsService educationDetailsService;

    @GetMapping
    public ResponseEntity<List<EducationDetails>> getAllEducationDetails() {
        return ResponseEntity.ok(educationDetailsService.getAllEducationDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationDetails> getEducationDetailById(@PathVariable Long id) {
        return educationDetailsService.getEducationDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EducationDetails> createEducationDetail(@RequestBody EducationDetails educationDetails) {
        return ResponseEntity.ok(educationDetailsService.saveEducationDetail(educationDetails));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationDetails> updateEducationDetail(@PathVariable Long id, @RequestBody EducationDetails educationDetails) {
        if (educationDetailsService.getEducationDetailById(id).isPresent()) {
            educationDetails.setId(id);
            return ResponseEntity.ok(educationDetailsService.saveEducationDetail(educationDetails));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducationDetail(@PathVariable Long id) {
        educationDetailsService.deleteEducationDetail(id);
        return ResponseEntity.noContent().build();
    }
}
