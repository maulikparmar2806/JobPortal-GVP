export const validateCompanyForm = (formData) => {
    const errors = {};
  
    if (!formData.companyName) {
      errors.companyName = "Company name is required";
    }
  
    if (!formData.companyDescription) {
      errors.companyDescription = "Description is required";
    }
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
  
    if (!formData.street) {
      errors.street = "Street is required";
    }
  
    if (!formData.landmark) {
      errors.landmark = "Landmark is required";
    }
  
    if (!formData.area) {
      errors.area = "Area is required";
    }
  
    if (!formData.city) {
      errors.city = "City is required";
    }
  
    if (!formData.state) {
      errors.state = "State is required";
    }
  
    if (!formData.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be a 6-digit number";
    }
  
    return errors;
  };
  