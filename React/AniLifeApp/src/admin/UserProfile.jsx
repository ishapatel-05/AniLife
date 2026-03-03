import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [mstusers, setMstUsers] = useState([]);
  const [areas, setAreas] = useState([]);

  const [formData, setFormData] = useState({
    upid: 0,         // 0 = new record, >0 = edit
    uid: "",
    address: "",
    areaid: "",
    picture: null,
    old_picture: "",
  });

  // Fetch mstusers and areas on mount
  useEffect(() => {
    fetchProfiles();
    axios.get("http://localhost:5000/api/mstuser").then(res => setMstUsers(res.data));
    axios.get("http://localhost:5000/api/area").then(res => setAreas(res.data));
  }, []);

  const fetchProfiles = () => {
    axios.get("http://localhost:5000/api/userprofile").then(res => {
      setProfiles(res.data);
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("uid", formData.uid);
    data.append("address", formData.address);
    data.append("areaid", formData.areaid);
    if (formData.picture) data.append("picture", formData.picture);
    data.append("old_picture", formData.old_picture);

    try {
      if (formData.upid === 0) {
        await axios.post("http://localhost:5000/api/userprofile", data);
        alert("User profile added!");
      } else {
        await axios.put(`http://localhost:5000/api/userprofile/${formData.upid}`, data);
        alert("User profile updated!");
      }
      setFormData({
        upid: 0,
        uid: "",
        address: "",
        areaid: "",
        picture: null,
        old_picture: "",
      });
      fetchProfiles();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  // Edit record
  const handleEdit = (profile) => {
    setFormData({
      upid: profile.upid,
      uid: profile.uid,
      address: profile.address,
      areaid: profile.areaid,
      picture: null,
      old_picture: profile.picture,
    });
  };

  // Delete record (soft delete)
  const handleDelete = async (upid) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/userprofile/${upid}`);
      fetchProfiles();
    }
  };

  return (
    <div>
      <h2>User Profile Management</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>User:</label>
        <select name="uid" value={formData.uid} onChange={handleChange} required>
          <option value="">Select User</option>
          {mstusers.map(u => (
            <option key={u.uid} value={u.uid}>
              {u.fname} {u.lname}
            </option>
          ))}
        </select>

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Area:</label>
        <select name="areaid" value={formData.areaid} onChange={handleChange} required>
          <option value="">Select Area</option>
          {areas.map(a => (
            <option key={a.areaid} value={a.areaid}>
              {a.areaname}
            </option>
          ))}
        </select>

        <label>Profile Picture:</label>
        <input type="file" name="picture" onChange={handleChange} />
        {formData.old_picture && (
          <div>
            <img
              src={`http://localhost:5000/uploads/${formData.old_picture}`}
              alt="Profile"
              width="80"
            />
          </div>
        )}

        <button type="submit">{formData.upid === 0 ? "Add" : "Update"}</button>
      </form>

      <h3>Existing Profiles</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Address</th>
            <th>Area</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p.upid}>
              <td>{p.fname} {p.lname}</td>
              <td>{p.address}</td>
              <td>{p.areaname}</td>
              <td>
                <img src={`http://localhost:5000/uploads/${p.picture}`} alt="Profile" width="60" />
              </td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.upid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;