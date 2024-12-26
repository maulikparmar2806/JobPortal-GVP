package com.placement.management.Services;

import com.placement.management.Entity.ApplicationDetails;
import com.placement.management.Entity.InterviewDetails;
import com.placement.management.Entity.StudentDetails;
import com.placement.management.repository.ApplicationDetailsRepository;
import com.placement.management.repository.StudentDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
// import java.util.stream.Collectors;

@Service
public class ApplicationDetailsService {

    @Autowired
    private ApplicationDetailsRepository repository;

    @Autowired
    private StudentDetailsRepository studentDetailsRepository;

    public List<ApplicationDetails> getAllAppalication() {
        return repository.findAll();
    }

    public Optional<ApplicationDetails> getApplicationById(Long id) {
        return repository.findById(id);
    }

    public ApplicationDetails saveApplication(ApplicationDetails applicationDetails) {
        return repository.save(applicationDetails);
    }

    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }

    public ApplicationDetails updateApplication(Long id, ApplicationDetails applicationDetails) {
        applicationDetails.setApplicationId(id);
        return repository.save(applicationDetails);
    }

    public List<ApplicationDetails> findByStudentId(Integer studentId) {
        StudentDetails student = studentDetailsRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        return repository.findByStudent(student);
    }

    public ApplicationDetails scheduleInterview(Long applicationId, InterviewDetails interviewDetails) {
       
        Optional<ApplicationDetails> applicationOpt = repository.findById(applicationId);
        
        if (applicationOpt.isPresent()) {
            ApplicationDetails application = applicationOpt.get();
            application.setInterviewDetails(interviewDetails);
            return repository.save(application);
        } else {
            throw new IllegalArgumentException("Application not found");
        }
    }
    public ApplicationDetails updateApplicationStatus(Long applicationId, Character status) {
        Optional<ApplicationDetails> applicationOpt = repository.findById(applicationId);
        System.out.println("This is char :"+status);
        if (applicationOpt.isPresent()) {
            ApplicationDetails application = applicationOpt.get();
            application.setStatus(status);
            return repository.save(application);
        } else {
            throw new IllegalArgumentException("Application not found");
        }
        
    }
}