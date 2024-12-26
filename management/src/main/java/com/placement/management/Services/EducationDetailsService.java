package com.placement.management.Services;

import com.placement.management.Entity.EducationDetails;
import com.placement.management.repository.EducationDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationDetailsService {

    @Autowired
    private EducationDetailsRepository educationDetailsRepository;

    public List<EducationDetails> getAllEducationDetails() {
        return educationDetailsRepository.findAll();
    }

    public Optional<EducationDetails> getEducationDetailById(Long id) {
        return educationDetailsRepository.findById(id);
    }

    public EducationDetails saveEducationDetail(EducationDetails educationDetails) {
        return educationDetailsRepository.save(educationDetails);
    }

    public void deleteEducationDetail(Long id) {
        educationDetailsRepository.deleteById(id);
    }
}
