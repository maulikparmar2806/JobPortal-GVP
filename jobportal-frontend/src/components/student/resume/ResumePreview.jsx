import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, IconButton, Divider } from '@mui/material';
import { Edit as EditIcon, GetApp as GetAppIcon } from '@mui/icons-material';

export const ResumePreview = ({ formData, prevStep, submit }) => {
  const {
    fullName,
    email,
    objective,
    mobile,
    dob,
    religion,
    nationality,
    maritalStatus,
    address,
    languages,
    education,
    experience,
    hobbies,
    skills,
    projectDetails,
    photoURL,
  } = formData;

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', mt: 3, textAlign: 'center', backgroundColor: 'white', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '10px' }}>
      <Box sx={{ display: 'inline-block', textAlign: 'left', marginTop: '20px' }}>
        {/* Photo and Personal Info */}
        <Box sx={{ textAlign: 'center' }}>
          {/* Photo */}
          {photoURL ? (
            <img
              src={photoURL}
              alt="User"
              style={{
                width: '100px',
                height: '100px',
                
                marginBottom: '20px',
              }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
               
                backgroundColor: '#ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Typography variant="body1" color="primary">
                No Photo
              </Typography>
            </div>
          )}
          {/* Full Name */}
          <Typography variant="h5" sx={{ marginBottom: '10px' }}>
            {fullName}
          </Typography>
          {/* Objective */}
          <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Objective</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {objective}
          </Typography>
          </Box>
          
          {/* Personal Information */}
          <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
            <Typography variant="subtitle1">Personal Information</Typography>
            <Divider sx={{ marginBottom: '2px' }} />
            <List dense>
              <ListItem>
                <ListItemText primary={`Date of Birth: ${dob}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Religion: ${religion}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Nationality: ${nationality}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Marital Status: ${maritalStatus}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Address: ${address}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${email}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Mobile: ${mobile}`} />
              </ListItem>
              
            </List>
          </Box>
        </Box>

        {/* Education */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Education</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {education.map((edu, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText
                  primary={`${edu.degree} - ${edu.institution}, ${edu.year}`}
                  secondary={`Percantage: ${edu.percentage}%`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Experience */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Experience</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {experience.map((exp, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText
                  primary={`${exp.position} - ${exp.company}, ${exp.duration}`}
                  secondary={`Desctiption: ${exp.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Hobbies */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Hobbies</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {hobbies.map((hobby, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText primary={hobby} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Skills */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Skills</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {skills.map((skill, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* languages known */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Languages Known</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {languages.map((skill, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Project Details */}
        <Box sx={{ textAlign: 'left', marginBottom: '30px' }}>
          <Typography variant="subtitle1">Project Details</Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <List dense>
            {projectDetails.map((project, index) => (
              <ListItem key={index} sx={{ textAlign: 'left' }}>
                <ListItemText
                  primary={`${project.title} - Link:${project.link}`}
                  secondary={`Description: ${project.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Edit and Download Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <IconButton onClick={prevStep} sx={{ marginRight: '10px' }}>
            <EditIcon />
          </IconButton>
          <Button
            variant="contained"
            onClick={submit}
            endIcon={<GetAppIcon />}
          >
            Download Resume
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
