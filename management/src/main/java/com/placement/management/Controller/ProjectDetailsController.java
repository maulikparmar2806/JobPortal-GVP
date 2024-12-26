package com.placement.management.Controller;


import com.placement.management.Entity.ProjectDetails;
import com.placement.management.Services.ProjectDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectDetailsController {

    @Autowired
    private ProjectDetailsService projectDetailsService;

    @GetMapping
    public ResponseEntity<List<ProjectDetails>> getAllProjectDetails() {
        return ResponseEntity.ok(projectDetailsService.getAllProjectDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetails> getProjectDetailById(@PathVariable Long id) {
        return projectDetailsService.getProjectDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProjectDetails> createProjectDetail(@RequestBody ProjectDetails projectDetails) {
        return ResponseEntity.ok(projectDetailsService.saveProjectDetail(projectDetails));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDetails> updateProjectDetail(@PathVariable Long id, @RequestBody ProjectDetails projectDetails) {
        if (projectDetailsService.getProjectDetailById(id).isPresent()) {
            projectDetails.setId(id);
            return ResponseEntity.ok(projectDetailsService.saveProjectDetail(projectDetails));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectDetail(@PathVariable Long id) {
        projectDetailsService.deleteProjectDetail(id);
        return ResponseEntity.noContent().build();
    }
}
