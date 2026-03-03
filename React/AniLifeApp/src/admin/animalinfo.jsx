import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/animalinfo"
const BREED_API = "http://localhost:5000/api/breed"

export default function AnimalInfo() {
    const [breedid, setBreedid] = useState("")
    const [title, setTitle] = useState("")
    const [nutrition, setNutrition] = useState("")
    const [diseases, setDiseases] = useState("")
    const [vaccines, setVaccines] = useState("")
    const [firstaid, setFirstaid] = useState("")
    const [id, setId] = useState(0)

    const [infoList, setInfoList] = useState([])
    const [breeds, setBreeds] = useState([])

    const getInfo = async () => {
        const res = await axios.get(API)
        setInfoList(res.data)
    }

    const getBreeds = async () => {
        const res = await axios.get(BREED_API)
        setBreeds(res.data)
    }

    const resetForm = () => {
        setBreedid(""); setTitle(""); setNutrition("")
        setDiseases(""); setVaccines(""); setFirstaid("")
        setId(0)
    }

    const saveInfo = async () => {
        if (!breedid || !title || !nutrition || !diseases || !vaccines || !firstaid)
            return alert("Please fill all fields")

        const payload = {
            breedid, title, nutrition, diseases, vaccines, firstaid,
            createdby: 1
        }
        if (id > 0) {
            await axios.put(`${API}/${id}`, {
                ...payload,
                updatedby: 1
            })
        } else {
            await axios.post(API, payload)
        }
        resetForm()
        getInfo()
    }

    const editInfo = (item) => {
        setBreedid(item.breedid)
        // setBreedid(item.breedid)
        setTitle(item.title)
        setNutrition(item.nutrition)
        setDiseases(item.diseases)
        setVaccines(item.vaccines)
        setFirstaid(item.firstaid)
        setId(item.infoid)
    }

    const deleteInfo = async (infoid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${infoid}`)
            getInfo()
        }
    }

    useEffect(() => {
        getInfo()
        getBreeds()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>🐾 Animal Info Management</h2>

            <div className="card p-3 mb-4 shadow">
                <div className="row g-2">

                    <div className="col-md-6">
                        <select className="form-control" value={breedid}
                            onChange={(e) => setBreedid(e.target.value)}>
                            <option value="">-- Select Breed --</option>
                            {breeds.map((b) => (
                                <option key={b.breedid} value={b.breedid}>{b.breedname}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control"
                            placeholder="Title" value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <textarea className="form-control" rows={2}
                            placeholder="Nutrition" value={nutrition}
                            onChange={(e) => setNutrition(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <textarea className="form-control" rows={2}
                            placeholder="Diseases" value={diseases}
                            onChange={(e) => setDiseases(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <textarea className="form-control" rows={2}
                            placeholder="Vaccines" value={vaccines}
                            onChange={(e) => setVaccines(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <textarea className="form-control" rows={2}
                            placeholder="First Aid" value={firstaid}
                            onChange={(e) => setFirstaid(e.target.value)} />
                    </div>

                    <div className="col-md-10">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveInfo}>
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
                            <th>Breed</th>
                            <th>Title</th>
                            <th>Nutrition</th>
                            <th>Diseases</th>
                            <th>Vaccines</th>
                            <th>First Aid</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoList.map((item, index) => (
                            <tr key={item.infoid}>
                                <td>{index + 1}</td>
                                <td>{item.breedname}</td>
                                <td>{item.title}</td>
                                <td>{item.nutrition?.substring(0, 40)}...</td>
                                <td>{item.diseases?.substring(0, 40)}...</td>
                                <td>{item.vaccines?.substring(0, 40)}...</td>
                                <td>{item.firstaid?.substring(0, 40)}...</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editInfo(item)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteInfo(item.infoid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {infoList.length === 0 && (
                            <tr><td colSpan="9" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}