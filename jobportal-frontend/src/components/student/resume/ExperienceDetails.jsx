import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

export const ExperienceDetails = ({formData, onChange, nextStep, prevStep }) => {
  const { experience } = formData;

  const [open, setOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    duration: "",
    description: "",
  });

  const handleNewExperienceChange = (event) => {
    setNewExperience({
      ...newExperience,
      [event.target.name]: event.target.value,
    });
  };

  const addExperience = () => {
    onChange({
      experience: [...experience, newExperience],
    });
    setNewExperience({
      position: "",
      company: "",
      duration: "",
      description: "",
    });
    setOpen(false);
  };

  const removeExperience = (index) => {
    const updatedExperience = experience.slice();
    updatedExperience.splice(index, 1);
    onChange({
      experience: updatedExperience,
    });
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Card sx={{ mt: 3 }} variant="outlined">
        <CardHeader
          title="Experience Details"
          sx={{ bgcolor: "primary.main", color: "white",
              
            textTransform: 'uppercase',
            letterSpacing: '0.1em' }}
        />
        <CardContent>
          <Button startIcon={<AddIcon />} onClick={openDialog} sx={{ mt: 2 }}>
            Add Experience
          </Button>
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="position"
                label="Position"
                fullWidth
                value={newExperience.position}
                onChange={handleNewExperienceChange}
              />
              <TextField
                margin="dense"
                name="company"
                label="Company"
                fullWidth
                value={newExperience.company}
                onChange={handleNewExperienceChange}
              />
              <TextField
                margin="dense"
                name="duration"
                label="Duration"
                fullWidth
                value={newExperience.duration}
                onChange={handleNewExperienceChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                value={newExperience.description}
                onChange={handleNewExperienceChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={addExperience}>Add</Button>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {experience.length > 0 ?(
                    experience.map((exp, index) => (
                      <TableRow key={index}>
                        <TableCell>{exp.position}</TableCell>
                        <TableCell>{exp.company}</TableCell>
                        <TableCell>{exp.duration}</TableCell>
                        <TableCell>{exp.description}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeExperience(index)}>
                            <RemoveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))



                ):(

                  <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data !
                  </TableCell>
                </TableRow>
                )}


                
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <IconButton onClick={prevStep}>
              <ArrowCircleLeftOutlinedIcon
                sx={{ fontSize: "40px" }}
                color="primary"
              />
            </IconButton>
            <IconButton onClick={nextStep}>
              <ArrowCircleRightOutlinedIcon
                sx={{ fontSize: "40px" }}
                color="primary"
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
