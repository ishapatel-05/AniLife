import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const VET_API = "http://localhost:5000/api/vet"

export default function Vet() {
    const [vets, setVets] = useState([])

    const getVets = async () => {
        const res = await axios.get(VET_API)
        setVets(res.data)
    }

    useEffect(() => {
        getVets()
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
                <h1 style={{ fontWeight: "bold" }}>Vet Clinics & Animal Hospitals</h1>
                <h5>Find Trusted Veterinary Care Near You</h5>
                <a href="tel:+919315982650">
                    <button className="btn btn-light mt-3"
                        style={{ borderRadius: "25px", color: "#C2185B", fontWeight: "bold" }}>
                        Emergency: +91 9315982650
                    </button>
                </a>
            </div>

            {/* Vet Cards */}
            <div className="container my-5">
                <h2 className="text-center mb-2" style={{ color: "#C2185B" }}>Available Vets & Clinics</h2>
                <p className="text-center text-muted mb-4">Verified veterinary professionals ready to help your animals</p>

                <div className="row">
                    {vets.length > 0 ? vets.map((v) => (
                        <div key={v.vetid} className="col-md-4 mb-4">
                            <div className="card shadow h-100" style={{
                                borderRadius: "15px",
                                border: "none",
                                borderTop: "4px solid #E91E8C"
                            }}>
                                {/* Card Header */}
                                <div className="card-header text-white text-center py-3"
                                    style={{
                                        background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                        borderRadius: "11px 11px 0 0"
                                    }}>
                                    <h5 className="mb-0">{v.vetname}</h5>
                                    <small>{v.specialization}</small>
                                </div>

                                <div className="card-body">
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Address:</b>{" "}
                                        <span className="text-muted">{v.address}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Contact:</b>{" "}
                                        <span className="text-muted">{v.contact}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Email:</b>{" "}
                                        <span className="text-muted">{v.email}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Experience:</b>{" "}
                                        <span className="text-muted">{v.yearsofexperience} years</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Availability:</b>{" "}
                                        <span style={{
                                            background: "#F7A9B8",
                                            color: "#B0334F",
                                            borderRadius: "20px",
                                            padding: "4px 10px",
                                            fontSize: "13px"
                                        }}>{v.availability}</span>
                                    </p>
                                </div>

                                {/* Call Now Button */}
                                <div className="card-footer text-center"
                                    style={{ background: "white", borderRadius: "0 0 15px 15px" }}>
                                    <a href={`tel:${v.contact}`} style={{ textDecoration: "none" }}>
                                        <button className="btn w-100"
                                            style={{
                                                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                                color: "white",
                                                borderRadius: "25px",
                                                border: "none",
                                                fontWeight: "bold"
                                            }}>
                                            Call Now
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-muted">No vets found.</p>
                    )}
                </div>
            </div>

            {/* Emergency Box */}
            <div className="container mb-5">
                <div className="card shadow text-center p-4"
                    style={{ background: "#fff5f7", borderRadius: "15px" }}>
                    <h2 style={{ color: "#C2185B" }}>Animal Emergency?</h2>
                    <p className="text-muted">Our 24/7 emergency team is always ready to help</p>
                    <div className="d-flex justify-content-center gap-3">
                        <a href="tel:+919315982650">
                            <button className="btn px-4"
                                style={{
                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                    color: "white", borderRadius: "25px", border: "none"
                                }}>
                                Call +91 9315982650
                            </button>
                        </a>
                        <a href="https://wa.me/919315982650">
                            {/* <button className="btn px-4"
                                style={{
                                    background: "#25D366",
                                    color: "white", borderRadius: "25px", border: "none"
                                }}>
                                WhatsApp Us
                            </button> */}
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}