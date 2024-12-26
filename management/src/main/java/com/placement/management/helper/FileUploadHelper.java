package com.placement.management.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {

    // Path to the static image directory
    public final String UPLOAD_DIR = new ClassPathResource("static/image/").getFile().getAbsolutePath();
    public final String UPLOAD_DIR_STATIC = "M:\\GVP\\MCA-3\\jobportalInSpring\\jobportalInSpring-JobPortalUpdated\\management\\src\\main\\resources\\static\\image";

    public FileUploadHelper() throws IOException {
        System.out.println("Upload Directory: " + UPLOAD_DIR);
    }

    public boolean uploadFile(MultipartFile file) {
        boolean isUploaded = false;
        try {
            Files.copy(file.getInputStream(), Paths.get(UPLOAD_DIR + File.separator + file.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            Files.copy(file.getInputStream(),
                    Paths.get(UPLOAD_DIR_STATIC + File.separator + file.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            isUploaded = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUploaded;
    }

    // Method to delete a file
    public boolean deleteFile(String filename) {
        boolean isDeleted = false;
        try {
            Files.deleteIfExists(Paths.get(filename));
            Files.deleteIfExists(Paths.get(filename));
            isDeleted = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isDeleted;
    }

}
