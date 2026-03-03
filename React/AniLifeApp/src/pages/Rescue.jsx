import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const RESCUE_API = "http://localhost:5000/api/rescuecase"
const AREA_API = "http://localhost:5000/api/area"

export default function Rescue() {
    const [cases, setCases] = useState([])
    const [areas, setAreas] = useState([])
    const [showForm, setShowForm] = useState(false)

    // Form fields
    const [animalType, setAnimalType] = useState("")
    const [description, setDescription] = useState("")
    const [areaid, setAreaid] = useState("")
    const [locationDetails, setLocationDetails] = useState("")
    const [rescuePic, setRescuePic] = useState(null)

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const getCases = async () => {
        const res = await axios.get(RESCUE_API)
        setCases(res.data)
    }

    const getAreas = async () => {
        const res = await axios.get(AREA_API)
        setAreas(res.data)
    }

    const handleReportClick = () => {
        if (!user) {
            alert("Please login first to report a rescue case!")
            navigate("/login")
            return
        }
        setShowForm(true)
    }

    const submitRescue = async () => {
        if (!animalType || !description || !areaid || !locationDetails)
            return alert("Please fill all fields")

        const formData = new FormData()
        formData.append("uid", user.uid)
        formData.append("animalType", animalType)
        formData.append("description", description)
        formData.append("areaid", areaid)
        formData.append("locationDetails", locationDetails)
        formData.append("createdBy", user.uid)  // ✅ add this - backend needs createdBy
        if (rescuePic) formData.append("rescuePic", rescuePic)

        try {
            const res = await axios.post(RESCUE_API, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            alert(res.data.message)
            setShowForm(false)
            setAnimalType(""); setDescription("")
            setAreaid(""); setLocationDetails(""); setRescuePic(null)
            getCases()
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.error || "Something went wrong!")
        }
    }
    useEffect(() => {
        getCases()
        getAreas()
    }, [])

    return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />

            {/* Banner */}
            <div style={{
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                margin: "10px",
                padding: "60px 20px",
                textAlign: "center",
                color: "white",
                borderRadius: "15px"
            }}>
                <h1 style={{ fontWeight: "bold" }}> Animal Rescue Services</h1>
                <h5>24/7 Emergency Response for Animals in Need</h5>
                <button className="btn btn-light mt-3"
                    style={{ borderRadius: "25px", color: "#C2185B", fontWeight: "bold" }}
                    onClick={handleReportClick}>
                    Report Injured Animal
                </button>
            </div>

            {/* How to Report Steps */}
            <div className="container my-5 text-center">
                <h2 style={{ color: "#C2185B" }}>How to Report an Injured Animal</h2>
                <p className="text-muted mb-4">Follow these simple steps to help save a life</p>
                <div className="row">
                    {[
                        { title: " Step 1 : Call Us", desc: "Contact our emergency hotline at +91 9315982650" },
                        { title: " Step 2 : Share Location", desc: "Provide exact location with landmark details" },
                        { title: " Step 2 : Describe Condition", desc: "Tell us about the animal's injuries and current state" },
                        { title: " Step 4 : Stay Safe", desc: "Keep a safe distance until our rescue team arrives" },
                    ].map((item, i) => (
                        <div key={i} className="col-md-3 mb-3">
                            <div className="card shadow h-100" style={{ borderRadius: "15px" }}>
                                <div className="card-body">
                                    <h2>{item.step}</h2>
                                    <h5 style={{ color: "#C2185B" }}>{item.title}</h5>
                                    <p className="text-muted">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent Rescue Cases from DB */}
            <div className="container my-5">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}> Recent Rescue Cases</h2>
                <div className="row">

                    {cases.length > 0 ? cases.slice(0, 6).map((c, index) => (
                        <div key={c.rescueId || index} className="col-md-4 mb-4">

                            <div className="card shadow h-100" style={{ borderRadius: "15px", border: "none" }}>
                                {c.rescuePic && (
                                    <img src={`http://localhost:5000/uploads/${c.rescuePic}`}
                                        alt="rescue"
                                        style={{ height: "300px", objectFit: "cover", borderRadius: "15px 15px 0 0" }} />
                                )}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 style={{ color: "#C2185B" }}>{c.animalType}</h5>
                                        <span className={`badge ${c.status === "Rescued" ? "bg-success" :
                                                c.status === "Assigned" ? "bg-warning" : "bg-danger"
                                            }`}>{c.status}</span>
                                    </div>
                                    <p className="text-muted" style={{ fontSize: "13px" }}>
                                        {c.description?.substring(0, 100)}...
                                    </p>
                                    <p style={{ fontSize: "13px" }}>
                                        <b>Location:</b> {c.locationDetails}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-muted text-center">No rescue cases found.</p>
                    )}
                </div>
            </div>



            {/* First Aid DO & DON'T */}
            <div className="container my-5">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>Basic First Aid While Waiting for Help</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card shadow h-100 p-3" style={{ borderRadius: "15px", borderLeft: "5px solid #28a745" }}>
                            <h4 style={{ color: "#28a745" }}> DO</h4>
                            <ul>
                                <li>Keep the animal calm and comfortable</li>
                                <li>Provide shade and fresh water if possible</li>
                                <li>Cover open wounds with clean cloth</li>
                                <li>Keep traffic away from the animal</li>
                                <li>Take photos to send to rescue team</li>
                                <li>Stay with the animal until help arrives</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card shadow h-100 p-3" style={{ borderRadius: "15px", borderLeft: "5px solid #dc3545" }}>
                            <h4 style={{ color: "#dc3545" }}> DON'T</h4>
                            <ul>
                                <li>Don't try to move severely injured animals</li>
                                <li>Don't feed injured animals</li>
                                <li>Don't touch unknown animals without protection</li>
                                <li>Don't crowd or stress the animal</li>
                                <li>Don't attempt medical treatment yourself</li>
                                <li>Don't leave the animal unattended</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {/* Animals We Rescue */}
            <div className="container my-4">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>Animals We Rescue</h2>
                <div className="row">
                    {[
                        { title: "Street Dogs", desc: "Injured, abandoned, or sick street dogs requiring immediate medical attention" },
                        { title: "Cats", desc: "Stray and injured cats, including kittens needing medical care and safe shelter" },
                        { title: "Cattle", desc: "Injured or abandoned cattle and livestock requiring veterinary intervention" },
                        { title: "Birds", desc: "Injured birds including pigeons, crows, and other species needing treatment" },
                        { title: "Small Animals", desc: "Rabbits, guinea pigs, and other small animals in distress or abandoned" },
                        { title: "Wildlife", desc: "Wildlife animals found in urban areas requiring safe relocation or medical care" },
                    ].map((item, i) => (
                        <div key={i} className="col-md-4 mb-3">
                            <div className="card shadow h-100" style={{ borderRadius: "15px" }}>
                                <div className="card-body text-center">
                                    <h2>{item.icon}</h2>
                                    <h5 style={{ color: "#C2185B" }}>{item.title}</h5>
                                    <p className="text-muted">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* Join Volunteer */}
            <div className="container my-5">
                <div className="card shadow text-center p-4"
                    style={{ background: "#fff5f7", borderRadius: "15px" }}>
                    <h2 style={{ color: "#C2185B" }}>Join Our Rescue Team</h2>
                    <p className="text-muted">We're always looking for compassionate volunteers</p>
                    <button className="btn px-5 py-2"
                        style={{
                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                            color: "white", borderRadius: "25px", border: "none",
                            fontWeight: "bold"
                        }}
                        onClick={() => navigate("/volunteer")}>
                        Become a Volunteer
                    </button>
                </div>
            </div>

            {/* Report Rescue Modal */}
            {showForm && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", zIndex: 9999
                }}>
                    <div className="card p-4" style={{ width: "480px", borderRadius: "15px" }}>
                        <h4 style={{ color: "#C2185B" }}>Report Rescue Case</h4>
                        <p className="text-muted">Fill in the details to report an injured animal</p>

                        <input type="text" className="form-control mb-2"
                            placeholder="Animal Type (e.g. Dog, Cat, Bird)"
                            value={animalType}
                            onChange={(e) => setAnimalType(e.target.value)} />

                        <textarea className="form-control mb-2" rows={3}
                            placeholder="Describe the animal's condition..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />

                        <select className="form-control mb-2" value={areaid}
                            onChange={(e) => setAreaid(e.target.value)}>
                            <option value="">-- Select Area --</option>
                            {areas.map((a) => (
                                <option key={a.areaid} value={a.areaid}>{a.areaname}</option>
                            ))}
                        </select>

                        <input type="text" className="form-control mb-2"
                            placeholder="Location Details (landmark, street...)"
                            value={locationDetails}
                            onChange={(e) => setLocationDetails(e.target.value)} />

                        <input type="file" className="form-control mb-3"
                            onChange={(e) => setRescuePic(e.target.files[0])} />

                        <div className="d-flex gap-2">
                            <button className="btn w-100"
                                style={{
                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                    color: "white", borderRadius: "25px"
                                }}
                                onClick={submitRescue}>
                                Submit Report
                            </button>
                            <button className="btn btn-secondary w-100"
                                style={{ borderRadius: "25px" }}
                                onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}