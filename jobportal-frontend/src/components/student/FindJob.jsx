import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import WorkHistoryOutlined from "@mui/icons-material/WorkHistoryOutlined";
import { useNavigate } from "react-router-dom";

export const FindJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-jobPost"
        );
        console.log("API Response:", response.data); // Log the API response
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs
    .filter((job) => job.active) // Filter for active jobs
    .filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCardClick = (jobId) => {
    navigate(`/student/dashboard/findjob/${jobId}`);
  };

  return (
    <Container>
      <Box my={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Jobs
        </Typography>
        <Box mb={4} display="flex">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search job here"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{ ml: 2 }}
            startIcon={<SearchSharpIcon />}
          >
            Search
          </Button>
        </Box>
        {filteredJobs.length > 0 ? (
          <Grid container spacing={5} width={"70vw"}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} key={job.id}>
                <Card
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => handleCardClick(job.id)}
                >
                  <Avatar
                    src={job.company.logo}
                    alt={`${job.jobTitle} logo`}
                    sx={{ width: 150, height: 150, margin: 2 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                      <Typography component="h5" variant="h5">
                        {job.jobTitle}
                      </Typography>
                      <Typography color="textSecondary" variant="body1">
                        {job.jobDescription}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        Role: {job.jobRole}
                      </Typography>
                      <Box display="flex" mt={1}>
                        <Box mr={2} display="flex" alignItems="center">
                          <HistoryIcon />
                          <Typography variant="body2" ml={1}>
                            {job.jobType}
                          </Typography>
                        </Box>
                        <Box mr={2} display="flex" alignItems="center">
                          <AttachMoneyRoundedIcon />
                          <Typography variant="body2" ml={1}>
                            {job.jobSalary} LPA
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <WorkHistoryOutlined />
                          <Typography variant="body2" ml={1}>
                            Last date to apply: {job.lastApplicationDate}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No jobs available
          </Typography>
        )}
      </Box>
    </Container>
  );
};
