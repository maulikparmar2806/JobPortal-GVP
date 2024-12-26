package com.placement.management.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.placement.management.Services.ForgotOtpService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/otp")
public class ForgotOtpController {
    @Autowired
    ForgotOtpService otpService;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email) {
        System.out.println("Hello Send Cantroller"+email);
        return otpService.sendOtp(email)?"OTP sent successfully!":"Somthing Wornge..!";
    }

    // Endpoint to verify OTP
    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String otp) {
        boolean isValid = otpService.validateOtp(otp);
        return isValid ? "OTP is valid!" : "Invalid OTP!";
    }
    // Endpoint to reset the password if OTP is valid
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String newPassword,
            @RequestParam String otp) {
        
        boolean passwordReset = otpService.resetPassword(email, newPassword, otp);
        return passwordReset ? "Password reset successfully!" : "Failed to reset password. Please check OTP and try again.";
    }
}
