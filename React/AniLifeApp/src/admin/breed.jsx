import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/breed"
const CAT_API = "http://localhost:5000/api/category"

export default function Breed() {
    const [breedname, setBreedname] = useState("")
    const [catid, setCatid] = useState("")
    const [id, setId] = useState(0)
    const [breeds, setBreeds] = useState([])
    const [categories, setCategories] = useState([])

    const getBreeds = async () => {
        const res = await axios.get(API)
        setBreeds(res.data)
    }

    const getCategories = async () => {
        const res = await axios.get(CAT_API)
        setCategories(res.data)
    }

    const saveBreed = async () => {
        if (!breedname) return alert("Enter Breed Name")
        if (!catid) return alert("Select Category")
        if (id > 0) {
            // await axios.put(`${API}/${id}`, { breedname })
            await axios.put(`${API}/${id}`, { breedname, catid })
            setId(0)
        } else {
            await axios.post(API, { breedname, catid })
        }
        setBreedname("")
        setCatid("")
        getBreeds()
    }

    // const editBreed = (b) => {
    //     setBreedname(b.breedname)
    //     setCatid("")        // catid not returned in GET, only catname
    //     setId(b.breedid)
    // }

    const editBreed = (b) => {
    setBreedname(b.breedname)
    setCatid(b.catid)     // ✅ set actual category id
    setId(b.breedid)
}

    const deleteBreed = async (breedid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${breedid}`)
            getBreeds()
        }
    }

    useEffect(() => {
        getBreeds()
        getCategories()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}> Breed Management</h2>

            <div className="card p-3 mb-4 shadow">
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-control" value={catid}
                            onChange={(e) => setCatid(e.target.value)}>
                            <option value="">-- Select Category --</option>
                            {categories.map((c) => (
                                <option key={c.catid} value={c.catid}>{c.catname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="Breed Name" value={breedname}
                            onChange={(e) => setBreedname(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveBreed}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>
                    {id > 0 && (
                        <div className="col-md-2">
                            <button className="btn btn-secondary w-100"
                                onClick={() => { setId(0); setBreedname(""); setCatid("") }}>
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
                            <th>Category</th>
                            <th>Breed Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breeds.map((b, index) => (
                            <tr key={b.breedid}>
                                <td>{index + 1}</td>
                                <td>{b.catname}</td>
                                <td>{b.breedname}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editBreed(b)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteBreed(b.breedid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {breeds.length === 0 && (
                            <tr><td colSpan="5" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
