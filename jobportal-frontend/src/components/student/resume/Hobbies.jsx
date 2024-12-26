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

export const Hobbies = ({ formData,onChange,nextStep, prevStep }) => {
  const { hobbies } = formData;
  
  const [open, setOpen] = useState(false);
  const [newHobby, setNewHobby] = useState("");

  const handleNewHobbyChange = (event) => {
    setNewHobby(event.target.value);
  };

  const addHobby = () => {
    onChange({
      hobbies: [...hobbies, newHobby],
    });
    setNewHobby("");
    setOpen(false);
  };

  const removeHobby = (index) => {
    const updatedHobbies = hobbies.slice();
    updatedHobbies.splice(index, 1);
    onChange({
      hobbies: updatedHobbies,
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
          title="Hobbies"
          sx={{
            bgcolor: "primary.main",
            color: "white",

            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        />
        <CardContent>
          <Button startIcon={<AddIcon />} onClick={openDialog} sx={{ mt: 2 }}>
            Add Hobby
          </Button>
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Add Hobby</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                name="hobby"
                label="Hobby"
                fullWidth
                value={newHobby}
                onChange={handleNewHobbyChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={addHobby}>Add</Button>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Hobby</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hobbies.length > 0 ? (
                  hobbies.map((hobby, index) => (
                    <TableRow key={index}>
                      <TableCell>{hobby}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeHobby(index)}>
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
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
