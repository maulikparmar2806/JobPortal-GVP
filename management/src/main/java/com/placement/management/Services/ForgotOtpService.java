package com.placement.management.Services;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ForgotOtpService {
    
    @Autowired
    private AdminDetailsService adminDetailsService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private StudentDetailsService studentDetailsService;

    private final Random random = new Random();
    private String generatedOtp;


     // Generate a random 6-digit OTP
     public String generateOtp() {
        generatedOtp = String.format("%06d", random.nextInt(999999));
        return generatedOtp;
    }

     // Send OTP to the user's email
    public boolean sendOtp(String email) {
        // Optional<StudentDetails> studentDetails = Studentrepository.findStudentByEmail(email);
        // StudentDetails student = studentDetailsService.findStudentByEmail(email).get();
        String otp = generateOtp();
        String msg = "Your OTP code is: " + otp;
        String title = "Your OTP Code";
        if(studentDetailsService.findStudentByEmail(email).isPresent()){
            return emailService.sendRegistionsEmail(email, msg, title);
        }
        else{
            System.out.println("Hello Send otp admin gmail");
            return adminDetailsService.FindUser(email).isPresent()? emailService.sendRegistionsEmail(email, msg, title):false;
        }
    }

     // Validate OTP
    public boolean validateOtp(String inputOtp) {
        return generatedOtp != null && generatedOtp.equals(inputOtp);
    }
    

     // Reset Password
    public boolean resetPassword(String email, String newPassword, String inputOtp) 
    {
        if (validateOtp(inputOtp)) 
        System.out.println("Reset Passeord otp done");
        {
            // StudentDetails student = studentDetailsService.findStudentByEmail(email).get(); 
            if (studentDetailsService.findStudentByEmail(email).isPresent())
            {
                return studentDetailsService.updateStudentPassword(email, newPassword);
            } 
            // AdminDetails adminDetails = adminDetailsService.FindUser(email);
            if (adminDetailsService.FindUser(email).isPresent()) 
            {
                System.out.println("Reset Passeord ADMIN done");
                return adminDetailsService.UpdateAdminPassword(email, newPassword);
            }
        }    
        return false;
    }
}
