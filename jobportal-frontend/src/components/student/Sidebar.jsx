import React, { useState, useContext } from "react";
import "../../css/Sidebar.css";
import Button from "@mui/material/Button";
import { RxDashboard } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import Logout from "@mui/icons-material/Logout";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Ensure the correct import path
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  const { setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      logout();
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };

  return (
    <>
      <div className="main d-flex">
        <div className="sidebarWrapper">
          <div className="sidebar">
            <ul>
              <li>
                <Link to={"/student/dashboard/dashboard"}>
                  <Button
                    className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => isOpenSubmenu(0)}
                  >
                    <span className="icon">
                      <RxDashboard />
                    </span>
                    Dashboard
                  </Button>
                </Link>
              </li>

              <li>
                <Link to={"/student/dashboard/resume/make"}>
                  <Button
                    className={`w-100 ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => isOpenSubmenu(1)}
                  >
                    <span className="icon">
                      <PermContactCalendarOutlinedIcon />
                    </span>
                    Make Resume
                  </Button>
                </Link>
              </li>
              {/* <li>
                <Button
                  className={`w-100 ${activeTab === 1 ? "active" : ""}`}
                  onClick={() => isOpenSubmenu(1)}
                >
                  <span className="icon">
                    <PermContactCalendarOutlinedIcon />
                  </span>
                  Resume
                  <span className="arrow">
                    <FaAngleRight />
                  </span>
                </Button>
                <div
                  className={`submenuWrapper ${
                    activeTab === 1 && isToggleSubmenu === true
                      ? "colapse"
                      : "colapsed"
                  }`}
                >
                  <ul className="submenu">
                    <li>
                      <Link to="/student/dashboard/resume/make">
                        Make Resume
                      </Link>
                    </li>
                    <li>
                      <Link to="/student/dashboard/resume/view">
                        View Resume
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}

              <li>
                <Link to={"/student/dashboard/findjob"}>
                  <Button
                    className={`w-100 ${
                      activeTab === 2 && isToggleSubmenu === true
                        ? "active"
                        : ""
                    }`}
                    onClick={() => isOpenSubmenu(2)}
                  >
                    <span className="icon">
                      <WorkOutlineOutlinedIcon />
                    </span>
                    Find Job
                  </Button>
                </Link>
              </li>

              <li>
                <Link to={"/student/dashboard/appliedjob/view"}>
                  <Button
                    className={`w-100 ${activeTab === 3 ? "active" : ""}`}
                    onClick={() => isOpenSubmenu(3)}
                  >
                    <span className="icon">
                      <BadgeOutlinedIcon />
                    </span>
                    View Applied Job
                  </Button>
                </Link>
              </li>

              <li>
                <Link to={"/student/dashboard/givefeedback"}>
                  <Button
                    className={`w-100 ${activeTab === 4 ? "active" : ""}`}
                    onClick={() => isOpenSubmenu(4)}
                  >
                    <span className="icon">
                      <InsertCommentOutlinedIcon />
                    </span>
                    Give Feedback
                  </Button>
                </Link>
              </li>

              <li>
                <Button
                  className={`w-100 ${activeTab === 9 ? "active" : ""}`}
                  onClick={handleLogout}
                >
                  <span className="icon">
                    <Logout />
                  </span>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
