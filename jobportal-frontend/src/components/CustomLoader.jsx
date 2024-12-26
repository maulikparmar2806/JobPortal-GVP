import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import logo from "../assets/images/gvp_logo.jpg";
import "../css/Customloader.css";

export const CustomLoader = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        className="custom-loader-container"
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="indeterminate"
            size={150}
            thickness={0.5}
            color="success"
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: 130, height: 130, borderRadius: "50%" }}
            />
          </Box>
        </Box>
        <Typography variant="caption" mt={2}>
          Loading.....
        </Typography>
      </Box>
    </>
  );
};
