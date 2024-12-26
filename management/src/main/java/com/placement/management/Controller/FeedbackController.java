package com.placement.management.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.placement.management.Entity.Feedback;
import com.placement.management.Services.FeedbackService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/user/{studentId}")
public ResponseEntity<?> getFeedbackByUserId(@PathVariable Integer studentId) {
    try {
        List<Feedback> feedbacks = feedbackService.getFeedbackByStudnetId(studentId);
        return ResponseEntity.ok(feedbacks);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching feedback");
    }
    }


    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @PostMapping("/reply")
    public ResponseEntity<Void> replyToFeedback(@RequestBody ReplyRequest replyRequest) {
        feedbackService.sendReply(replyRequest.getFeedbackId(), replyRequest.getReplyMessage());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPost(@PathVariable Long id) {
        feedbackService.feedbackDeleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public static class ReplyRequest {
        private Long feedbackId;
        private String replyMessage;

        // Getters and Setters
        public Long getFeedbackId() {
            return feedbackId;
        }

        public void setFeedbackId(Long feedbackId) {
            this.feedbackId = feedbackId;
        }

        public String getReplyMessage() {
            return replyMessage;
        }

        public void setReplyMessage(String replyMessage) {
            this.replyMessage = replyMessage;
        }
    }
}
