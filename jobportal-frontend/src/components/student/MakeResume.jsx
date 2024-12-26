import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PersonalDetails } from "./resume/PersonalDetails";

import { EducationDetails } from "./resume/EducationDetails";
import { ExperienceDetails } from "./resume/ExperienceDetails";
import { Hobbies } from "./resume/Hobbies";
import { Skills } from "./resume/Skills";
import { ProjectDetails } from "./resume/ProjectDetails";
import { jsPDF } from "jspdf";
import { ResumePreview } from "./resume/ResumePreview";

export const MakeResume = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    objective: "",
    mobile: "",
    dob: "",
    religion: "",
    nationality: "",
    maritalStatus: "single", // Default value
    address: "",
    languages: [],
    education: [],
    experience: [],
    hobbies: [],
    skills: [],
    projectDetails: [],
  });
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submit = () => {
    generatePDF(formData);
    {
      /*setFormData({
      fullName: "",
      email: "",
      objective: "",
      mobile: "",
      dob: "",
      religion: "",
      nationality: "",
      maritalStatus: "single",
      address: "",
      languages: [],
      education: [],
      experience: [],
      hobbies: [],
      skills: [],
      projectDetails: [],
      photoURL: "",
    });
    setStep(0);*/
    }
  };
  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const steps = [
    <PersonalDetails
      formData={formData}
      onChange={handleFormDataChange}
      nextStep={nextStep}
    />,
    <EducationDetails
      formData={formData}
      onChange={handleFormDataChange}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <ExperienceDetails
      formData={formData}
      onChange={handleFormDataChange}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <Hobbies
      formData={formData}
      onChange={handleFormDataChange}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <Skills
      formData={formData}
      onChange={handleFormDataChange}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <ProjectDetails
      formData={formData}
      onChange={handleFormDataChange}
      prevStep={prevStep}
      nextStep={nextStep}
    />,
    <ResumePreview
      formData={formData}
      onChange={handleFormDataChange}
      prevStep={prevStep}
      submit={submit}
    />,
  ];

  const addSection = (doc, startY, title, lines, pageHeight) => {
    if (startY + 10 + lines.length * 10 > pageHeight) {
      doc.addPage();
      startY = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text(title, 10, startY);
    doc.setDrawColor(0, 0, 255);
    doc.line(10, startY + 2, 200, startY + 2);
    startY += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    lines.forEach((line) => {
      doc.text(line, 10, startY);
      startY += 10;
    });

    return startY;
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let startY = 20;

    // Add the title above the image
    doc.setFontSize(16);
    doc.text("Resume", 105, startY, null, null, "center");
    startY += 10;

    // Add the image if available and center it
    if (data.photoURL) {
      const img = new Image();
      img.src = data.photoURL;
      const imgWidth = 50; // Image width
      const imgHeight = 50; // Image height
      const imgX = (pageWidth - imgWidth) / 2; // Center the image
      doc.addImage(img, "JPEG", imgX, startY, imgWidth, imgHeight);
      startY += 60;
    }

    // Add Personal Details
    startY = addSection(
      doc,
      startY,
      "Personal Details",
      [
        `Full Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Mobile: ${data.mobile}`,
        `DOB: ${data.dob}`,
        `Religion: ${data.religion}`,
        `Nationality: ${data.nationality}`,
        `Marital Status: ${data.maritalStatus}`,
        `Address: ${data.address}`,
      ],
      pageHeight
    );

    // Add Languages Known
    startY = addSection(
      doc,
      startY,
      "Languages Known",
      [data.languages.join(", ")],
      pageHeight
    );

    // Add Objective
    startY = addSection(doc, startY, "Objective", [data.objective], pageHeight);

    // Add Education
    startY = addSection(
      doc,
      startY,
      "Education",
      data.education.map(
        (edu, index) =>
          `${index + 1}. ${edu.degree} - ${edu.institution} (${
            edu.year
          }) with ${edu.percentage}%`
      ),
      pageHeight
    );

    // Add Experience
    startY = addSection(
      doc,
      startY,
      "Experience",
      data.experience.map(
        (exp, index) =>
          `${index + 1}. ${exp.position} at ${exp.company} for ${
            exp.duration
          } Year(s).\nDescription: ${exp.description}`
      ),
      pageHeight
    );

    // Add Skills
    startY = addSection(
      doc,
      startY,
      "Skills",
      [data.skills.join(", ")],
      pageHeight
    );

    // Add Hobbies
    startY = addSection(
      doc,
      startY,
      "Hobbies",
      [data.hobbies.join(", ")],
      pageHeight
    );

    // Add Projects
    startY = addSection(
      doc,
      startY,
      "Projects",
      data.projectDetails.map(
        (project, index) =>
          `${index + 1}. ${project.title}\nDescription: ${project.description}`
      ),
      pageHeight
    );

    doc.save(`${data.fullName}-Resume.pdf`);
  };

  return (
    <>
      <Box sx={{ maxWidth: "650px", margin: "0 auto" }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            border: "1px solid #3f51b5",
          }}
        >
          Make Resume
        </Typography>
        {steps[step]}
      </Box>
    </>
  );
};
