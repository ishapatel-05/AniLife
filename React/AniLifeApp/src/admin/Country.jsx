import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/country"

export default function Country() {
    const [cname, setCname] = useState("")
    const [id, setId] = useState(0)
    const [countries, setCountries] = useState([])

    const getCountries = async () => {
        const res = await axios.get(API)
        setCountries(res.data)
    }

    // const saveCountry = async () => {
    //     if (!cname) return alert("Enter Country Name")
    //     if (id > 0) {
    //         await axios.put(`${API}/${id}`, { cname })
    //         setId(0)
    //     } else {
    //         await axios.post(API, { cname })
    //     }
    //     setCname("")
    //     getCountries()
    // }

    const saveCountry = async () => {
        if (!cname) return alert("Enter Country Name")
        if (id > 0) {
            await axios.put(`${API}/${id}`, { countryname: cname })
            setId(0)          // ← MISSING! add this
        } else {
            await axios.post(API, { countryname: cname })
        }
        setCname("")          // ← MISSING! add this
        getCountries()        // ← MISSING! add this
    }
    // CORRECT
    const editCountry = (c) => {
        setCname(c.countryname)  // ← correct field name!
        setId(c.countryid)       // ← correct field name!
    }

    const deleteCountry = async (cid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${cid}`)
            getCountries()
        }
    }

    useEffect(() => { getCountries() }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>🌍 Country Management</h2>
            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control"
                            placeholder="Country Name" value={cname}
                            onChange={(e) => setCname(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveCountry}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>
                    {id > 0 && (
                        <div className="col-md-3">
                            <button className="btn btn-secondary w-100"
                                onClick={() => { setId(0); setCname("") }}>
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

                            {/* <th>ID</th> */}
                            <th>Sr.no</th>
                            <th>Country Name</th>
                            <th>Edit</th>
                            <th>Delete</th></tr>
                    </thead>
                    <tbody>

                        {countries.map((c, index) => (
                            <tr key={c.countryid}>
                                <td>{index + 1}</td>
                                <td>{c.countryname}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => editCountry(c)}
                                    >Edit</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteCountry(c.countryid)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
