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

export const Skills = ({formData,onChange, nextStep, prevStep }) => {
  const { skills } = formData;
  
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleNewSkillChange = (event) => {
    setNewSkill(event.target.value);
  };

  const addSkill = () => {
    onChange({
      skills: [...skills, newSkill],
    });
    setNewSkill("");
    setOpen(false);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.slice();
    updatedSkills.splice(index, 1);
    onChange({
      skills: updatedSkills,
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
          title="Skills"
          sx={{ bgcolor: "primary.main", color: "white",
              
            textTransform: 'uppercase',
            letterSpacing: '0.1em' }}
        />
        <CardContent>
          <Button startIcon={<AddIcon />} onClick={openDialog} sx={{ mt: 2 }}>
            Add Skill
          </Button>
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="skill"
                label="Skill"
                fullWidth
                value={newSkill}
                onChange={handleNewSkillChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={addSkill}>Add</Button>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Skill</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skills.length > 0 ?(
                     skills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>{skill}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeSkill(index)}>
                            <RemoveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))


                ):(

                  <TableRow>
                  <TableCell colSpan={2} align="center">
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
