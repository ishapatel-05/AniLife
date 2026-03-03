import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const PET_API = "http://localhost:5000/api/petlisting"
const ADOPT_API = "http://localhost:5000/api/adoption"

export default function Adopt() {
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null)
    const [userNotes, setUserNotes] = useState("")
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    const getPets = async () => {
        const res = await axios.get(PET_API)
        setPets(res.data)
    }

    const handleAdoptClick = (pet) => {
        if (!user) {
            alert("Please login first to adopt!")
            navigate("/login")
            return
        }
        setSelectedPet(pet)
        setShowModal(true)
    }

    const submitAdoption = async () => {
        if (!userNotes) return alert("Please write a note about yourself!")
        await axios.post(ADOPT_API, {
            petId: selectedPet.petId,
            adopterId: user.uid,
            ownerType: selectedPet.listedByType,
            ownerId: selectedPet.listedById,
            userNotes
        })
        alert("Adoption request submitted! We will contact you soon.")
        setShowModal(false)
        setUserNotes("")
    }

    useEffect(() => {
        getPets()
    }, [])

    return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />

            {/* Banner */}
            <div style={{
                // background: "linear-gradient(135deg, #E45473, #B0334F)",
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                margin: "10px ",

                padding: "60px 20px",
                textAlign: "center",
                color: "white"
            }}>
                <h1 style={{ fontWeight: "bold" }}>Adopt a Pet</h1>
                <h5>Give a loving home to an animal in need</h5>
            </div>

            {/* Adoption Process */}
            <div className="container my-5 text-center">
                <h2 style={{ color: "#C2185B" }}>Adoption Process</h2>
                <p className="text-muted mb-4">Simple steps to welcome your new family member</p>
                <div className="row">
                    {[
                        { title: " step 1 : Choose Your Pet", desc: "Browse our adoptable animals and find your perfect match" },
                        { title: " step 2 : Submit Application", desc: "Fill out the adoption form with your details" },
                        { title: " step 3 : Meet & Greet", desc: "Visit our facility to meet your chosen pet" },
                        { title: " step 4 : Take Home", desc: "Complete paperwork and welcome your new friend" },
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

            {/* Available Pets */}
            <div className="container my-5">
                <h2 style={{ color: "#C2185B" }}>Available For Adoption</h2>

                <div className="row mt-4">
                    {pets.length > 0 ? pets.map((pet) => (

                        <div key={pet.petId} className="col-md-4 mb-4">

                            <div className="card shadow h-100"
                                style={{ borderRadius: "15px", border: "none" }}>
                                <div className="card-header text-white text-center"
                                    style={{
                                        background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                        height: '50px'
                                        // background: "#E45473", borderRadius: "15px 15px 0 0"
                                    }}>
                                    {pet.name} - {pet.breedname}
                                </div>
                                <img
                                    src={`http://localhost:5000/uploads/${pet.petPic}`}
                                    alt={pet.name}
                                    style={{ height: "400px", objectFit: "cover" }}
                                    className="img-fluid"
                                />
                                <div className="card-body">
                                    <span style={{
                                        background: "#F7A9B8", color: "#B0334F",
                                        borderRadius: "20px", padding: "5px 10px",
                                        marginRight: "5px", fontSize: "13px"
                                    }}>{pet.age} yrs</span>
                                    <span style={{
                                        background: "#F7A9B8", color: "#B0334F",
                                        borderRadius: "20px", padding: "5px 10px",
                                        fontSize: "13px"
                                    }}>{pet.gender}</span>
                                    <p className="mt-2 mb-1"><b>Area:</b> {pet.areaname}</p>
                                    <p className="mt-1 mb-1"><b>Fee:</b> ₹{pet.adoptionFee}</p>
                                    <p className="text-muted" style={{ fontSize: "13px" }}>
                                        {pet.healthDetails?.substring(0, 80)}...
                                    </p>
                                </div>
                                <div className="card-footer text-center"
                                    style={{
                                        background: "white", height: '70px'
                                        , borderRadius: "0 0 15px 15px"
                                    }}>


                                    <button
                                        className="btn px-4"
                                        style={{
                                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",

                                            color: "white",
                                            borderRadius: "25px", border: "none"
                                        }}
                                        onClick={() => handleAdoptClick(pet)}>
                                         Adopt Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-muted">No pets available right now.</p>
                    )}
                </div>
            </div>

            {/* Adoption Modal */}
            {
                showModal && selectedPet && (
                    <div style={{
                        position: "fixed", top: 0, left: 0,
                        width: "100%", height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", zIndex: 9999
                    }}>

                        {/* note when click submit */}
                        <div className="card p-4" style={{ width: "450px", borderRadius: "15px" }}>
                            <h4 style={{ color: "#C2185B" }}>Adopt {selectedPet.name}</h4>
                            <p className="text-muted">Tell us why you want to adopt this pet</p>
                            <textarea className="form-control mb-3" rows={4}
                                placeholder="Write about yourself, your home, experience with pets..."
                                value={userNotes}
                                onChange={(e) => setUserNotes(e.target.value)} />
                            <div className="d-flex gap-2">


                                <button className="btn w-100"
                                    style={{
                                        background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                        color: "white", borderRadius: "25px"
                                    }}
                                    onClick={submitAdoption}>
                                    Submit Request
                                </button>


                                <button className="btn btn-secondary w-100"
                                    style={{ borderRadius: "25px" }}
                                    onClick={() => { setShowModal(false); setUserNotes("") }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />
        </div >
    )
}