package com.placement.management.Services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.JobPost;
import com.placement.management.repository.JobPostRepository;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobPost> getAllJobPost() {
        return jobPostRepository.findAll();
    }

    public JobPost getJobPostById(Long id) {
        return jobPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job post not found with id " + id));
    }

    public JobPost createJobPost(JobPost jobPost) {
        jobPost.setCreatedDate(LocalDateTime.now());
        JobPost post = jobPostRepository.save(jobPost);
        return post;
    }

    public JobPost updateJobPost(Long id, JobPost jobPostDetails) {
        JobPost jobPost = getJobPostById(id);
        jobPost.setJobTitle(jobPostDetails.getJobTitle());
        jobPost.setJobDescription(jobPostDetails.getJobDescription());
        jobPost.setJobPostImg(jobPostDetails.getJobPostImg());
        jobPost.setJobRequirementSkill(jobPostDetails.getJobRequirementSkill());
        jobPost.setJobRole(jobPostDetails.getJobRole());
        jobPost.setJobVacancy(jobPostDetails.getJobVacancy());
        jobPost.setLastApplicationDate(jobPostDetails.getLastApplicationDate());
        jobPost.setUpdatedDate(LocalDateTime.now());
        return jobPostRepository.save(jobPost);
    }

    public void deleteJobPost(Long id) {
        jobPostRepository.deleteById(id);
    }

    // @Scheduled(cron = "*/5 * * * * ?") // Runs every 5 seconds
    @Scheduled(cron = "0 0 0 * * ?") // Runs every day at midnight
    public void deactivateExpiredJobPosts() {
        LocalDate today = LocalDate.now();
        System.out.println("deactivateExpiredJobPosts method called at " + LocalDateTime.now());
        List<JobPost> expiredPosts = jobPostRepository.findByLastApplicationDateBefore(today);
        for (JobPost jobPost : expiredPosts) {
            jobPost.setActive(false); // Deactivate expired job posts
            jobPostRepository.save(jobPost);
        }
    }

}
