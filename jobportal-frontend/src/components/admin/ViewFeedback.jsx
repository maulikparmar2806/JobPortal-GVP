import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

export const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setAlert({ open: true, message: "Failed to load feedback", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/feedback/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
      setAlert({ open: true, message: "Feedback deleted successfully", severity: "success" });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setAlert({ open: true, message: "Failed to delete feedback", severity: "error" });
    }
  };

  const handleReplyOpen = (feedback) => {
    setSelectedFeedback(feedback);
    setReply("");
    setReplyDialogOpen(true);
  };

  const handleReplyClose = () => {
    setReplyDialogOpen(false);
    setSelectedFeedback(null);
  };

  const handleReplySubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/api/feedback/reply`, {
        feedbackId: selectedFeedback.id,
        replyMessage: reply,
      });
      setAlert({ open: true, message: "Reply submitted successfully", severity: "success" });
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((f) =>
          f.id === selectedFeedback.id ? { ...f, replyMessage: reply } : f
        )
      );
      handleReplyClose();
    } catch (error) {
      console.error("Error submitting reply:", error);
      setAlert({ open: true, message: "Failed to submit reply", severity: "error" });
    }
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} style={{ width: "78vw" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          View Feedback
        </Typography>
        {feedbacks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No feedback available
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feedback ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Feedback Time</TableCell>
                  <TableCell>Reply</TableCell>
                  <TableCell colSpan={2}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.id}</TableCell>
                    <TableCell>{feedback.studentId}</TableCell>
                    <TableCell>{feedback.feedbackmsg}</TableCell>
                    <TableCell>{feedback.feedbackTime}</TableCell>
                    <TableCell>{feedback.reply || "No reply yet"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReplyOpen(feedback)}
                        disabled={Boolean(feedback.replyMessage)}  // Disable if already replied
                      >
                        Reply
                      </Button>
                      </TableCell>
                      <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(feedback.id)}
                        style={{ marginLeft: '8px' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onClose={handleReplyClose}>
        <DialogTitle>Reply to Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Reply"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReplyClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleReplySubmit} color="primary">
            Submit Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
