import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/area"
const CITY_API = "http://localhost:5000/api/city"

export default function Area() {
    const [areaname, setAreaname] = useState("")
    const [pincode, setPincode] = useState("")
    const [cityid, setCityid] = useState(0)
    const [id, setId] = useState(0)
    const [areas, setAreas] = useState([])
    const [cities, setCities] = useState([])

    const getAreas = async () => {
        const res = await axios.get(API)
        setAreas(res.data)
    }

    const getCities = async () => {
        const res = await axios.get(CITY_API)
        setCities(res.data)
    }

    const saveArea = async () => {
        if (!areaname || !cityid || !pincode) return alert("Fill all fields!")
        if (id > 0) {
            await axios.put(`${API}/${id}`, { areaname, pincode,cityid })
            setId(0)
        } else {
            await axios.post(API, { areaname, cityid, pincode })
        }
        setAreaname("")
        setPincode("")
        setCityid(0)
        getAreas()
    }

    const editArea = (a) => {
        setAreaname(a.areaname)
        setPincode(a.pincode)
        setCityid(a.cityid)
        setId(a.areaid)
    }

    const deleteArea = async (areaid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${areaid}`)
            getAreas()
        }
    }

    const cancelEdit = () => {
        setId(0)
        setAreaname("")
        setPincode("")
        setCityid(0)
    }

    useEffect(() => {
        getAreas()
        getCities()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
                📍 Area Management
            </h2>

            {/* Form */}
            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Area Name"
                            value={areaname}
                            onChange={(e) => setAreaname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-control"
                            value={cityid}
                            onChange={(e) => setCityid(Number(e.target.value))}
                            // onChange={(e) => setCityid(e.target.value)}
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((c) => (
                                <option key={c.cityid} value={c.cityid}>
                                    {c.cityname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveArea}
                        >
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>
                    {id > 0 && (
                        <div className="col-md-1">
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
                            <th>Area Name</th>
                            <th>Pincode</th>
                            <th>City</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.length > 0 ? areas.map((a, index) => (
                            <tr key={a.areaid}>
                                <td>{index + 1}</td>
                                <td>{a.areaname}</td>
                                <td>{a.pincode}</td>
                                <td>{a.cityname}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => editArea(a)}
                                    >Edit</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteArea(a.areaid)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Record Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}