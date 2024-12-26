import React, { useState, useEffect } from "react";
import { 
  Avatar, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Button 
} from "@mui/material";
import "../../../css/Profile.css"; // Make sure this file exists
import { CustomLoader } from "../../CustomLoader";

export const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState(null); // Store all data here
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API or database
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API response delay
      setTimeout(() => {
        const mockData = {
          personalDetails: {
            name: "Parikhitsinh Vaghela",
            location: "Ahmedabad, Gujarat, India",
            description: "Aspiring MCA Graduate | Passionate about Software Development and Emerging Technologies."
          },
          education: [
            { degree: "MCA", institution: "ABC University", year: "2023" },
            { degree: "BCA", institution: "XYZ College", year: "2020" }
          ],
          projects: [
            { title: "Portfolio Website", description: "Built using React and Material-UI." },
            { title: "E-commerce App", description: "Developed a shopping platform with React and Node.js." }
          ],
          skills: ["JavaScript", "React", "Node.js", "MongoDB"],
          experience: [
            { company: "Tech Corp", role: "Software Developer", duration: "2 years" },
            { company: "Startup Hub", role: "Intern", duration: "6 months" }
          ],
          resumeLink: "path/to/your/resume.pdf" // Add the path to the resume here
        };
        setData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <Typography><CustomLoader/></Typography>; // Show loading state

  return (
    <div className="profile-container" style={{width:"75vw", padding:"0px", margin:"0px", background:"none"}}>
      <Card className="card" sx={{ maxWidth: 800, margin: "0 auto", mt: 5 }}>
        {/* Header with Avatar and Basic Info */}
        <div className="header" style={{ display: "flex", alignItems: "center", padding: 20 }}>
          <Avatar
            className="profile-image"
            src="/gvp_logo.jpeg"
            alt="Profile"
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <div>
            <Typography variant="h5" className="name">
              {data.personalDetails.name}
            </Typography>
            <Typography variant="body2" className="location">
              {data.personalDetails.location}
            </Typography>
          </div>
        </div>

        <CardContent>
          <Typography variant="body1" className="description" sx={{ mb: 2 }}>
            {data.personalDetails.description}
          </Typography>
        </CardContent>

        {/* Tabs for different sections */}
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Personal Details" />
          <Tab label="Education" />
          <Tab label="Projects" />
          <Tab label="Skills" />
          <Tab label="Experience" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6">Personal Details</Typography>
          <Typography>Name: {data.personalDetails.name}</Typography>
          <Typography>Location: {data.personalDetails.location}</Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6">Education</Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography>{edu.degree} - {edu.institution} ({edu.year})</Typography>
            </Box>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6">Projects</Typography>
          {data.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography><strong>{project.title}</strong>: {project.description}</Typography>
            </Box>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6">Skills</Typography>
          {data.skills.map((skill, index) => (
            <Typography key={index}>{skill}</Typography>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6">Experience</Typography>
          {data.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography>
                {exp.role} at {exp.company} - {exp.duration}
              </Typography>
            </Box>
          ))}
        </TabPanel>

        {/* Resume Action Buttons */}
        <CardContent sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.open(data.resumeLink, "_blank")}
          >
            View Resume
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => window.location.href = data.resumeLink}
          >
            Download Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// TabPanel Component for displaying content based on active tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
