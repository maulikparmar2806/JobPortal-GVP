package com.placement.management.Controller;

import com.placement.management.Entity.Skills;
import com.placement.management.Services.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {

    @Autowired
    private SkillsService skillsService;

    @GetMapping
    public ResponseEntity<List<Skills>> getAllSkills() {
        return ResponseEntity.ok(skillsService.getAllSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skills> getSkillById(@PathVariable Long id) {
        return skillsService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Skills> createSkill(@RequestBody Skills skill) {
        return ResponseEntity.ok(skillsService.saveSkill(skill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skills> updateSkill(@PathVariable Long id, @RequestBody Skills skill) {
        if (skillsService.getSkillById(id).isPresent()) {
            skill.setId(id);
            return ResponseEntity.ok(skillsService.saveSkill(skill));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillsService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
