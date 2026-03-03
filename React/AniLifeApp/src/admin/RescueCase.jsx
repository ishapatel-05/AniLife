import React, { useState, useEffect } from "react";
import axios from "axios";

const API_RESCUE = "http://localhost:5000/api/rescuecase";
const API_USER = "http://localhost:5000/api/user";
const API_AREA = "http://localhost:5000/api/area";

export default function RescueCase() {
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState([]);

  // Fetch all data
  useEffect(() => {
    fetchCases();
    axios.get(API_USER).then(res => setUsers(res.data));
    axios.get(API_AREA).then(res => setAreas(res.data));
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get(API_RESCUE);
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching rescue cases:", err);
      alert("Failed to fetch rescue cases");
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_RESCUE}/${id}`, {
        status: newStatus,
        updatedBy: 1, // you can put admin ID here
      });
      fetchCases(); // refresh table
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
        Rescue Cases
      </h2>

      <div className="card shadow">
        <table className="table table-hover mb-0">
          <thead style={{ background: "#E91E8C", color: "white" }}>
            <tr>
              <th>Sr.No</th>
              <th>User</th>
              <th>Animal</th>
              <th>Description</th>
              <th>Area</th>
              <th>Location</th>
              <th>Status</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {cases.length > 0 ? (
              cases.map((c, index) => {
                const user = users.find(u => u.uid === c.uid);
                const area = areas.find(a => a.areaid === c.areaid);
                return (
                  <tr key={c.rescueId}>
                    <td>{index + 1}</td>
                    <td>{user ? `${user.fname} ${user.lname}` : "Unknown"}</td>
                    <td>{c.animalType}</td>
                    <td>{c.description}</td>
                    <td>{area ? area.areaname : "Unknown"}</td>
                    <td>{c.locationDetails}</td>
                    <td>
                      <select
                        className="form-control"
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.rescueId, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Rescued">Rescued</option>
                      </select>
                    </td>
                    <td>
                      {c.rescuePic && (
                        <img
                          src={`http://localhost:5000/uploads/${c.rescuePic}`}
                          width="50"
                          alt="rescue"
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Rescue Cases Found
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

// const API_RESCUE = "http://localhost:5000/api/rescuecase";
// const API_USER = "http://localhost:5000/api/user";
// const API_AREA = "http://localhost:5000/api/area";

// export default function RescueCase() {
//   const [cases, setCases] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [areas, setAreas] = useState([]);

//   // Fetch all data
//   useEffect(() => {
//     fetchCases();
//     axios.get(API_USER).then(res => setUsers(res.data));
//     axios.get(API_AREA).then(res => setAreas(res.data));
//   }, []);

//   const fetchCases = async () => {
//     try {
//       const res = await axios.get(API_RESCUE);
//       setCases(res.data);
//     } catch (err) {
//       console.error("Error fetching rescue cases:", err);
//       alert("Failed to fetch rescue cases");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
//         Rescue Cases
//       </h2>

//       <div className="card shadow">
//         <table className="table table-hover mb-0">
//           <thead style={{ background: "#E91E8C", color: "white" }}>
//             <tr>
//               <th>Sr.No</th>
//               <th>User</th>
//               <th>Animal</th>
//               <th>Description</th>
//               <th>Area</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Picture</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cases.length > 0 ? (
//               cases.map((c, index) => {
//                 const user = users.find(u => u.uid === c.uid);
//                 const area = areas.find(a => a.areaid === c.areaid);
//                 return (
//                   <tr key={c.rescueId}>
//                     <td>{index + 1}</td>
//                     <td>{user ? `${user.fname} ${user.lname}` : "Unknown"}</td>
//                     <td>{c.animalType}</td>
//                     <td>{c.description}</td>
//                     <td>{area ? area.areaname : "Unknown"}</td>
//                     <td>{c.locationDetails}</td>
//                     <td>{c.status}</td>
//                     <td>
//                       {c.rescuePic && (
//                         <img
//                           src={`http://localhost:5000/uploads/${c.rescuePic}`}
//                           width="50"
//                           alt="rescue"
//                         />
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center">
//                   No Rescue Cases Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_RESCUE = "http://localhost:5000/api/rescuecase";
// const API_USER = "http://localhost:5000/api/user";
// const API_AREA = "http://localhost:5000/api/area";

// export default function RescueCase() {
    
//   const [cases, setCases] = useState([]);
//   const [mstusers, setMstUsers] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [formData, setFormData] = useState({
//     rescueId: 0,
//     uid: "",
//     animalType: "",
//     description: "",
//     areaid: "",
//     locationDetails: "",
//     rescuePic: null,
//     status: "Pending",
//     assignedToType: "",
//     assignedToId: "",
//     rescuedOn: "",
//   });

//   useEffect(() => {
//     fetchCases();
//     axios.get(API_USER).then(res => setMstUsers(res.data));
//     axios.get(API_AREA).then(res => setAreas(res.data));
//   }, []);

//   const fetchCases = async () => {
//     try {
//       const res = await axios.get(API_RESCUE);
//       setCases(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching rescue cases");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "rescuePic") {
//       setFormData({ ...formData, rescuePic: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.uid || !formData.animalType || !formData.description || !formData.areaid) {
//       return alert("Please fill all required fields");
//     }
//     const data = new FormData();
//     Object.keys(formData).forEach(key => {
//       if(formData[key]) data.append(key, formData[key]);
//     });

//     try {
//       if (formData.rescueId === 0) {
//         await axios.post(API_RESCUE, data, { headers: { "Content-Type": "multipart/form-data" } });
//         alert("Rescue case added successfully!");
//       } else {
//         await axios.put(`${API_RESCUE}/${formData.rescueId}`, data);
//         alert("Rescue case updated successfully!");
//       }
//       setFormData({
//         rescueId: 0,
//         uid: "",
//         animalType: "",
//         description: "",
//         areaid: "",
//         locationDetails: "",
//         rescuePic: null,
//         status: "Pending",
//         assignedToType: "",
//         assignedToId: "",
//         rescuedOn: "",
//       });
//       fetchCases();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Error saving rescue case");
//     }
//   };

//   const handleEdit = (rescue) => {
//     setFormData({
//       rescueId: rescue.rescueId,
//       uid: rescue.uid,
//       animalType: rescue.animalType,
//       description: rescue.description,
//       areaid: rescue.areaid,
//       locationDetails: rescue.locationDetails,
//       rescuePic: null,
//       status: rescue.status,
//       assignedToType: rescue.assignedToType,
//       assignedToId: rescue.assignedToId,
//       rescuedOn: rescue.rescuedOn ? rescue.rescuedOn.split("T")[0] : "",
//     });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this rescue case?")) {
//       try {
//         await axios.delete(`${API_RESCUE}/${id}`);
//         fetchCases();
//       } catch (err) {
//         console.error(err);
//         alert("Delete failed");
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>Rescue Case Management</h2>
//       {/* Form + Table like Volunteer.jsx */}
//     </div>
//   );
// }