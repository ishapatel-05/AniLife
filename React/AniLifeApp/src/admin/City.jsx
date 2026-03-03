import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/city"
const STATE_API = "http://localhost:5000/api/state"

export default function City() {
    const [cityname, setCityname] = useState("")
    // const [stateid, setStateid] = useState("")
    const [stateid, setStateid] = useState(0)
    const [id, setId] = useState(0)
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    // GET ALL CITIES
    const getCities = async () => {
        const res = await axios.get(API)
        setCities(res.data)
    }

    // GET ALL STATES for dropdown
    const getStates = async () => {
        const res = await axios.get(STATE_API)
        setStates(res.data)
    }

    // SAVE or UPDATE
    const saveCity = async () => {
        if (!cityname || !stateid) return alert("Fill all fields!")
        if (id > 0) {
            await axios.put(`${API}/${id}`, { cityname,stateid })
            setId(0)
        } else {
            await axios.post(API, { cityname, stateid })
        }
        setCityname("")
        // setStateid("")
        setStateid(0)
        getCities()
    }
  

    // EDIT
    const editCity = (c) => {
        setCityname(c.cityname)
        setStateid(c.stateid)
        setId(c.cityid)
    }

    // DELETE
    const deleteCity = async (cityid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${cityid}`)
            getCities()
        }
    }

    // CANCEL
    const cancelEdit = () => {
        setId(0)
        setCityname("")
        setStateid("")
    }

    useEffect(() => {
        getCities()
        getStates()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
                 City Management
            </h2>

            {/* Form */}
            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="City Name"
                            value={cityname}
                            onChange={(e) => setCityname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={stateid}
                            onChange={(e) => setStateid(Number(e.target.value))}
                            // onChange={(e) => setStateid(e.target.value)}
                        >
                            <option value="">-- Select State --</option>
                            {states.map((s) => (
                                <option key={s.stateid} value={s.stateid}>
                                    {s.statename}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveCity}
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
                            <th>City Name</th>
                            <th>State</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.length > 0 ? cities.map((c, index) => (
                            <tr key={c.cityid}>
                                <td>{index + 1}</td>
                                <td>{c.cityname}</td>
                                <td>{c.statename}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => editCity(c)}
                                    >Edit</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteCity(c.cityid)}
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