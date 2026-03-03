import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/vet"
const AREA_API = "http://localhost:5000/api/area"

export default function Vet() {

    const [vetname, setVetname] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [areaid, setAreaid] = useState(0)
    const [specialization, setSpecialization] = useState("")
    const [yearsofexperience, setYearsofexperience] = useState("")
    const [availability, setAvailability] = useState("")
    const [id, setId] = useState(0)

    const [vets, setVets] = useState([])
    const [areas, setAreas] = useState([])

    // GET VETS
    const getVets = async () => {
        const res = await axios.get(API)
        setVets(res.data)
    }

    // GET AREAS
    const getAreas = async () => {
        const res = await axios.get(AREA_API)
        setAreas(res.data)
    }

    // SAVE OR UPDATE
    const saveVet = async () => {

        if (!vetname || !contact || !email || !areaid)
            return alert("Fill required fields!")

        const data = {
            vetname,
            contact,
            email,
            address,
            areaid,
            specialization,
            yearsofexperience,
            availability,
            createdby: 1,
            updatedby: 1
        }

        if (id > 0) {
            await axios.put(`${API}/${id}`, data)
            setId(0)
        } else {
            await axios.post(API, data)
        }

        resetForm()
        getVets()
    }

    const editVet = (v) => {
        setVetname(v.vetname)
        setContact(v.contact)
        setEmail(v.email)
        setAddress(v.address)
        setAreaid(Number(v.areaid))
        setSpecialization(v.specialization)
        setYearsofexperience(v.yearsofexperience)
        setAvailability(v.availability)
        setId(v.vetid)
    }

    const deleteVet = async (vetid) => {
        if (window.confirm("Are you sure?")) {
            await axios.delete(`${API}/${vetid}`)
            getVets()
        }
    }

    const resetForm = () => {
        setVetname("")
        setContact("")
        setEmail("")
        setAddress("")
        setAreaid(0)
        setSpecialization("")
        setYearsofexperience("")
        setAvailability("")
    }

    useEffect(() => {
        getVets()
        getAreas()
    }, [])

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
                🐶 Vet Management
            </h2>

            {/* FORM */}
            <div className="card p-3 mb-4 shadow">
                <div className="row g-2">

                    <div className="col-md-3">
                        <input className="form-control"
                            placeholder="Vet Name"
                            value={vetname}
                            onChange={e => setVetname(e.target.value)} />
                    </div>

                    <div className="col-md-2">
                        <input className="form-control"
                            placeholder="Contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)} />
                    </div>

                    <div className="col-md-3">
                        <input className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="col-md-4 mt-2">
                        <input className="form-control"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                    </div>

                    <div className="col-md-3 mt-2">
                        <select className="form-control"
                            value={areaid}
                            onChange={e => setAreaid(Number(e.target.value))}>
                            <option value={0}>-- Select Area --</option>
                            {areas.map(a => (
                                <option key={a.areaid} value={a.areaid}>
                                    {a.areaname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3 mt-2">
                        <input className="form-control"
                            placeholder="Specialization"
                            value={specialization}
                            onChange={e => setSpecialization(e.target.value)} />
                    </div>

                    <div className="col-md-2 mt-2">
                        <input className="form-control"
                            placeholder="Experience (Years)"
                            value={yearsofexperience}
                            onChange={e => setYearsofexperience(e.target.value)} />
                    </div>

                    <div className="col-md-2 mt-2">
                        <input className="form-control"
                            placeholder="Availability"
                            value={availability}
                            onChange={e => setAvailability(e.target.value)} />
                    </div>

                    <div className="col-md-2 mt-2">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveVet}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            <th>Sr</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Area</th>
                            <th>Specialization</th>
                            <th>Exp</th>
                            <th>Availability</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vets.length > 0 ? vets.map((v, i) => (
                            <tr key={v.vetid}>
                                <td>{i + 1}</td>
                                <td>{v.vetname}</td>
                                <td>{v.contact}</td>
                                <td>{v.email}</td>
                                <td>{v.areaid}</td>
                                <td>{v.specialization}</td>
                                <td>{v.yearsofexperience}</td>
                                <td>{v.availability}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editVet(v)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteVet(v.vetid)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
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
    )
}