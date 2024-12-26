package com.placement.management.Controller;

import com.placement.management.Entity.ExperienceDetails;
import com.placement.management.Services.ExperienceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
public class ExperienceDetailsController {

    @Autowired
    private ExperienceDetailsService experienceDetailsService;

    @GetMapping
    public ResponseEntity<List<ExperienceDetails>> getAllExperienceDetails() {
        return ResponseEntity.ok(experienceDetailsService.getAllExperienceDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceDetails> getExperienceDetailById(@PathVariable Long id) {
        return experienceDetailsService.getExperienceDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ExperienceDetails> createExperienceDetail(@RequestBody ExperienceDetails experienceDetails) {
        return ResponseEntity.ok(experienceDetailsService.saveExperienceDetail(experienceDetails));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDetails> updateExperienceDetail(@PathVariable Long id, @RequestBody ExperienceDetails experienceDetails) {
        if (experienceDetailsService.getExperienceDetailById(id).isPresent()) {
            experienceDetails.setId(id);
            return ResponseEntity.ok(experienceDetailsService.saveExperienceDetail(experienceDetails));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperienceDetail(@PathVariable Long id) {
        experienceDetailsService.deleteExperienceDetail(id);
        return ResponseEntity.noContent().build();
    }
}
