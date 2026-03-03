import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const PET_API = "http://localhost:5000/api/petlisting"

export default function Home() {
    const [pets, setPets] = useState([])
    const navigate = useNavigate()

    const getPets = async () => {
        const res = await axios.get(PET_API)
        setPets(res.data.slice(0, 3)) // show only first 3 on home
    }

    useEffect(() => {
        getPets()
    }, [])

    return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />

            {/* Banner */}
            <div style={{
                height: "200px",
                // background: "linear-gradient(135deg, #E45473, #B0334F)",
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",

                // background: "linear-gradient(#C2185B)",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                margin: "10px "
            }}>
                <h1 style={{ fontWeight: "bold", fontSize: "48px" }}>AniLife Connect</h1>

                <h5 className="mb-4">One Platform. Endless Care</h5>
{/* 
                <button className="btn btn-light text-danger px-4 py-2"
                    style={{ borderRadius: "25px", fontWeight: "bold" }}
                    onClick={() => navigate("/rescue")}>
                    Report Injured Animal
                </button> */}
            </div>

            {/* What We Do */}
            <div className="container my-5 text-center">
                <h1 style={{ color: "#B0334F" }}>What We Do</h1>
                <p className="text-muted mb-4">Our comprehensive approach to animal welfare covers every aspect of rescue, treatment, and rehabilitation.</p>
                <div className="row">
                    <div className="col-md-4 mb-3">

                        <div className="card  h-100">
                            <div className="card-body">
                                <h5 style={{ color: "#C2185B" }}>Animal Rescue & First Aid</h5>
                                <p className="text-muted">24/7 emergency response team for injured and distressed street animals</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 style={{ color: "#C2185B" }}>Adoption Program</h5>
                                <p className="text-muted">Finding loving forever homes for rescued and rehabilitated animals</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 style={{ color: "#C2185B" }}>Disaster Response</h5>
                                <p className="text-muted">Emergency animal rescue during natural calamities and crisis situations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available For Adoption */}
            <div className="container my-5">
                <h1 style={{ color: "#B0334F" }}>Available For Adoption</h1>
                <div className="row mt-4">

                    {pets.length > 0 ? pets.map((pet) => (

                        <div key={pet.petId} className="col-md-4 mb-4">
                            <div className="card  h-100">

                                <div className="card-header text-white text-center"
                                    style={{
                                        background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                        height:"50px"
                                        // background: "linear-gradient(135deg, #C2185B)",

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
                                        background: "#F7A9B8", color: "#E45473",
                                        borderRadius: "20px", padding: "5px 10px",
                                        marginRight: "5px", fontSize: "13px"
                                    }}>{pet.age} years old</span>

                                    <span style={{
                                        background: "#F7A9B8", color: "#E45473",
                                        borderRadius: "20px", padding: "5px 10px",
                                        fontSize: "13px"
                                    }}>{pet.gender}</span>
                                    <p className="mt-2 mb-1"><b>Area:</b> {pet.areaname}</p>

                                    <p className="text-muted" style={{ fontSize: "13px" }}>
                                        {pet.healthDetails?.substring(0, 80)}...
                                    </p>

                                    <p><b>Fee:</b> ₹{pet.adoptionFee}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <button
                                        className="btn px-4"
                                        style={{
                                            height:"50px",
                                            background: "linear-gradient(135deg, #E91E8C, #C2185B)", color: "white",
                                            borderRadius: "25px", border: "none"
                                        }}
                                        onClick={() => navigate("/adopt")}>
                                        Adopt Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-muted">No pets available right now.</p>
                    )}
                </div>

                {/* View All Button */}
                <div className="text-center mt-3">
                    <button className="btn px-5 py-2"
                        style={{
                            background: "linear-gradient(135deg, #E91E8C, #C2185B)", color: "white",
                            borderRadius: "25px", border: "none",
                            fontWeight: "bold",
                            height:"50px"
                        }}
                        onClick={() => navigate("/adopt")}>
                        View All Pets
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}