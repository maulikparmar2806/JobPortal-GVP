package com.placement.management.Controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.placement.management.Entity.CompanyDetalis;
import com.placement.management.Entity.JobPost;
import com.placement.management.Entity.StudentDetails;
import com.placement.management.Services.CompanyService;
import com.placement.management.Services.EmailService;
import com.placement.management.Services.JobPostService;
import com.placement.management.Services.StudentDetailsService;
import com.placement.management.helper.FileUploadHelper;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/dashboard/manage-jobPost")
public class JobPostController {
    @Autowired
    private JobPostService jobPostService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private StudentDetailsService studentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private FileUploadHelper fUploadHelper;

    @GetMapping
    public ResponseEntity<List<JobPost>> getAllJobPost() {
        return new ResponseEntity<>(jobPostService.getAllJobPost(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public int getJobPostCount() {
        return jobPostService.getAllJobPost().size();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPost> getJobPostById(@PathVariable Long id) {
        JobPost jobPost = jobPostService.getJobPostById(id);
        return new ResponseEntity<>(jobPost, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<JobPost> createJobPost(
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam("jobRole") String jobRole,
            @RequestParam("jobVacancy") int jobVacancy,
            @RequestParam("jobRequirementSkill") String jobRequirementSkill,
            @RequestParam("jobType") String jobType,
            @RequestParam("jobSalary") String jobSalary,
            @RequestParam("lastApplicationDate") String lastApplicationDate,
            @RequestParam("companyId") Long companyId,
            @RequestParam(value = "jobPostImg", required = false) MultipartFile jobPostImg) throws IOException {

        CompanyDetalis company = companyService.getCompanyById(companyId);
        boolean send = false;

        JobPost jobPost = new JobPost();
        jobPost.setJobTitle(jobTitle);
        jobPost.setJobDescription(jobDescription);
        jobPost.setJobRole(jobRole);
        jobPost.setJobVacancy(jobVacancy);
        jobPost.setJobRequirementSkill(jobRequirementSkill);
        jobPost.setJobType(jobType);
        jobPost.setJobSalary(jobSalary);
        jobPost.setLastApplicationDate(LocalDate.parse(lastApplicationDate));
        jobPost.setCompany(company);

        if (!jobPostImg.isEmpty()) {
            // Save the relative path to the database
            boolean isUploaded = fUploadHelper.uploadFile(jobPostImg);
            if (isUploaded) {
                @SuppressWarnings("null")
                String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
                        .path(jobPostImg.getOriginalFilename()).toUriString();
                System.out.println(fileUri);
                jobPost.setJobPostImg(fileUri);
            }
        }

        JobPost createdJobPost = jobPostService.createJobPost(jobPost);

        List<StudentDetails> students = studentService.getAllStudents();
        String title = "New Job Posted: " + createdJobPost.getJobTitle();
        String msg = "Dear Students,\n\n"
                + "A new job has been posted:\n\n"
                + "Job Title: " + createdJobPost.getJobTitle() + "\n"
                + "Company: " + company.getName() + "\n"
                + "Location: " + company.getStreet() + company.getArea() + company.getCity() + company.getState()
                + "\n\n"
                + "Check the job portal for more details.\n\n"
                + "Best regards,\n"
                + "Placement Management Team";

        if (students != null) {
            for (StudentDetails studentDetails : students) {
                String email = studentDetails.getEmail();
                send = emailService.sendRegistionsEmail(email, msg, title);
                System.err.println(studentDetails.getEmail() + "Sended Mail ..!!");
            }
        }

        return send ? new ResponseEntity<>(createdJobPost, HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPost> updateJobPost(@PathVariable Long id, @Valid @RequestBody JobPost jobPostDetails) {
        JobPost updatedJobPost = jobPostService.updateJobPost(id, jobPostDetails);
        return new ResponseEntity<>(updatedJobPost, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPost(@PathVariable Long id) {
        JobPost job = jobPostService.getJobPostById(id);
        fUploadHelper.deleteFile(job.getJobPostImg());
        jobPostService.deleteJobPost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
