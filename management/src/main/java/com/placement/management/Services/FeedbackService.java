package com.placement.management.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.Feedback;
import com.placement.management.repository.FeedbackRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }

    public Feedback saveFeedback(Feedback feedback) {
        feedback.setFeedbackTime(LocalDateTime.now());
        feedback.setFeedbackmsg(feedback.getFeedbackmsg());
        feedback.setReplySent(false);
        return feedbackRepository.save(feedback);
    }

    public Feedback sendReply(Long id, String reply) {
        Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setReply(reply);
        feedback.setReplySent(true);
        return feedbackRepository.save(feedback);   
    }

    public List<Feedback> getFeedbackByStudnetId(Integer stdId){
        return feedbackRepository.getFeedbackBystudentId(stdId);

    }

    public void feedbackDeleteById(Long Id){
         feedbackRepository.deleteById(Id);
    }
}
