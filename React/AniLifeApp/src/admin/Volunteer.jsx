import React, { useState, useEffect } from "react";
import axios from "axios";

const API_VOLUNTEER = "http://localhost:5000/api/volunteer";
const API_USER = "http://localhost:5000/api/user";
const API_AREA = "http://localhost:5000/api/area";

export default function Volunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [mstusers, setMstUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
  volunteerId: 0,
  uid: "",
  areaid: "",
  skills: "",
  availability: "",
  experienceYears: "",
  contactNumber: "",
  status: "Pending", // default
  verifiedBy: "",
});
 

  // Fetch initial data
  useEffect(() => {
    fetchVolunteers();
    axios.get(API_USER).then(res => setMstUsers(res.data));
    axios.get(API_AREA).then(res => setAreas(res.data));
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(API_VOLUNTEER);
      setVolunteers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching volunteers");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.uid || !formData.areaid || !formData.skills || !formData.contactNumber) {
      return alert("Please fill all required fields");
    }

    try {
      if (formData.volunteerId === 0) {
        await axios.post(API_VOLUNTEER, formData);
        alert("Volunteer added successfully!");
      } else {
        await axios.put(`${API_VOLUNTEER}/${formData.volunteerId}`, formData);
        alert("Volunteer updated successfully!");
      }
      setFormData({
        volunteerId: 0,
        uid: "",
        areaid: "",
        skills: "",
        availability: "",
        experienceYears: "",
        contactNumber: "",
        status: "Pending",
        verifiedBy: "",
      });
      fetchVolunteers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error saving volunteer");
    }
  };

  const handleEdit = (vol) => {
    setFormData({
      volunteerId: vol.volunteerId,
      uid: vol.uid,
      areaid: vol.areaid,
      skills: vol.skills,
      availability: vol.availability,
      experienceYears: vol.experienceYears,
      contactNumber: vol.contactNumber,
      status: vol.status,
      verifiedBy: vol.verifiedBy || "",
      
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await axios.delete(`${API_VOLUNTEER}/${id}`);
        fetchVolunteers();
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
        Volunteer Management
      </h2>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow">
        <div className="row g-2">
          {/* User dropdown */}
          <div className="col-md-3">
            <select
              className="form-control"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {mstusers.map(u => (
                <option key={u.uid} value={u.uid}>
                  {u.fname} {u.lname}
                </option>
              ))}
            </select>
          </div>

          {/* Area dropdown */}
          <div className="col-md-2">
            <select
              className="form-control"
              name="areaid"
              value={formData.areaid}
              onChange={handleChange}
              required
            >
              <option value="">Select Area</option>
              {areas.map(a => (
                <option key={a.areaid} value={a.areaid}>{a.areaname}</option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          {/* Availability */}
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="availability"
              placeholder="Availability"
              value={formData.availability}
              onChange={handleChange}
            />
          </div>

          {/* Experience */}
          <div className="col-md-1">
            <input
              type="number"
              className="form-control"
              name="experienceYears"
              placeholder="Exp Yrs"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>

          {/* Contact */}
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="contactNumber"
              placeholder="Contact"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Add/Update buttons */}
          <div className="col-md-12 mt-2 d-flex gap-2">
            <button
              type="button"
              className="btn w-25"
              style={{ background: "#E91E8C", color: "white" }}
              onClick={handleSubmit}
            >
              {formData.volunteerId === 0 ? "Add" : "Update"}
            </button>
            {formData.volunteerId > 0 && (
              <button
                type="button"
                className="btn btn-secondary w-25"
                onClick={() =>
                  setFormData({
                    volunteerId: 0,
                    uid: "",
                    areaid: "",
                    skills: "",
                    availability: "",
                    experienceYears: "",
                    contactNumber: "",
                    status: "Pending",
                    verifiedBy: "",
                  })
                }
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <table className="table table-hover mb-0">
          <thead style={{ background: "#E91E8C", color: "white" }}>
            <tr>
              <th>Sr.No</th>
              <th>Full Name</th>
              <th>Area</th>
              <th>Skills</th>
              <th>Availability</th>
              <th>Experience</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length > 0 ? (
              volunteers.map((v, index) => {
                const user = mstusers.find(u => u.uid === v.uid);
                const area = areas.find(a => a.areaid === v.areaid);
                return (
                  <tr key={v.volunteerId}>
                    <td>{index + 1}</td>
                    <td>{user ? `${user.fname} ${user.lname}` : "Unknown"}</td>
                    <td>{area ? area.areaname : "Unknown"}</td>
                    <td>{v.skills}</td>
                    <td>{v.availability}</td>
                    <td>{v.experienceYears}</td>
                    <td>{v.contactNumber}</td>
                    <td>{v.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(v)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(v.volunteerId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Record Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}