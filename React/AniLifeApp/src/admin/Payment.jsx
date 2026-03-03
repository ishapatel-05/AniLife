import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/paymentmethod"

export default function PaymentMethod() {
    const [methodname, setMethodname] = useState("")
    const [id, setId] = useState(0)
    const [methods, setMethods] = useState([])

    const getMethods = async () => {
        const res = await axios.get(API)
        setMethods(res.data)
    }

    const saveMethod = async () => {
        if (!methodname) return alert("Enter Payment Method Name")
        if (id > 0) {
            await axios.put(`${API}/${id}`, { paymentmethodname: methodname })
            setId(0)
        } else {
            await axios.post(API, { paymentmethodname: methodname })
        }
        setMethodname("")
        getMethods()
    }

    const editMethod = (m) => {
        setMethodname(m.paymentmethodname)  // ← correct DB field name
        setId(m.pmid)                        // ← correct DB field name
    }

    const deleteMethod = async (pmid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${pmid}`)
            getMethods()
        }
    }

    useEffect(() => { getMethods() }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}> Payment Method Management</h2>
            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control"
                            placeholder="Payment Method Name" value={methodname}
                            onChange={(e) => setMethodname(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveMethod}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>
                    {id > 0 && (
                        <div className="col-md-3">
                            <button className="btn btn-secondary w-100"
                                onClick={() => { setId(0); setMethodname("") }}>
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
                            <th>Payment Method Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {methods.map((m, index) => (
                            <tr key={m.pmid}>
                                <td>{index + 1}</td>
                                <td>{m.paymentmethodname}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editMethod(m)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteMethod(m.pmid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}