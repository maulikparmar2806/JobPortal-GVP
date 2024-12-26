import React from "react";
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
  DialogContentText,
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
  CardContent
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
export const EducationDetails = ({formData, onChange, nextStep, prevStep }) => {
  const [open, setOpen] = useState(false);
  const { education } = formData;
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    percentage: "",
  });

  
  const handleNewEducationChange = (event) => {
    const { name, value } = event.target;
    setNewEducation({
      ...newEducation,
      [name]: value,
    });
  };

  const addEducation = () => {
    onChange({
      education: [...education, newEducation],
    });
    setNewEducation({ degree: "", institution: "", year: "", percentage: "" });
    setOpen(false);
  };

  const removeEducation = (index) => {
    const updatedEducation = education.filter((_, eduIndex) => eduIndex !== index);
    onChange({
      education: updatedEducation,
    });
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Card sx={{ mt: 3 }} variant="outlined">
        <CardHeader
            title="Education Details"
            sx={{ bgcolor: "primary.main", color: "white",
              
              textTransform: 'uppercase',
              letterSpacing: '0.1em' }}
          />
          <CardContent>
          <Button startIcon={<AddIcon />} onClick={openDialog} sx={{ mt: 2 }}>
          Add Education
        </Button>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>Add Education</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="degree"
              label="Degree"
              fullWidth
              value={newEducation.degree}
              onChange={handleNewEducationChange}
            />
            <TextField
              margin="dense"
              name="institution"
              label="Institution"
              fullWidth
              value={newEducation.institution}
              onChange={handleNewEducationChange}
            />
            <TextField
              margin="dense"
              name="year"
              label="Passing Year"
              type="number"
              fullWidth
              value={newEducation.year}
              onChange={handleNewEducationChange}
            />
            <TextField
              margin="dense"
              name="percentage"
              label="Percentage"
              type="number"
              fullWidth
              value={newEducation.percentage}
              onChange={handleNewEducationChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={addEducation}>Add</Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Degree</TableCell>
                <TableCell>Institution</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {education.length > 0 ?(
                education.map((edu, index) => (
                  <TableRow key={index}>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>{edu.year}</TableCell>
                    <TableCell>{edu.percentage}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeEducation(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))


              ):(<TableRow>
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
    </>
  );
};
