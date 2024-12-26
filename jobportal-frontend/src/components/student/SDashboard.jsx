import React, { useEffect, useState, useContext } from "react"; // Added useContext import
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import "../../css/SDashboard.css"; // Import custom CSS file
import { UserContext } from "../../context/UserContext";

export const SDashboard = () => {
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [availableJobsCount, setAvailableJobsCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const appliedJobsResponse = await axios.post(
          `http://localhost:8080/api/applications/CountOfApplication?studentId=${user.studentId}`
        );
        const availableJobsResponse = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-jobPost/count"
        );

        setAppliedJobsCount(appliedJobsResponse.data);
        setAvailableJobsCount(availableJobsResponse.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, [user.studentId]);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              {/* Small Box for Applied Jobs */}
              <div className="small-box bg-secondary">
                <div className="inner">
                  <h3>{appliedJobsCount}</h3>
                  <p>Applied Jobs</p>
                </div>
                <div className="icon">
                  <BadgeOutlinedIcon />
                </div>
                <a
                  href="/student/dashboard/appliedjob/view"
                  className="small-box-footer"
                >
                  View <KeyboardArrowRightIcon />
                </a>
              </div>
            </div>
            {/* End Column */}

            <div className="col-lg-4 col-sm-6">
              {/* Small Box for Available Jobs */}
              <div className="small-box bg-dark">
                <div className="inner">
                  <h3>{availableJobsCount}</h3>
                  <p>Available Jobs</p>
                </div>
                <div className="icon">
                  <WorkOutlineOutlinedIcon />
                </div>
                <a
                  href="/student/dashboard/findjob"
                  className="small-box-footer"
                >
                  View <KeyboardArrowRightIcon />
                </a>
              </div>
            </div>
            {/* End Column */}
          </div>
        </div>
      </section>
    </>
  );
};
