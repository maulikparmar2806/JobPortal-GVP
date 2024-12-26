package com.placement.management.Services;

import com.placement.management.Entity.ExperienceDetails;
import com.placement.management.repository.ExperienceDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceDetailsService {

    @Autowired
    private ExperienceDetailsRepository experienceDetailsRepository;

    public List<ExperienceDetails> getAllExperienceDetails() {
        return experienceDetailsRepository.findAll();
    }

    public Optional<ExperienceDetails> getExperienceDetailById(Long id) {
        return experienceDetailsRepository.findById(id);
    }

    public ExperienceDetails saveExperienceDetail(ExperienceDetails experienceDetails) {
        return experienceDetailsRepository.save(experienceDetails);
    }

    public void deleteExperienceDetail(Long id) {
        experienceDetailsRepository.deleteById(id);
    }
}
