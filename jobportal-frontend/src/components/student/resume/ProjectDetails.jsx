import React from "react";

import { useState } from "react";
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
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

export const ProjectDetails = ({ formData,onChange,prevStep,nextStep}) => {
  const { projectDetails } = formData;

  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    
  });

  const handleNewProjectChange = (event) => {
    setNewProject({
      ...newProject,
      [event.target.name]: event.target.value,
    });
  };

  const addProject = () => {
    onChange({
      projectDetails: [...projectDetails, newProject],
    });
    setNewProject({ title: "", description: "", link: "" });
    setOpen(false);
  };

  const removeProject = (index) => {
    const newProjectList = projectDetails.slice();
    newProjectList.splice(index, 1);
    onChange({
      projectDetails: newProjectList,
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
          title="Project Details"
          sx={{
            bgcolor: "primary.main",
            color: "white",

            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        />

        <CardContent>
          <Button startIcon={<AddIcon />} onClick={openDialog} sx={{ mt: 2 }}>
            Add Project
          </Button>
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="title"
                label="Project Title"
                fullWidth
                value={newProject.title}
                onChange={handleNewProjectChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Project Description"
                fullWidth
                value={newProject.description}
                onChange={handleNewProjectChange}
              />
              <TextField
                margin="dense"
                name="link"
                label="Project Link"
                fullWidth
                value={newProject.link}
                onChange={handleNewProjectChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={addProject}>Add</Button>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {projectDetails.length > 0 ? (
                  projectDetails.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.description}</TableCell>
                      <TableCell>{project.link}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeProject(index)}>
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
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
            <Button
              variant="contained"
              onClick={nextStep}
            >
              Generate Resume
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
