import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/state"
const COUNTRY_API = "http://localhost:5000/api/country"

export default function State() {
    const [sname, setSname] = useState("")
    const [countryid, setCountryid] = useState("")
    const [id, setId] = useState(0)
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState([])

    // GET ALL STATES
    const getStates = async () => {
        const res = await axios.get(API)
        setStates(res.data)
    }

    // GET ALL COUNTRIES for dropdown
    const getCountries = async () => {
        const res = await axios.get(COUNTRY_API)
        setCountries(res.data)
    }

    // SAVE or UPDATE
    const saveState = async () => {
        if (!sname || !countryid) return alert("Fill all fields!")
        if (id > 0) {
            await axios.put(`${API}/${id}`, { statename: sname, countryid })
            setId(0)
        } else {
            await axios.post(API, { statename: sname, countryid })
        }
        setSname("")
        setCountryid("")
        getStates()
    }

    // EDIT - fill inputs

    const editState = (s) => {
        setSname(s.statename)
        setCountryid(Number(s.countryid))
        setId(s.stateid)
    }
    // DELETE
    const deleteState = async (stateid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${stateid}`)
            getStates()
        }
    }

    // CANCEL
    const cancelEdit = () => {
        setId(0)
        setSname("")
        setCountryid("")
    }

    useEffect(() => {
        getStates()
        getCountries()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
                State Management
            </h2>

            {/* Form */}
            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="State Name"
                            value={sname}

                            onChange={(e) => setSname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={countryid}
                            // onChange={(e) => setCountryid(e.target.value)}
                            onChange={(e) => setCountryid(Number(e.target.value))}
                        >
                            <option value="">-- Select Country --</option>
                            {countries.map((c) => (
                                <option key={c.countryid} value={c.countryid}>
                                    {c.countryname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveState}
                        >
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>
                    {id > 0 && (
                        <div className="col-md-2">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            <th>Sr.No</th>
                            <th>State Name</th>
                            <th>Country</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {states.length > 0 ? states.map((s, index) => (
                            <tr key={s.stateid}>
                                <td>{index + 1}</td>
                                <td>{s.statename}</td>
                                <td>{s.countryname}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => editState(s)}
                                    >Edit</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteState(s.stateid)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center">No Record Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}