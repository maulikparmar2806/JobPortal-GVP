import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultLogo from "../../assets/images/gvp_logo.jpg";

export const ViewCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-company"
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch companies");
        }
        setCompanies(response.data);
        setFilteredCompanies(response.data); // Initialize filtered companies
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to fetch companies");
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/dashboard/manage-company/${companyId}`
      );
      if (response.status === 200) {
        setCompanies(companies.filter((company) => company.id !== companyId));
        setFilteredCompanies(
          filteredCompanies.filter((company) => company.id !== companyId)
        ); // Update filtered companies
      } else {
        throw new Error("Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      setError("Failed to delete company");
    }
  };

  const handleUpdate = (company) => {
    setSelectedCompany(company);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/dashboard/manage-company/${updatedData.id}`,
        updatedData
      );
      if (response.status === 200) {
        const updatedCompanies = companies.map((company) =>
          company.id === updatedData.id ? updatedData : company
        );
        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies); // Update filtered companies
        setShowUpdateForm(false);
      } else {
        throw new Error("Failed to update company");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      setError("Failed to update company");
    }
  };

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(keyword)
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div className="container-fluid" style={{ width: "139%" }}>
      <h2 className="text-center bg-secondary text-white py-2 mb-4">
        Company Details
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {showUpdateForm && (
        <UpdateForm
          company={selectedCompany}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setShowUpdateForm(false)}
        />
      )}
      <div className="row">
        <div className="col-lg-12 mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by Company Name"
            onChange={handleSearch}
          />
        </div>
        {filteredCompanies.map((company) => (
          <div key={company.id} className="col-lg-12 mb-4">
            <div className="card h-100 shadow company-card">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={company.logo || defaultLogo}
                    className="card-img"
                    alt="Company Logo"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{company.name}</h5>
                    <p className="card-text">{company.description}</p>
                    <p className="card-text">
                      <strong>Email:</strong> {company.email}
                    </p>
                    <p className="card-text">
                      <strong>Address:</strong> {company.street},{" "}
                      {company.landmark}, {company.area}, {company.city},{" "}
                      {company.state} - {company.pincode}
                    </p>
                    <p className="card-text">
                      <strong>Specializing in:</strong> {company.specializing}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-around bg-light">
                    {company.linkedinLink && (
                      <a
                        href={company.linkedinLink}
                        className="btn btn-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {company.websiteLink && (
                      <a
                        href={company.websiteLink}
                        className="btn btn-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(company.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdate(company)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpdateForm = ({ company, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: company.id,
    name: company.name,
    description: company.description,
    email: company.email,
    street: company.street,
    landmark: company.landmark,
    area: company.area,
    city: company.city,
    state: company.state,
    pincode: company.pincode,
    specializing: company.specializing,
    linkedinLink: company.linkedinLink,
    websiteLink: company.websiteLink,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Company Details</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="specializing">Specializing in</label>
                <input
                  type="text"
                  className="form-control"
                  id="specializing"
                  name="specializing"
                  value={formData.specializing}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="linkedinLink">LinkedIn</label>
                <input
                  type="url"
                  className="form-control"
                  id="linkedinLink"
                  name="linkedinLink"
                  value={formData.linkedinLink}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="websiteLink">Website</label>
                <input
                  type="url"
                  className="form-control"
                  id="websiteLink"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS styles for hover effect
const styles = `
.company-card {
  transition: transform 0.2s;
}

.company-card:hover {
  transform: scale(1.02);
}
`;

// Append styles to head of document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
