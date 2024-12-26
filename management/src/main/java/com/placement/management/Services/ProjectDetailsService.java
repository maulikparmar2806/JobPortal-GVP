package com.placement.management.Services;


import com.placement.management.Entity.ProjectDetails;
import com.placement.management.repository.ProjectDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectDetailsService {

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;

    public List<ProjectDetails> getAllProjectDetails() {
        return projectDetailsRepository.findAll();
    }

    public Optional<ProjectDetails> getProjectDetailById(Long id) {
        return projectDetailsRepository.findById(id);
    }

    public ProjectDetails saveProjectDetail(ProjectDetails projectDetails) {
        return projectDetailsRepository.save(projectDetails);
    }

    public void deleteProjectDetail(Long id) {
        projectDetailsRepository.deleteById(id);
    }
}
