import React from "react";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { CommonAlert } from "../CommonAlert";
import  { useState } from "react";

export const AdminDashboard = () => {
  const [alert, setAlert] = useState({
    open: false,
    severity: "success", // default to 'success'
    message: "",
  });

  // Function to show the alert
  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, severity, message });
  };

  // Function to hide the alert
  const hideAlert = () => {
    setAlert({ ...alert, open: false });
  };


  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="right-content">
        <Outlet context={{ showAlert }} />
        <CommonAlert
          open={alert.open}
          severity={alert.severity}
          message={alert.message}
          onClose={hideAlert}
        />
      </div>
    </>
  );
};
