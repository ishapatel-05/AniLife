import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const BASE = "http://localhost:5000"

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"))

    const [profile, setProfile] = useState(null)
    const [adoptions, setAdoptions] = useState([])
    const [rescues, setRescues] = useState([])
    const [volunteer, setVolunteer] = useState(null)
    const [myPets, setMyPets] = useState([])
    const [activeTab, setActiveTab] = useState("profile")

    // GET profile
    const getProfile = async () => {
        try {
            const res = await axios.get(`${BASE}/api/userprofile/user/${user.uid}`)
            setProfile(res.data)
        } catch { setProfile(null) }
    }

    // GET my adoption requests
    const getAdoptions = async () => {
        try {
            const res = await axios.get(`${BASE}/api/adoption/adopter/${user.uid}`)
            if (Array.isArray(res.data)) setAdoptions(res.data)
        } catch { setAdoptions([]) }
    }

    // GET my rescue cases
    const getRescues = async () => {
        try {
            const res = await axios.get(`${BASE}/api/rescue`)
            if (Array.isArray(res.data))
                setRescues(res.data.filter(r => r.uid == user.uid))
        } catch { setRescues([]) }
    }

    // GET my volunteer status
    const getVolunteer = async () => {
        try {
            const res = await axios.get(`${BASE}/api/volunteer`)
            if (Array.isArray(res.data)) {
                const mine = res.data.find(v => v.uid == user.uid)
                setVolunteer(mine || null)
            }
        } catch { setVolunteer(null) }
    }

    // GET my listed pets
    const getMyPets = async () => {
        try {
            const res = await axios.get(`${BASE}/api/petlisting`)
            if (Array.isArray(res.data))
                setMyPets(res.data.filter(p => p.listedById == user.uid))
        } catch { setMyPets([]) }
    }

    useEffect(() => {
        if (!user) return
        getProfile()
        getAdoptions()
        getRescues()
        getVolunteer()
        getMyPets()
    }, [])

    if (!user) return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />
            <div className="container text-center mt-5">
                <h3 style={{ color: "#C2185B" }}>Please login first!</h3>
            </div>
            <Footer />
        </div>
    )

    const tabStyle = (tab) => ({
        padding: "10px 20px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        fontWeight: "bold",
        background: activeTab === tab
            ? "linear-gradient(135deg, #E91E8C, #C2185B)"
            : "white",
        color: activeTab === tab ? "white" : "#C2185B",
        border: activeTab === tab ? "none" : "2px solid #E91E8C"
    })

    const statusBadge = (status) => {
        const colors = {
            Pending: { background: "#fff3cd", color: "#856404" },
            Approved: { background: "#d1e7dd", color: "#0f5132" },
            Rejected: { background: "#f8d7da", color: "#842029" }
        }
        return {
            ...colors[status] || colors.Pending,
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold"
        }
    }

    return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />

            {/* Banner */}
            <div style={{
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                margin: "10px",
                padding: "40px 20px",
                textAlign: "center",
                color: "white",
                borderRadius: "15px"
            }}>
                {profile?.picture ? (
                    <img
                        src={`${BASE}/uploads/${profile.picture}`}
                        style={{
                            width: "100px", height: "100px",
                            borderRadius: "50%", border: "4px solid white",
                            objectFit: "cover", marginBottom: "10px"
                        }}
                    />
                ) : (
                    <div style={{
                        width: "100px", height: "100px", borderRadius: "50%",
                        background: "white", display: "flex", alignItems: "center",
                        justifyContent: "center", margin: "0 auto 10px",
                        fontSize: "40px"
                    }}>
                        👤</div>
                )}
                <h2>{user.fname} {user.lname}</h2>
                <p style={{ opacity: 0.9 }}>{user.email}</p>
            </div>

            {/* Tabs */}
            <div className="container mt-4">
                <div className="d-flex gap-2 flex-wrap justify-content-center mb-4">
                    <button style={tabStyle("profile")} onClick={() => setActiveTab("profile")}>My Profile</button>
                    <button style={tabStyle("adoptions")} onClick={() => setActiveTab("adoptions")}>My Adoptions</button>
                    <button style={tabStyle("rescues")} onClick={() => setActiveTab("rescues")}>My Rescues</button>
                    <button style={tabStyle("volunteer")} onClick={() => setActiveTab("volunteer")}>Volunteer Status</button>
                    <button style={tabStyle("pets")} onClick={() => setActiveTab("pets")}>My Listed Pets</button>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="card shadow p-4 mb-5"
                        style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                        <h4 style={{ color: "#C2185B" }}>My Profile</h4>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <p><b style={{ color: "#C2185B" }}>First Name:</b> {user.fname}</p>
                                <p><b style={{ color: "#C2185B" }}>Last Name:</b> {user.lname}</p>
                                <p><b style={{ color: "#C2185B" }}>Email:</b> {user.email}</p>
                            </div>
                            <div className="col-md-6">
                                {profile ? (
                                    <>
                                        <p><b style={{ color: "#C2185B" }}>Address:</b> {profile.address}</p>
                                        <p><b style={{ color: "#C2185B" }}>Area:</b> {profile.areaname}</p>
                                    </>
                                ) : (
                                    <p className="text-muted">No profile details added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Adoptions Tab */}
                {activeTab === "adoptions" && (
                    <div className="card shadow p-4 mb-5"
                        style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                        <h4 style={{ color: "#C2185B" }}>My Adoption Requests</h4>
                        <hr />
                        {adoptions.length > 0 ? (
                            <div className="row">
                                {adoptions.map((a) => (
                                    <div key={a.adoptionId} className="col-md-4 mb-4">
                                        <div className="card shadow h-100"
                                            style={{ borderRadius: "12px" }}>
                                            {a.petPic && (
                                                <img
                                                    src={`${BASE}/uploads/${a.petPic}`}
                                                    style={{ height: "180px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                                                />
                                            )}
                                            <div className="card-body">
                                                <h5 style={{ color: "#C2185B" }}>{a.petname}</h5>
                                                <p className="mb-1"><b>Note:</b> {a.userNotes}</p>
                                                <p className="mb-1">
                                                    <b>Status: </b>
                                                    <span style={statusBadge(a.status)}>{a.status}</span>
                                                </p>
                                                <p className="text-muted" style={{ fontSize: "12px" }}>
                                                    {new Date(a.requestDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted text-center">No adoption requests yet.</p>
                        )}
                    </div>
                )}

                {/* Rescues Tab */}
                {activeTab === "rescues" && (
                    <div className="card shadow p-4 mb-5"
                        style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                        <h4 style={{ color: "#C2185B" }}>My Rescue Cases</h4>
                        <hr />
                        {rescues.length > 0 ? (
                            <div className="row">
                                {rescues.map((r) => (
                                    <div key={r.rescueId} className="col-md-4 mb-4">
                                        <div className="card shadow h-100"
                                            style={{ borderRadius: "12px" }}>
                                            {r.rescuePic && (
                                                <img
                                                    src={`${BASE}/uploads/${r.rescuePic}`}
                                                    style={{ height: "180px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                                                />
                                            )}
                                            <div className="card-body">
                                                <h5 style={{ color: "#C2185B" }}>{r.animalType}</h5>
                                                <p className="mb-1"><b>Description:</b> {r.description}</p>
                                                <p className="mb-1"><b>Location:</b> {r.locationDetails}</p>
                                                <p className="mb-1">
                                                    <b>Status: </b>
                                                    <span style={statusBadge(r.status)}>{r.status}</span>
                                                </p>
                                                <p className="text-muted" style={{ fontSize: "12px" }}>
                                                    {new Date(r.createdOn).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted text-center">No rescue cases reported yet.</p>
                        )}
                    </div>
                )}

                {/* Volunteer Tab */}
                {activeTab === "volunteer" && (
                    <div className="card shadow p-4 mb-5"
                        style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                        <h4 style={{ color: "#C2185B" }}>My Volunteer Status</h4>
                        <hr />
                        {volunteer ? (
                            <div className="row">
                                <div className="col-md-6">
                                    <p><b style={{ color: "#C2185B" }}>Skills:</b> {volunteer.skills}</p>
                                    <p><b style={{ color: "#C2185B" }}>Availability:</b> {volunteer.availability}</p>
                                    <p><b style={{ color: "#C2185B" }}>Experience:</b> {volunteer.experienceYears} years</p>
                                    <p><b style={{ color: "#C2185B" }}>Contact:</b> {volunteer.contactNumber}</p>
                                    <p><b style={{ color: "#C2185B" }}>Area:</b> {volunteer.areaname}</p>
                                    <p>
                                        <b style={{ color: "#C2185B" }}>Status: </b>
                                        <span style={statusBadge(volunteer.status)}>{volunteer.status}</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted text-center">You have not applied as volunteer yet.</p>
                        )}
                    </div>
                )}

                {/* My Pets Tab */}
                {activeTab === "pets" && (
                    <div className="card shadow p-4 mb-5"
                        style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                        <h4 style={{ color: "#C2185B" }}>My Listed Pets</h4>
                        <hr />
                        {myPets.length > 0 ? (
                            <div className="row">
                                {myPets.map((pet) => (
                                    <div key={pet.petId} className="col-md-4 mb-4">
                                        <div className="card shadow h-100"
                                            style={{ borderRadius: "12px" }}>
                                            <div className="card-header text-white text-center"
                                                style={{
                                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                                    borderRadius: "12px 12px 0 0"
                                                }}>
                                                {pet.name} - {pet.breedname}
                                            </div>
                                            {pet.petPic && (
                                                <img
                                                    src={`${BASE}/uploads/${pet.petPic}`}
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                            )}
                                            <div className="card-body">
                                                <p className="mb-1"><b>Age:</b> {pet.age} yrs</p>
                                                <p className="mb-1"><b>Gender:</b> {pet.gender}</p>
                                                <p className="mb-1"><b>Area:</b> {pet.areaname}</p>
                                                <p className="mb-1"><b>Fee:</b> ₹{pet.adoptionFee}</p>
                                                <span style={{
                                                    background: "#d1e7dd", color: "#0f5132",
                                                    padding: "4px 12px", borderRadius: "20px", fontSize: "13px"
                                                }}>Active</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted text-center">No pets listed yet.</p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}