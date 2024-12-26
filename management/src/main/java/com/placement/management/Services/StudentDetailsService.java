package com.placement.management.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.StudentDetails;
import com.placement.management.repository.StudentDetailsRepository;

@Service
public class StudentDetailsService {

    @Autowired
    private StudentDetailsRepository repository;

    public List<StudentDetails> getAllStudents() {
        return repository.findAll();
    }

    public Optional<StudentDetails> getStudentById(int id) {
        return repository.findById(id);
    }

    public StudentDetails saveStudent(StudentDetails student) {
        return repository.save(student);
    }

    public void deleteStudent(int id) {
        repository.deleteById(id);
    }

    public Optional<StudentDetails> validateLogin(String email, String password, String course) {
        return repository.findByEmailAndPasswordAndCourse(email, password, course);
    }

    public Optional<StudentDetails> findStudentByEmail(String email) {
        return repository.findStudentByEmail(email);
    }

    public boolean updateStudentPassword(String email, String newPassword) {
        Optional<StudentDetails> studentOpt = findStudentByEmail(email);

        if (studentOpt.isPresent()) {
            StudentDetails student = studentOpt.get();
            student.setPassword(newPassword);
            repository.save(student);
            System.out.println("Password updated for email: " + student.getEmail());
            return true;
        } else {
            System.out.println("Student with email " + email + " not found.");
            return false;
        }
    }
}
