package com.placement.management.Services;

import com.placement.management.Entity.Skills;
import com.placement.management.repository.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillsService {

    @Autowired
    private SkillsRepository skillsRepository;

    public List<Skills> getAllSkills() {
        return skillsRepository.findAll();
    }

    public Optional<Skills> getSkillById(Long id) {
        return skillsRepository.findById(id);
    }

    public Skills saveSkill(Skills skills) {
        return skillsRepository.save(skills);
    }

    public void deleteSkill(Long id) {
        skillsRepository.deleteById(id);
    }
}
