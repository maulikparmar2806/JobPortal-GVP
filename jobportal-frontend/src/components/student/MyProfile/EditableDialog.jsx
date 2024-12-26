import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
// import {PersonalDetails} from './PersonalDetails'; // Import your components here
// import EducationDetails from './EducationDetails';
// import ExperienceDetails from './ExperienceDetails';
// import ProjectDetails from './ProjectDetails';
// import Skills from './Skills';
import { PersonalDetails } from "../resume/PersonalDetails";
import { EducationDetails } from "../resume/EducationDetails";
import { ExperienceDetails } from "../resume/ExperienceDetails";
import { ProjectDetails } from "../resume/ProjectDetails";
import { Skills } from "../resume/Skills";

export const EditableDialog = ({ open, handleClose, title, Component }) => (
  <Dialog
    open={open}
    onClose={(e, reason) => { if (reason === "backdropClick") return; handleClose(); }}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>
      <Component /> {/* Render the section-specific component */}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" variant="outlined" style={{ marginRight: "auto" }}>
        Close
      </Button>
      <Button onClick={() => console.log(`${title} updated`)} color="primary" variant="outlined">
        Save Changes
      </Button>
    </DialogActions>
  </Dialog>
);

