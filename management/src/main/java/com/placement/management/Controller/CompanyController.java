package com.placement.management.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.placement.management.Entity.CompanyDetalis;
import com.placement.management.Services.CompanyService;
import com.placement.management.helper.FileUploadHelper;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/dashboard/manage-company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private FileUploadHelper fUploadHelper;

    @PostMapping
    public ResponseEntity<?> addCompany(@Valid @RequestParam("logoFile") MultipartFile file,
            @RequestParam("companyName") String name,
            @RequestParam("companyDescription") String description,
            @RequestParam("email") String email,
            @RequestParam("street") String street,
            @RequestParam("landmark") String landmark,
            @RequestParam("area") String area,
            @RequestParam("city") String city,
            @RequestParam("state") String state,
            @RequestParam("pincode") String pincode,
            @RequestParam(value = "linkedinLink", required = false) String linkedin,
            @RequestParam(value = "websiteLink", required = false) String website,
            @RequestParam(value = "specializing", required = false) String specializing) {
        try {
            CompanyDetalis company = new CompanyDetalis();
            company.setName(name);
            company.setDescription(description);
            company.setEmail(email);
            company.setStreet(street);
            company.setLandmark(landmark);
            company.setArea(area);
            company.setCity(city);
            company.setState(state);
            company.setPincode(pincode);
            company.setLinkedinLink(linkedin);
            company.setWebsiteLink(website);
            company.setSpecializing(specializing);

            if (!file.isEmpty()) {
                // Save the relative path to the database
                boolean isUploaded = fUploadHelper.uploadFile(file);
                if (isUploaded) {
                    @SuppressWarnings("null")
                    String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
                            .path(file.getOriginalFilename()).toUriString();
                    System.out.println(fileUri);
                    company.setLogo(fileUri);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
                }
            }

            CompanyDetalis savedCompany = companyService.saveCompany(company);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving file: " + e.getMessage());
        }
    }
    // @PostMapping
    // public ResponseEntity<?> addCompany(@Valid @RequestBody CompanyDetalis
    // company,
    // @RequestParam("comlogo") MultipartFile file) {
    // try {
    // if (!file.isEmpty()) {

    // // Save the relative path to the database
    // company.setLogo(fUploadHelper.uploadFile(file));
    // }
    // CompanyDetalis savedCompany = companyService.saveCompany(company);
    // return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error
    // saving file: " + e.getMessage());
    // }
    // }
    // @PostMapping
    // public ResponseEntity<CompanyDetalis> addCompany(@RequestBody CompanyDetalis
    // company) {
    // CompanyDetalis savedCompany = companyService.saveCompany(company);
    // return ResponseEntity.ok(savedCompany);
    // }

    @GetMapping("/count")
    public int getComanCount() {
        return companyService.getAllCompanies().size();
    }

    @GetMapping
    public ResponseEntity<List<CompanyDetalis>> getAllCompanies() {
        List<CompanyDetalis> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDetalis> getCompanyById(@PathVariable Long id) {
        CompanyDetalis company = companyService.getCompanyById(id);
        return company != null ? ResponseEntity.ok(company) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyDetalis> updateCompany(@PathVariable Long id,
            @Valid @RequestBody CompanyDetalis company) {
        CompanyDetalis updatedCompany = companyService.updateCompany(id, company);
        return updatedCompany != null ? ResponseEntity.ok(updatedCompany) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        CompanyDetalis company = companyService.getCompanyById(id);
        fUploadHelper.deleteFile(company.getLogo());
        companyService.deleteCompany(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
