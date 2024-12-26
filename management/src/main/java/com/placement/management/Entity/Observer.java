package com.placement.management.Entity;

import java.util.List;

import com.placement.management.Services.EmailService;

public interface Observer {
    public void update(List<StudentDetails> students, EmailService emailService, String Msg, String Tital);
}
