import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/ngosinfo"
const AREA_API = "http://localhost:5000/api/area"

export default function NgosInfo() {
    const [ngoname, setNgoname] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [areaid, setAreaid] = useState("")
    const [services, setServices] = useState("")
    const [id, setId] = useState(0)

    const [ngos, setNgos] = useState([])
    const [areas, setAreas] = useState([])

    const getNgos = async () => {
        const res = await axios.get(API)
        setNgos(res.data)
    }

    const getAreas = async () => {
        const res = await axios.get(AREA_API)
        setAreas(res.data)
    }

    const resetForm = () => {
        setNgoname(""); setContact(""); setEmail("")
        setAddress(""); setAreaid(""); setServices("")
        setId(0)
    }

    const saveNgo = async () => {
        if (!ngoname || !contact || !email || !address || !areaid || !services)
            return alert("Please fill all fields")

        const payload = { ngoname, contact, email, address, areaid, services }

        if (id > 0) {
            await axios.put(`${API}/${id}`, payload)
            setId(0)
        } else {
            await axios.post(API, payload)
        }
        resetForm()
        getNgos()
    }

    const editNgo = (n) => {
        setNgoname(n.ngoname)
        setContact(n.contact)
        setEmail(n.email)
        setAddress(n.address)
        setAreaid(n.areaid)
        setServices(n.services)
        setId(n.ngoid)
    }

    const deleteNgo = async (ngoid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${ngoid}`)
            getNgos()
        }
    }

    useEffect(() => {
        getNgos()
        getAreas()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>🏢 NGO Management</h2>

            <div className="card p-3 mb-4 shadow">
                <div className="row g-2">

                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="NGO Name" value={ngoname}
                            onChange={(e) => setNgoname(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="Contact Number" value={contact}
                            onChange={(e) => setContact(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <input type="email" className="form-control"
                            placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="Address" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                        <select className="form-control" value={areaid}
                            onChange={(e) => setAreaid(e.target.value)}>
                            <option value="">-- Select Area --</option>
                            {areas.map((a) => (
                                <option key={a.areaid} value={a.areaid}>{a.areaname}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="Services (e.g. Rescue, Adoption)" value={services}
                            onChange={(e) => setServices(e.target.value)} />
                    </div>

                    <div className="col-md-10">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveNgo}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>

                    {id > 0 && (
                        <div className="col-md-2">
                            <button className="btn btn-secondary w-100"
                                onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            <th>Sr.No</th>
                            <th>NGO Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Area</th>
                            <th>Services</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ngos.map((n, index) => (
                            <tr key={n.ngoid}>
                                <td>{index + 1}</td>
                                <td>{n.ngoname}</td>
                                <td>{n.contact}</td>
                                <td>{n.email}</td>
                                <td>{n.address}</td>
                                <td>{n.areaname}</td>
                                <td>{n.services}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editNgo(n)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteNgo(n.ngoid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {ngos.length === 0 && (
                            <tr><td colSpan="9" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}