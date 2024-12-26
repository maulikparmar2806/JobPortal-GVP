export const validateJobPostForm = (formData) => {
    const errors = {};
  
    // Validate Job Title
    if (!formData.jobTitle) {
      errors.jobTitle = "Job title is required";
    }
    // Validate Job Description
    if (!formData.jobDescription) {
      errors.jobDescription = "Job description is required";
    } else if (formData.jobDescription.length < 10) {
      errors.jobDescription = "Job description should be at least 10 characters";
    }
  
    // Validate Job Requirement Skill
    if (!formData.jobRequirementSkill) {
      errors.jobRequirementSkill = "Job requirement skills are required";
    }
  
    // Validate Job Role
    if (!formData.jobRole) {
      errors.jobRole = "Job role is required";
    }
  
    // Validate Job Vacancy
    if (!formData.jobVacancy) {
      errors.jobVacancy = "Job vacancy is required";
    } else if (isNaN(formData.jobVacancy) || formData.jobVacancy < 1) {
      errors.jobVacancy = "Job vacancy must be a positive number";
    }
  
    // Validate Job Type
    if (!formData.jobType) {
      errors.jobType = "Job type is required";
    } else if (!["full-time", "part-time"].includes(formData.jobType)) {
      errors.jobType = "Invalid job type selected";
    }
  
    // Validate Job Salary
    if (!formData.jobSalary) {
      errors.jobSalary = "Job salary is required";
    } else if (isNaN(formData.jobSalary) || formData.jobSalary <= 0) {
      errors.jobSalary = "Salary must be a positive number";
    }
  
    // Validate Company ID
    if (!formData.companyId) {
      errors.companyId = "Company selection is required";
    }
  
    // Validate Last Application Date
    if (!formData.lastApplicationDate) {
      errors.lastApplicationDate = "Last application date is required";
    } else if (new Date(formData.lastApplicationDate) < new Date()) {
      errors.lastApplicationDate = "Date cannot be in the past";
    }
  
    // Validate Job Post Image
    if (formData.jobPostImg) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(formData.jobPostImg.type)) {
        errors.jobPostImg = "Image must be JPG, JPEG, or PNG format";
      }
    }
  
    return errors;
  };
  