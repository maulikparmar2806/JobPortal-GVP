import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../assets/images/gvp_logo.jpg";

export const ViewJobPost = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  const [updatedJobTitle, setUpdatedJobTitle] = useState("");
  const [updatedJobDescription, setUpdatedJobDescription] = useState("");
  const [updatedJobRequirementSkill, setUpdatedJobRequirementSkill] =
    useState("");
  const [updatedJobRole, setUpdatedJobRole] = useState("");
  const [updatedJobVacancy, setUpdatedJobVacancy] = useState(1);
  const [updatedJobType, setUpdatedJobType] = useState("");
  const [updatedJobSalary, setUpdatedJobSalary] = useState("");
  const [updatedLastApplicationDate, setUpdatedLastApplicationDate] =
    useState("");
  const [updateError, setUpdateError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-jobPost"
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch job posts");
        }
        setJobPosts(response.data);
        setFilteredJobPosts(response.data); // Initialize filtered job posts
      } catch (error) {
        console.error("Error fetching job posts:", error);
        setError("Failed to fetch job posts");
      }
    };

    fetchJobPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/dashboard/manage-jobPost/${id}`
      );
      if (response.status === 204) {
        setJobPosts(jobPosts.filter((jobPost) => jobPost.id !== id));
        setFilteredJobPosts(
          filteredJobPosts.filter((jobPost) => jobPost.id !== id)
        ); // Update filtered job posts
        console.log(`Deleted job post with ID ${id}`);
      } else {
        throw new Error("Failed to delete job post");
      }
    } catch (error) {
      console.error("Error deleting job post:", error);
      setError("Failed to delete job post");
    }
  };

  const handleUpdate = (jobPost) => {
    setSelectedJobPost(jobPost);
    setUpdatedJobTitle(jobPost.jobTitle);
    setUpdatedJobDescription(jobPost.jobDescription);
    setUpdatedJobRequirementSkill(jobPost.jobRequirementSkill);
    setUpdatedJobRole(jobPost.jobRole);
    setUpdatedJobVacancy(jobPost.jobVacancy);
    setUpdatedJobType(jobPost.jobType);
    setUpdatedJobSalary(jobPost.jobSalary);
    setUpdatedLastApplicationDate(
      jobPost.lastApplicationDate
        ? jobPost.lastApplicationDate.split("T")[0]
        : ""
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJobPost(null);
    setUpdateError(null);
  };

  const updateJobPost = async (e) => {
    e.preventDefault();

    // Date validation
    const today = new Date().toISOString().split("T")[0];
    if (updatedLastApplicationDate < today) {
      setUpdateError("Last application date cannot be in the past.");
      return;
    }

    const updatedData = {
      id: selectedJobPost.id,
      jobTitle: updatedJobTitle,
      jobDescription: updatedJobDescription,
      jobRequirementSkill: updatedJobRequirementSkill,
      jobRole: updatedJobRole,
      jobVacancy: updatedJobVacancy,
      jobType: updatedJobType,
      jobSalary: updatedJobSalary,
      lastApplicationDate: updatedLastApplicationDate,
      company: selectedJobPost.company,
      jobPostImg: selectedJobPost.jobPostImg, // Assuming jobPostImg is not editable in this form
      companyLocation: selectedJobPost.companyLocation, // Assuming companyLocation is not editable in this form
      createdDate: selectedJobPost.createdDate, // Assuming createdDate is not editable in this form
      updatedDate: selectedJobPost.updatedDate, // Assuming updatedDate is not editable in this form
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/admin/dashboard/manage-jobPost/${updatedData.id}`,
        updatedData
      );
      if (response.status === 200) {
        // Update job post in the state
        setJobPosts(
          jobPosts.map((jobPost) =>
            jobPost.id === updatedData.id
              ? { ...jobPost, ...updatedData }
              : jobPost
          )
        );
        setFilteredJobPosts(
          filteredJobPosts.map((jobPost) =>
            jobPost.id === updatedData.id
              ? { ...jobPost, ...updatedData }
              : jobPost
          )
        );
        console.log(`Updated job post with ID ${updatedData.id}`);
        closeModal();
      } else {
        throw new Error("Failed to update job post");
      }
    } catch (error) {
      console.error("Error updating job post:", error);
      setUpdateError("Failed to update job post");
    }
  };

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchKeyword(keyword);
    const filtered = jobPosts.filter((jobPost) =>
      jobPost.jobTitle.toLowerCase().includes(keyword)
    );
    setFilteredJobPosts(filtered);
  };

  return (
    <div className="container-fluid" style={{ width: "139%" }}>
      <h2 className="text-center bg-secondary text-white py-2 mb-4">
        Job Posts
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-lg-12 mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by Job Title"
            onChange={handleSearch}
          />
        </div>
        {filteredJobPosts.length === 0 ? (
          <div className="col-lg-12 mb-4">
            <div className="alert alert-info" role="alert">
              No job posts found.
            </div>
          </div>
        ) : (
          filteredJobPosts.map((jobPost) => (
            <div key={jobPost.id} className="col-lg-12 mb-4">
              <div className="card h-100 shadow">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={jobPost.jobPostImg || defaultImage}
                      className="card-img"
                      alt="Job Post"
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{jobPost.jobTitle}</h5>
                      <p className="card-text">{jobPost.jobDescription}</p>
                      <p className="card-text">
                        <strong>Skills Required:</strong>{" "}
                        {jobPost.jobRequirementSkill}
                      </p>
                      <p className="card-text">
                        <strong>Role:</strong> {jobPost.jobRole}
                      </p>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>Vacancy:</strong> {jobPost.jobVacancy}
                        </div>
                        <div>
                          <strong>Type:</strong> {jobPost.jobType}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text mt-2">
                          <strong>Salary:</strong> {jobPost.jobSalary} LPA
                        </p>
                        <p className="card-text mt-2">
                          <strong>Last Application Date:</strong>{" "}
                          {jobPost.lastApplicationDate}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-around bg-light">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdate(jobPost)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(jobPost.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for updating job post */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Job Post</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form to update job post */}
                <form onSubmit={updateJobPost}>
                  <div className="form-group">
                    <label htmlFor="updatedJobTitle">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedJobTitle"
                      value={updatedJobTitle}
                      onChange={(e) => setUpdatedJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobDescription">
                      Job Description
                    </label>
                    <textarea
                      className="form-control"
                      id="updatedJobDescription"
                      rows={3}
                      value={updatedJobDescription}
                      onChange={(e) => setUpdatedJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobRequirementSkill">
                      Skills Required
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedJobRequirementSkill"
                      value={updatedJobRequirementSkill}
                      onChange={(e) =>
                        setUpdatedJobRequirementSkill(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobRole">Job Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedJobRole"
                      value={updatedJobRole}
                      onChange={(e) => setUpdatedJobRole(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobVacancy">Vacancy</label>
                    <input
                      type="number"
                      className="form-control"
                      id="updatedJobVacancy"
                      value={updatedJobVacancy}
                      onChange={(e) => setUpdatedJobVacancy(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobType">Job Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedJobType"
                      value={updatedJobType}
                      onChange={(e) => setUpdatedJobType(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedJobSalary">Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedJobSalary"
                      value={updatedJobSalary}
                      onChange={(e) => setUpdatedJobSalary(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedLastApplicationDate">
                      Last Application Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="updatedLastApplicationDate"
                      min={new Date().toISOString().split("T")[0]} // Prevent past dates
                      value={updatedLastApplicationDate}
                      onChange={(e) =>
                        setUpdatedLastApplicationDate(e.target.value)
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
