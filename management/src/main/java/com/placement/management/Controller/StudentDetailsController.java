package com.placement.management.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.placement.management.Entity.StudentDetails;
import com.placement.management.Services.EmailService;
import com.placement.management.Services.StudentDetailsService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/students")
public class StudentDetailsController {

    @Autowired
    private StudentDetailsService service;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<StudentDetails> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/count")
    public int getStudentsCount() {
        return service.getAllStudents().size();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDetails> getStudentById(@PathVariable int id) {
        Optional<StudentDetails> student = service.getStudentById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> registerStudent(@Valid @RequestBody StudentDetails student) {
        Map<String, String> response = new HashMap<>();
        try {
            if (service.findStudentByEmail(student.getEmail()).isPresent()) {
                response.put("message", "Email is already in use");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            StudentDetails s = service.saveStudent(student);
            if (s != null) {
                // Prepare the registration email
                String msg = String.format(
                        "Thank you for registering on the GVP Job Portal.\nYour username is: %s\nYour password is: %s",
                        s.getEmail(), s.getPassword());
                String mailSubject = "GVP Job Portal Registration";

                // Send the registration email
                boolean emailSent = emailService.sendRegistionsEmail(s.getEmail(), msg, mailSubject);
                if (emailSent) {
                    System.out.println("mail send ");
                    response.put("message",
                            "Registration successful. Please check your email for further instructions");
                }
            }

            response.put("url", "login");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("message", "An error occurred while registering the student");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // @PostMapping
    // public ResponseEntity<?> testStudentDetails(@Valid @RequestBody
    // StudentDetails studentDetails) {
    // // Save studentDetails to database
    // // Return a success message or the saved entity
    // try {
    // StudentDetails student = service.saveStudent(studentDetails);
    // if (student != null) {
    // String Msg = "Thank you for registering on the GVP Job Portal. \n Your
    // username is : "
    // + student.getEmail()
    // + "\n your password is: " + student.getPassword();
    // String Mailsubject = "GVP Job Portal Registration";
    // if (emailService.sendRegistionsEmail(studentDetails.getEmail(), Msg,
    // Mailsubject)) {
    // String url = "login";
    // return ResponseEntity.status(HttpStatus.CREATED)
    // .body(url);
    // }
    // }
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Somthing is Worng
    // Try Again");
    // }
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Somthing is Worng
    // Try Again");
    // }
    // @PostMapping
    // public StudentDetails createStudent(@RequestBody StudentDetails student) {
    // return service.saveStudent(student);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<StudentDetails> updateStudent(@PathVariable int id,
    // @RequestBody StudentDetails student) {
    // Optional<StudentDetails> existingStudent = service.getStudentById(id);
    // if (existingStudent.isPresent()) {
    // student.setStudent_id(id);
    // return ResponseEntity.ok(service.saveStudent(student));
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
    // service.deleteStudent(id);
    // return ResponseEntity.noContent().build();
    // }

    // @PostMapping("/gmail")
    // public String postMethodName() {
    // if (emailService.sendRegistionsEmail("12208010.gvp@gujaratvidyapith.org",
    // "Helllo dear", "Chack Email")) {
    // return "Done";
    // }
    // return "Not Done";
    // }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StudentDetails loginRequest) {
        Optional<StudentDetails> student = service.validateLogin(loginRequest.getEmail(), loginRequest.getPassword(),
                loginRequest.getCourse());
        if (student.isPresent()) {
            return ResponseEntity.ok().body(student);
        } else {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
    }

    @GetMapping("/beck")
    public RedirectView redirectToLoginPage() {
        String redirectUrl = "http://localhost:5173/auth/student/login";
        return new RedirectView(redirectUrl);
    }

    @GetMapping("/Home/User")
    public String getMethodName(Principal principal) {
        return principal.getName();
    }

    @PostMapping("/reset-password/{email}/{newPassword}")
    public ResponseEntity<?> resetPassword(
        @PathVariable String email,
        @PathVariable String newPassword
        ) {
            boolean isReset = service.updateStudentPassword(email, newPassword);
            if (isReset) {
                return ResponseEntity.ok("Password reset successful!");
            } else {
            return ResponseEntity.badRequest().body("Invalid old password or email.");
            }
        }

}
