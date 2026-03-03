import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/adoption"

export default function Adoption() {
    const [requests, setRequests] = useState([])
    const [filter, setFilter] = useState("")

    const getRequests = async () => {
        const res = await axios.get(API)
        setRequests(res.data)
    }

    const handleStatusChange = async (id, status, rejectionReason = "") => {
        await axios.put(`${API}/${id}`, {
            status,
            rejectionReason,
            approvedBy: 1
        })
        getRequests()
    }

    const handleReject = async (id) => {
        const reason = prompt("Enter rejection reason:")
        if (!reason) return
        await handleStatusChange(id, "Rejected", reason)
    }

    useEffect(() => {
        getRequests()
    }, [])

    const filtered = filter ? requests.filter(r => r.status === filter) : requests

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>🏡 Adoption Requests</h2>

            {/* Filter Buttons */}
            <div className="mb-3 d-flex gap-2">
                <button className="btn btn-sm"
                    style={{ background: filter === "" ? '#E91E8C' : '#f0f0f0', color: filter === "" ? 'white' : 'black' }}
                    onClick={() => setFilter("")}>All</button>
                <button className="btn btn-sm"
                    style={{ background: filter === "Pending" ? '#E91E8C' : '#f0f0f0', color: filter === "Pending" ? 'white' : 'black' }}
                    onClick={() => setFilter("Pending")}>Pending</button>
                <button className="btn btn-sm"
                    style={{ background: filter === "Approved" ? '#E91E8C' : '#f0f0f0', color: filter === "Approved" ? 'white' : 'black' }}
                    onClick={() => setFilter("Approved")}>Approved</button>
                <button className="btn btn-sm"
                    style={{ background: filter === "Rejected" ? '#E91E8C' : '#f0f0f0', color: filter === "Rejected" ? 'white' : 'black' }}
                    onClick={() => setFilter("Rejected")}>Rejected</button>
            </div>

            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            <th>Sr.No</th>
                            <th>Pet</th>
                            <th>Pet Pic</th>
                            <th>Adopter</th>
                            <th>Owner Type</th>
                            <th>Request Date</th>
                            <th>User Notes</th>
                            <th>Rejection Reason</th>
                            {/* <th>Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, index) => (
                            <tr key={r.adoptionId}>
                                <td>{index + 1}</td>
                                <td>{r.petname}</td>
                                <td>
                                    {r.petPic ?
                                        <img src={`http://localhost:5000/uploads/${r.petPic}`}
                                            height="45" style={{ borderRadius: '6px' }} />
                                        : "No Pic"}
                                </td>
                                <td>{r.adoptername}</td>
                                <td>{r.ownerType}</td>
                                <td>{r.requestDate?.split("T")[0] ?? r.requestDate}</td>
                                <td>{r.userNotes}</td>
                                <td>{r.rejectionReason || "-"}</td>
                                {/* <td>
                                    <span className={`badge ${r.status === "Approved" ? "bg-success" :
                                            r.status === "Rejected" ? "bg-danger" : "bg-warning"
                                        }`}>
                                        {r.status}
                                    </span>
                                </td> */}
                                <td>
                                    <select className="form-control form-control-sm"
                                        value={r.status}
                                        onChange={(e) => {
                                            if (e.target.value === "Rejected") {
                                                handleReject(r.adoptionId)
                                            } else {
                                                handleStatusChange(r.adoptionId, e.target.value)
                                            }
                                        }}
                                        style={{
                                            color: r.status === "Approved" ? "green" :
                                                r.status === "Rejected" ? "red" : "orange",
                                            fontWeight: "bold"
                                        }}>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan="10" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}