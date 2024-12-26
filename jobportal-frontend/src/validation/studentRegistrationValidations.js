// src/components/auth/StudentRegistrationValidation.jsx
export const validateStudentRegistration = (formData) => {
    const errors = {};
    const emailPattern = /^[0-9]{6,10}\.gvp@gujaratvidyapith\.org$/;
    const mobilePattern = /^[0-9]{10}$/;
  
    if (!formData.firstName || formData.firstName.length > 15) {
      errors.firstName = "First Name is required and must be less than 15 characters";
    }
    if (!formData.lastName || formData.lastName.length > 15) {
      errors.lastName = "Last Name is required and must be less than 15 characters";
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      errors.email = "Email ID must match the pattern 212308020.gvp@gujaratvidyapith.org";
    }
    if (!formData.password || formData.password.length > 10) {
      errors.password = "Password is required and must be less than 8 characters";
    }
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.mobileNumber || !mobilePattern.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile Number is required and must be 10 digits";
    }
    if (!formData.addressTemporary || formData.addressTemporary.length > 150) {
      errors.addressTemporary = "Temporary Address is required and must be less than 150 characters";
    }
    if (formData.addressPermanent && formData.addressPermanent.length > 150) {
      errors.addressPermanent = "Permanent Address must be less than 150 characters";
    }
    if (!formData.city) errors.city = "City is required";
    if (!formData.course) errors.course = "Course is required";
  
    return errors;
  };
  