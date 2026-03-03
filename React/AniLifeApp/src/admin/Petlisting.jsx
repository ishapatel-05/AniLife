import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/petlisting"
const CAT_API = "http://localhost:5000/api/category"
const BREED_API = "http://localhost:5000/api/breed"
const AREA_API = "http://localhost:5000/api/area"

export default function Petlisting() {
    const [listedByType, setListedByType] = useState("NGO")
    const [listedById, setListedById] = useState("")
    const [catId, setCatId] = useState("")
    const [breedId, setBreedId] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [healthDetails, setHealthDetails] = useState("")
    const [vaccinated, setVaccinated] = useState("yes")
    const [areaid, setAreaid] = useState("")
    const [petPic, setPetPic] = useState(null)
    const [oldpic, setOldpic] = useState("")
    const [adoptionFee, setAdoptionFee] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [id, setId] = useState(0)

    const [pets, setPets] = useState([])
    const [categories, setCategories] = useState([])
    const [breeds, setBreeds] = useState([])
    const [filteredBreeds, setFilteredBreeds] = useState([])
    const [areas, setAreas] = useState([])

    const getPets = async () => {
        const res = await axios.get(API)
        setPets(res.data)
    }

    const getDropdowns = async () => {
        const [cRes, bRes, aRes] = await Promise.all([
            axios.get(CAT_API),
            axios.get(BREED_API),
            axios.get(AREA_API)
        ])
        setCategories(cRes.data)
        setBreeds(bRes.data)
        setAreas(aRes.data)
    }

    // Filter breeds when category changes
    useEffect(() => {
        if (catId) {
            setFilteredBreeds(breeds.filter(b => b.catid == catId))
            setBreedId("")
        } else {
            setFilteredBreeds(breeds)
        }
    }, [catId, breeds])

    const resetForm = () => {
        setListedByType("NGO"); setListedById(""); setCatId("")
        setBreedId(""); setName(""); setAge(""); setGender("")
        setHealthDetails(""); setVaccinated("yes"); setAreaid("")
        setPetPic(null); setOldpic(""); setAdoptionFee("")
        setContactNumber(""); setId(0)
    }

    const savePet = async () => {
        if (!name || !catId || !breedId || !areaid || !gender || !contactNumber)
            return alert("Please fill all required fields")

        const formData = new FormData()
        formData.append("listedByType", listedByType)
        formData.append("listedById", listedById)
        formData.append("catId", catId)
        formData.append("breedId", breedId)
        formData.append("name", name)
        formData.append("age", age)
        formData.append("gender", gender)
        formData.append("healthDetails", healthDetails)
        formData.append("vaccinated", vaccinated)
        formData.append("areaid", areaid)
        formData.append("adoptionFee", adoptionFee)
        formData.append("contactNumber", contactNumber)
        formData.append("approvedBy", 1)

        if (id > 0) {
            if (petPic) {
                formData.append("petPic", petPic)
            } else {
                formData.append("old_picture", oldpic)
            }
            await axios.put(`${API}/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setId(0)
        } else {
            if (!petPic) return alert("Please select a pet image")
            formData.append("petPic", petPic)
            await axios.post(API, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }

        resetForm()
        getPets()
    }

    const editPet = (p) => {
        setListedByType(p.listedByType)
        setListedById(p.listedById)
        setCatId(p.catId)
        setBreedId(p.breedId)
        setName(p.name)
        setAge(p.age)
        setGender(p.gender)
        setHealthDetails(p.healthDetails)
        setVaccinated(p.vaccinated)
        setAreaid(p.areaid)
        setOldpic(p.petPic)
        setAdoptionFee(p.adoptionFee)
        setContactNumber(p.contactNumber)
        setId(p.petId)
    }

    const deletePet = async (petId) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${petId}`)
            getPets()
        }
    }

    useEffect(() => {
        getPets()
        getDropdowns()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>🐾 Pet Listing Management</h2>

            <div className="card p-3 mb-4 shadow">
                <div className="row g-2">

                    {/* Listed By Type */}
                    <div className="col-md-3">
                        <select className="form-control" value={listedByType}
                            onChange={(e) => setListedByType(e.target.value)}>
                            <option value="NGO">NGO</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    {/* Listed By ID */}
                    <div className="col-md-3">
                        <input type="number" className="form-control"
                            placeholder="Listed By ID" value={listedById}
                            onChange={(e) => setListedById(e.target.value)} />
                    </div>

                    {/* Category */}
                    <div className="col-md-3">
                        <select className="form-control" value={catId}
                            onChange={(e) => setCatId(e.target.value)}>
                            <option value="">-- Select Category --</option>
                            {categories.map((c) => (
                                <option key={c.catid} value={c.catid}>{c.catname}</option>
                            ))}
                        </select>
                    </div>

                    {/* Breed - filtered by category */}
                    <div className="col-md-3">
                        <select className="form-control" value={breedId}
                            onChange={(e) => setBreedId(e.target.value)}>
                            <option value="">-- Select Breed --</option>
                            {filteredBreeds.map((b) => (
                                <option key={b.breedid} value={b.breedid}>{b.breedname}</option>
                            ))}
                        </select>
                    </div>

                    {/* Pet Name */}
                    <div className="col-md-3">
                        <input type="text" className="form-control"
                            placeholder="Pet Name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Age */}
                    <div className="col-md-2">
                        <input type="number" className="form-control"
                            placeholder="Age" value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </div>

                    {/* Gender */}
                    <div className="col-md-2">
                        <select className="form-control" value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            <option value="">-- Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Vaccinated */}
                    <div className="col-md-2">
                        <select className="form-control" value={vaccinated}
                            onChange={(e) => setVaccinated(e.target.value)}>
                            <option value="yes">Vaccinated: Yes</option>
                            <option value="No">Vaccinated: No</option>
                        </select>
                    </div>

                    {/* Area */}
                    <div className="col-md-3">
                        <select className="form-control" value={areaid}
                            onChange={(e) => setAreaid(e.target.value)}>
                            <option value="">-- Select Area --</option>
                            {areas.map((a) => (
                                <option key={a.areaid} value={a.areaid}>{a.areaname}</option>
                            ))}
                        </select>
                    </div>

                    {/* Health Details */}
                    <div className="col-md-6">
                        <textarea className="form-control" rows={2}
                            placeholder="Health Details" value={healthDetails}
                            onChange={(e) => setHealthDetails(e.target.value)} />
                    </div>

                    {/* Adoption Fee */}
                    <div className="col-md-3">
                        <input type="number" className="form-control"
                            placeholder="Adoption Fee" value={adoptionFee}
                            onChange={(e) => setAdoptionFee(e.target.value)} />
                    </div>

                    {/* Contact Number */}
                    <div className="col-md-3">
                        <input type="text" className="form-control"
                            placeholder="Contact Number" value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)} />
                    </div>

                    {/* Pet Picture */}
                    <div className="col-md-4">
                        <input type="file" className="form-control"
                            onChange={(e) => setPetPic(e.target.files[0])} />
                    </div>

                    {/* Show old image when editing */}
                    {id > 0 && oldpic && (
                        <div className="col-md-2">
                            <img src={`http://localhost:5000/uploads/${oldpic}`}
                                height="50" style={{ borderRadius: '8px' }} alt="current" />
                        </div>
                    )}

                    {/* Save/Update Button */}
                    <div className="col-md-3">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={savePet}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>

                    {id > 0 && (
                        <div className="col-md-2">
                            <button className="btn btn-secondary w-100"
                                onClick={resetForm}>Cancel</button>
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
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Vaccinated</th>
                            <th>Area</th>
                            <th>Fee</th>
                            <th>Contact</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((p, index) => (
                            <tr key={p.petId}>
                                <td>{index + 1}</td>
                                <td>
                                    {p.petPic ?
                                        <img src={`http://localhost:5000/uploads/${p.petPic}`}
                                            height="45" style={{ borderRadius: '6px' }} />
                                        : "No Pic"}
                                </td>
                                <td>{p.name}</td>
                                <td>{p.listedByType}</td>
                                <td>{p.catname}</td>
                                <td>{p.breedname}</td>
                                <td>{p.age}</td>
                                <td>{p.gender}</td>
                                <td>{p.vaccinated}</td>
                                <td>{p.areaname}</td>
                                <td>₹{p.adoptionFee}</td>
                                <td>{p.contactNumber}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editPet(p)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deletePet(p.petId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {pets.length === 0 && (
                            <tr><td colSpan="14" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}