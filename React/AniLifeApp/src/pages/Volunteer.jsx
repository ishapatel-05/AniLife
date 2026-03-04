import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const VOLUNTEER_API = "http://localhost:5000/api/volunteer"
const AREA_API = "http://localhost:5000/api/area"

export default function Volunteer() {
    const [volunteers, setVolunteers] = useState([])
    const [areas, setAreas] = useState([])
    const [showForm, setShowForm] = useState(false)

    // Form fields
    const [areaid, setAreaid] = useState("")
    const [skills, setSkills] = useState("")
    const [availability, setAvailability] = useState("")
    const [experienceYears, setExperienceYears] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const getVolunteers = async () => {
        const res = await axios.get(VOLUNTEER_API)
        setVolunteers(res.data)
    }

    const getAreas = async () => {
        const res = await axios.get(AREA_API)
        setAreas(res.data)
    }

    const handleApplyClick = () => {
        if (!user) {
            alert("Please login first to apply as volunteer!")
            navigate("/login")
            return
        }
        setShowForm(true)
    }

    const submitVolunteer = async () => {
        if (!areaid || !skills || !availability || !contactNumber)
            return alert("Please fill all required fields!")

        try {
            const res = await axios.post(VOLUNTEER_API, {
                uid: user.uid,
                areaid,
                skills,
                availability,
                experienceYears: experienceYears || 0,
                contactNumber
            })
            alert(res.data.message)
            setShowForm(false)
            setAreaid(""); setSkills(""); setAvailability("")
            setExperienceYears(""); setContactNumber("")
            getVolunteers()
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong!")
        }
    }

    useEffect(() => {
        getVolunteers()
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
                <h1 style={{ fontWeight: "bold" }}>Join Our Volunteer Team</h1>
                <h5>Make a Difference in Animals' Lives</h5>
                <button className="btn btn-light mt-3"
                    style={{ borderRadius: "25px", color: "#C2185B", fontWeight: "bold" }}
                    onClick={handleApplyClick}>
                    Apply as Volunteer
                </button>
            </div>

            {/* Why Volunteer */}
            <div className="container my-5 text-center">
                <h2 style={{ color: "#C2185B" }}>Why Volunteer With Us?</h2>
                <p className="text-muted mb-4">Join hundreds of passionate animal lovers making a real difference</p>
                <div className="row">
                    {[
                        { title: "Save Lives", desc: "Directly help injured and abandoned animals get the care they need" },
                        { title: "Learn Skills", desc: "Gain hands-on experience in animal care, rescue and rehabilitation" },
                        { title: "Build Community", desc: "Connect with like-minded people who share your passion for animals" },
                        { title: "Make Impact", desc: "Every hour you volunteer creates a lasting positive change for animals" },
                    ].map((item, i) => (
                        <div key={i} className="col-md-3 mb-3">
                            <div className="card shadow h-100" style={{ borderRadius: "15px" }}>
                                <div className="card-body">
                                    <h5 style={{ color: "#C2185B" }}>{item.title}</h5>
                                    <p className="text-muted">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Approved Volunteers */}
            <div className="container my-5">
                <h2 className="text-center mb-2" style={{ color: "#C2185B" }}>Our Volunteers</h2>
                <p className="text-center text-muted mb-4">Meet our dedicated team of animal welfare volunteers</p>
                <div className="row">
                    {volunteers.filter(v => v.status === "Approved").length > 0 ?
                        volunteers.filter(v => v.status === "Approved").map((v) => (
                            <div key={v.volunteerId} className="col-md-4 mb-4">
                                <div className="card shadow h-100" style={{
                                    borderRadius: "15px",
                                    border: "none",
                                    borderTop: "4px solid #E91E8C"
                                }}>
                                    <div className="card-header text-white text-center py-3"
                                        style={{
                                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                            borderRadius: "11px 11px 0 0"
                                        }}>
                                        <h5 className="mb-0">{v.username || "Volunteer"}</h5>
                                        <small>{v.areaname}</small>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-2">
                                            <b style={{ color: "#C2185B" }}>Skills:</b>{" "}
                                            <span style={{
                                                background: "#F7A9B8",
                                                color: "#B0334F",
                                                borderRadius: "20px",
                                                padding: "4px 10px",
                                                fontSize: "13px"
                                            }}>{v.skills}</span>
                                        </p>
                                        <p className="mb-2">
                                            <b style={{ color: "#C2185B" }}>Availability:</b>{" "}
                                            <span className="text-muted">{v.availability}</span>
                                        </p>
                                        <p className="mb-2">
                                            <b style={{ color: "#C2185B" }}>Experience:</b>{" "}
                                            <span className="text-muted">{v.experienceYears} years</span>
                                        </p>
                                        <p className="mb-2">
                                            <b style={{ color: "#C2185B" }}>Contact:</b>{" "}
                                            <span className="text-muted">{v.contactNumber}</span>
                                        </p>
                                    </div>
                                    <div className="card-footer text-center"
                                        style={{ background: "white", borderRadius: "0 0 15px 15px" }}>
                                        <span className="badge bg-success px-3 py-2">Approved Volunteer</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-muted">No approved volunteers yet.</p>
                        )}
                </div>
            </div>

            {/* Apply Button Bottom */}
            <div className="container mb-5">
                <div className="card shadow text-center p-4"
                    style={{ background: "#fff5f7", borderRadius: "15px" }}>
                    <h2 style={{ color: "#C2185B" }}>Ready to Make a Difference?</h2>
                    <p className="text-muted">Join our volunteer team today and help save animal lives</p>
                    <button className="btn px-5 py-2"
                        style={{
                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                            color: "white", borderRadius: "25px",
                            border: "none", fontWeight: "bold"
                        }}
                        onClick={handleApplyClick}>
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Apply Form Modal */}
            {showForm && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", zIndex: 9999
                }}>
                    <div className="card p-4" style={{ width: "480px", borderRadius: "15px" }}>
                        <h4 style={{ color: "#C2185B" }}>Apply as Volunteer</h4>
                        <p className="text-muted">Fill in your details to join our team</p>

                        <select className="form-control mb-2" value={areaid}
                            onChange={(e) => setAreaid(e.target.value)}>
                            <option value="">-- Select Area --</option>
                            {areas.map((a) => (
                                <option key={a.areaid} value={a.areaid}>{a.areaname}</option>
                            ))}
                        </select>

                        <input type="text" className="form-control mb-2"
                            placeholder="Skills (e.g. Animal Handling, First Aid)"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)} />

                        <input type="text" className="form-control mb-2"
                            placeholder="Availability (e.g. Weekends 9AM-5PM)"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)} />

                        <input type="number" className="form-control mb-2"
                            placeholder="Years of Experience (0 if none)"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)} />

                        <input type="text" className="form-control mb-3"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)} />

                        <div className="d-flex gap-2">
                            <button className="btn w-100"
                                style={{
                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                    color: "white", borderRadius: "25px"
                                }}
                                onClick={submitVolunteer}>
                                Submit Application
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