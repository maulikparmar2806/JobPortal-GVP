import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { UserContext } from "../../context/UserContext"; // Assuming context is here

export const GiveFeedback = () => {
  const { user } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [feedbackHistory, setFeedbackHistory] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        console.log(user.studentId);
        const response = await axios.get(`http://localhost:8080/api/feedback/user/${user.studentId}`);
        // Ensure response.data is an array before setting it
        setFeedbackHistory(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching feedback history:", error);
        setAlert({ open: true, message: "Failed to load feedback history", severity: "error" });
      }
    };

    fetchFeedbackHistory();
  }, [user.studentId]);

  const handleSubmit = async () => {
    try {
      const feedbackObject = {
        studentId: user.studentId,
        feedbackmsg: feedback,
        feedbackTime: new Date().toISOString(),
        reply: "",
        replySent: false,
      };

      const response = await axios.post("http://localhost:8080/api/feedback", feedbackObject);
      // Ensure response.data is an object and append to array
      setFeedbackHistory((prevHistory) => [...prevHistory, response.data]);
      setAlert({ open: true, message: "Feedback sent successfully", severity: "success" });
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setAlert({ open: true, message: "Failed to send feedback", severity: "error" });
    }
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });
  const isFeedbackValid = feedback.length >= 10 && feedback.length <= 250;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Give Feedback
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Your Feedback"
                fullWidth
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                helperText={
                  feedback.length < 10
                    ? "Feedback must be at least 10 characters long."
                    : feedback.length > 250
                    ? "Feedback must be no more than 250 characters."
                    : ""
                }
                error={!isFeedbackValid && feedback.length > 0}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                disabled={!isFeedbackValid}
              >
                Send Feedback
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Feedback History */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Previous Feedback
              </Typography>
              <Divider sx={{ my: 2 }} />
              {feedbackHistory.length === 0 ? (
                <Typography color="textSecondary">No previous feedback available.</Typography>
              ) : (
                <List>
                  {feedbackHistory.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={item.feedbackmsg}
                          secondary={
                            item.replySent && item.reply ? (
                              <div style={{ marginTop: 4 }}>
                                <strong>Response:</strong> {item.reply}
                              </div>
                            ) : (
                              "No reply yet"
                            )
                          }
                        />
                      </ListItem>
                      {index < feedbackHistory.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
