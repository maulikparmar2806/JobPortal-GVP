import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // Mock authentication function
  const user = { loggedIn: true }; // Replace with real authentication logic
  return user && user.loggedIn;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
