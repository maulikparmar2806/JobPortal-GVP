package com.placement.management.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.CompanyDetalis;
import com.placement.management.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyDetalis saveCompany(CompanyDetalis company) {
        return companyRepository.save(company);
    }

    public List<CompanyDetalis> getAllCompanies() {
        return companyRepository.findAll();
    }

    public CompanyDetalis getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    public CompanyDetalis updateCompany(Long id, CompanyDetalis updatedCompany) {
        return companyRepository.findById(id).map(company -> {
            company.setName(updatedCompany.getName());
            company.setDescription(updatedCompany.getDescription());
            company.setLinkedinLink(updatedCompany.getLinkedinLink());
            company.setWebsiteLink(updatedCompany.getWebsiteLink());
            company.setEmail(updatedCompany.getEmail());
            company.setSpecializing(updatedCompany.getSpecializing());
            company.setStreet(updatedCompany.getStreet());
            company.setLandmark(updatedCompany.getLandmark());
            company.setArea(updatedCompany.getArea());
            company.setCity(updatedCompany.getCity());
            company.setState(updatedCompany.getState());
            company.setPincode(updatedCompany.getPincode());
            company.setUpdatedDate(LocalDateTime.now());
            return companyRepository.save(company);
        }).orElse(null);
    }

    public void deleteCompany(long Id) {
        companyRepository.deleteById(Id);
    }

}
