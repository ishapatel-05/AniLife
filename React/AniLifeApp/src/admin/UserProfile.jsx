import React, { useState, useEffect } from "react";
import axios from "axios";

const API_USERPROFILE = "http://localhost:5000/api/userprofile";
const API_USER = "http://localhost:5000/api/user";
const API_AREA = "http://localhost:5000/api/area";

export default function UserProfile() {
  const [profiles, setProfiles] = useState([]);
  const [mstusers, setMstUsers] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    upid: 0,
    uid: "",
    address: "",
    areaid: "",
    picture: null,
    old_picture: "",
  });

  // Fetch data on mount
  useEffect(() => {
  const fetchData = async () => {
    try {
      const usersRes = await axios.get(API_USER);
      setMstUsers(usersRes.data);

      const areasRes = await axios.get(API_AREA);
      setAreas(areasRes.data);

      const profilesRes = await axios.get(API_USERPROFILE);
      setProfiles(profilesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchData();
}, []);
  // useEffect(() => {
  //   fetchProfiles();
  //   // axios.get(API_USER).then(res => setMstUsers(res.data));
  //   axios.get(API_USER)
  // .then(res => {
  //   console.log("Users:", res.data);  // 🔍 check if array is coming
  //   setMstUsers(res.data);
  // });
  //   axios.get(API_AREA).then(res => setAreas(res.data));
    
  // }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(API_USERPROFILE);
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching profiles");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!formData.uid || !formData.address || !formData.areaid) {
      return alert("Please fill all fields");
    }

    const data = new FormData();
    data.append("uid", formData.uid);
    data.append("address", formData.address);
    data.append("areaid", formData.areaid);
    if (formData.picture) data.append("picture", formData.picture);
    data.append("old_picture", formData.old_picture);

    try {
      if (formData.upid === 0) {
        await axios.post(API_USERPROFILE, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User profile added!");
      } else {
        await axios.put(`${API_USERPROFILE}/${formData.upid}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
      alert(err.response?.data?.error || "Error saving profile");
    }
  };

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

  const handleDelete = async (upid) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        await axios.delete(`${API_USERPROFILE}/${upid}`);
        fetchProfiles();
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
        User Profile Management
      </h2>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow">
        <div className="row g-2">
          <div className="col-md-3">
            <select
              className="form-control"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {mstusers.map((u) => (
                <option key={u.uid} value={u.uid}>
                  {u.fname} {u.lname}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              name="areaid"
              value={formData.areaid}
              onChange={handleChange}
              required
            >
              <option value="">Select Area</option>
              {areas.map((a) => (
                <option key={a.areaid} value={a.areaid}>
                  {a.areaname}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="file"
              className="form-control"
              name="picture"
              onChange={handleChange}
            />
            {formData.old_picture && (
              <img
                src={`http://localhost:5000/uploads/${formData.old_picture}`}
                alt="Profile"
                height="50"
                className="mt-1"
                style={{ borderRadius: "6px" }}
              />
            )}
          </div>

          <div className="col-md-2 d-flex gap-1">
            <button
              type="button"
              className="btn w-100"
              style={{ background: "#E91E8C", color: "white" }}
              onClick={handleSubmit}
            >
              {formData.upid === 0 ? "Add" : "Update"}
            </button>
            {formData.upid > 0 && (
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() =>
                  setFormData({
                    upid: 0,
                    uid: "",
                    address: "",
                    areaid: "",
                    picture: null,
                    old_picture: "",
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
              <th>Address</th>
              <th>Area</th>
              <th>Picture</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((p, index) => (
                <tr key={p.upid}>
                  <td>{index + 1}</td>
                  <td>{p.fname} {p.lname}</td>
                  <td>{p.address}</td>
                  <td>{p.areaname}</td>
                  <td>
                    {p.picture ? (
                      <img
                        src={`http://localhost:5000/uploads/${p.picture}`}
                        alt="Profile"
                        height="50"
                        style={{ borderRadius: "6px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.upid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserProfile = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [mstusers, setMstUsers] = useState([]);
//   const [areas, setAreas] = useState([]);

//   const [formData, setFormData] = useState({
//     upid: 0,         // 0 = new record, >0 = edit
//     uid: "",
//     address: "",
//     areaid: "",
//     picture: null,
//     old_picture: "",
//   });

//   // Fetch mstusers and areas on mount
//   useEffect(() => {
//     fetchProfiles();
//     axios.get("http://localhost:5000/api/user").then(res => setMstUsers(res.data));
//     axios.get("http://localhost:5000/api/area").then(res => setAreas(res.data));
//   }, []);

//   const fetchProfiles = () => {
//     axios.get("http://localhost:5000/api/userprofile").then(res => {
//       setProfiles(res.data);
//     });
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "picture") {
//       setFormData({ ...formData, picture: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("uid", formData.uid);
//     data.append("address", formData.address);
//     data.append("areaid", formData.areaid);
//     if (formData.picture) data.append("picture", formData.picture);
//     data.append("old_picture", formData.old_picture);

//     try {
//       if (formData.upid === 0) {
//         await axios.post("http://localhost:5000/api/userprofile", data);
//         alert("User profile added!");
//       } else {
//         await axios.put(`http://localhost:5000/api/userprofile/${formData.upid}`, data);
//         alert("User profile updated!");
//       }
//       setFormData({
//         upid: 0,
//         uid: "",
//         address: "",
//         areaid: "",
//         picture: null,
//         old_picture: "",
//       });
//       fetchProfiles();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving data");
//     }
//   };

//   // Edit record
//   const handleEdit = (profile) => {
//     setFormData({
//       upid: profile.upid,
//       uid: profile.uid,
//       address: profile.address,
//       areaid: profile.areaid,
//       picture: null,
//       old_picture: profile.picture,
//     });
//   };

//   // Delete record (soft delete)
//   const handleDelete = async (upid) => {
//     if (window.confirm("Are you sure?")) {
//       await axios.delete(`http://localhost:5000/api/userprofile/${upid}`);
//       fetchProfiles();
//     }
//   };

//   return (
//     <div>
//       <h2>User Profile Management</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>User:</label>
//         <select name="uid" value={formData.uid} onChange={handleChange} required>
//           <option value="">Select User</option>
//           {mstusers.map(u => (
//             <option key={u.uid} value={u.uid}>
//               {u.fname} {u.lname}
//             </option>
//           ))}
//         </select>

//         <label>Address:</label>
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />

//         <label>Area:</label>
//         <select name="areaid" value={formData.areaid} onChange={handleChange} required>
//           <option value="">Select Area</option>
//           {areas.map(a => (
//             <option key={a.areaid} value={a.areaid}>
//               {a.areaname}
//             </option>
//           ))}
//         </select>

//         <label>Profile Picture:</label>
//         <input type="file" name="picture" onChange={handleChange} />
//         {formData.old_picture && (
//           <div>
//             <img
//               src={`http://localhost:5000/uploads/${formData.old_picture}`}
//               alt="Profile"
//               width="80"
//             />
//           </div>
//         )}

//         <button type="submit">{formData.upid === 0 ? "Add" : "Update"}</button>
//       </form>

//       <h3>Existing Profiles</h3>
//       <table border="1">
//         <thead >
//           <tr>
//             <th>Full Name</th>
//             <th>Address</th>
//             <th>Area</th>
//             <th>Picture</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {profiles.map(p => (
//             <tr key={p.upid}>
//               <td>{p.fname} {p.lname}</td>
//               <td>{p.address}</td>
//               <td>{p.areaname}</td>
//               <td>
//                 <img src={`http://localhost:5000/uploads/${p.picture}`} alt="Profile" width="60" />
//               </td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning"

//                   onClick={() => handleEdit(p)}>Edit</button>
//                 <button
//                   className="btn btn-sm btn-danger"

//                   onClick={() => handleDelete(p.upid)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserProfile;