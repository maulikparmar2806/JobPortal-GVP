import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing
import logo from "../../assets/images/gvp_logo.jpg";
import "../../css/Topbar.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import SecurityIcon from "@mui/icons-material/Security";
import Logout from "@mui/icons-material/Logout";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../auth/AuthContext";
import { ResetPasswordDialog } from "../auth/ResetPasswordDialog";

export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const { setUser, user } = useContext(UserContext);  // Destructure user
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    if (!user) {  // If the user is not logged in, logout and redirect to login page
      logout();
      navigate("/login");
      console.log(user);
    }
  }, [user, logout, navigate]);  // Dependency array includes user, logout, and navigate
  // console.log(user);
  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenResetPasswordDialog = () => {
    setIsResetPasswordDialogOpen(true);
    handleCloseMyAccDrop();
  };

  const handleCloseResetPasswordDialog = () => {
    setIsResetPasswordDialogOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      logout();
      localStorage.removeItem("user");
      localStorage.setItem("logoutMessage", "Logout Successfully !"); // Set logout message
      navigate("/login");  // Navigate to the login page
    }
  };

  return (
    <>
      <header className="d-flex align-items-center w-100">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center logo">
            {/* Logo wrapper */}
            <div className="col-sm-2 part1">
              <Link
                to={"/student/dashboard/dashboard"}
                className="d-flex align-items-center logo"
              >
                <img src={logo} alt="GVP Logo" />
                <span>GVP</span>
              </Link>
            </div>

            <div className="col-sm-3 d-flex align-items-center part2">
              <Button className="rounded-circle">
                <MdMenuOpen />
              </Button>
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part-3">
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAccDrop}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img
                        src={user?.profilePicture || logo}
                        alt="User Profile"
                      />
                    </span>
                  </div>

                  <div className="userInfo">
                    <h4>
                      {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
                    </h4>
                    <p className="mb-0">{user?.email || "@guest"}</p>
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <Link
                      to={"/student/dashboard/MyProfile"}
                      className="d-flex align-items-center logo"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Avatar /> My account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleOpenResetPasswordDialog}>
                    <ListItemIcon>
                      <SecurityIcon fontSize="small" />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResetPasswordDialog
        open={isResetPasswordDialogOpen}
        handleClose={handleCloseResetPasswordDialog}
        email={user.email}
        sender={"student"}
      />
    </>
  );
};
