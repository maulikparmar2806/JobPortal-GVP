package com.placement.management.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.AdminDetails;
import com.placement.management.repository.AdminDetailsRepository;

@Service
public class AdminDetailsService {

    @Autowired
    private AdminDetailsRepository repository;

    public Optional<AdminDetails> validateLogin(String username, String password) {
        return repository.findByUsernameAndPassword(username, password);
    }

    public Optional<AdminDetails> FindUser(String email){
        return repository.findAdminByUsername(email);
    }

    public boolean UpdateAdminPassword (String email , String Password){
        AdminDetails admin = FindUser(email).get();
        admin.setPassword(Password);
        return repository.save(admin) != null;
    }

    public boolean createAdmin(AdminDetails adminDetails){
        return repository.save(adminDetails) != null;
    }

    public List<AdminDetails> getAllAdmins() {
        return repository.findAll();
    }

    public boolean deleteAdminById(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
