
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from '../component/navbar'
import Footer from '../component/footer'
import { Link } from 'react-router-dom'
const VET_API = "http://localhost:5000/api/vet"

export default function Emergency() {
    // Add inside component
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
                background: "linear-gradient(135deg, #ff1744, #c62828)",
                // background: "#fff5f5",
                margin: "10px",
                padding: "60px 20px",
                textAlign: "center",
                color: "white",
                borderRadius: "15px"
            }}>
                <h1 style={{ fontWeight: "bold" }}>Emergency Animal Rescue</h1>
                <h5>24/7 Emergency Response Team Available</h5>
                <div className="mt-3 d-flex justify-content-center gap-3 flex-wrap">
                    <a href="tel:+919315982650">
                        <button className="btn btn-light px-4"
                            style={{ borderRadius: "25px", color: "#c62828", fontWeight: "bold" }}>
                            Call: +91 9315982650
                        </button>
                    </a>
                    <a href="https://wa.me/919315982650">
                       
                        <Link to="/rescue">
                            <button className="btn px-4"
                                style={{
                                    background: "white",
                                    color: "#c62828", borderRadius: "25px", border: "none",fontWeight: "bold"
                                }}>
                                Report Rescue Case
                            </button>
                        </Link>
                    </a>
                </div>
            </div>

            {/* Call & WhatsApp Cards */}
            {/* <div className="container-fluid my-4 py-4">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h2>Call Us</h2>
                                <p>For immediate assistance, call our 24/7 helpline</p>
                                <h2 className="text-danger">+91 9315982650</h2>
                                <a href="tel:+919315982650">
                                    <button className="btn btn-danger rounded px-4">
                                        Call Now
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h2>WhatsApp Us</h2>
                                <p>Send photos & location for faster response</p>
                                <h2 className="text-success">+91 9315982650</h2>
                                <a href="https://wa.me/919315982650">
                                    <button className="btn btn-success rounded px-4">
                                        WhatsApp Now
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-muted">
                    Send us your location and photos of the animal for faster assistance
                </p>
            </div> */}

            {/* Steps */}
            <div style={{
                background: "#fce4e4",
                margin: "50px",
                padding: "20px",
                borderRadius: "10px"
            }}>
                <div className="text-center " style={{ color: '#C2185B' }}>
                    <h1>What To Do If You See An Injured Animal</h1>
                    <h3>Follow these steps while our team is on the way</h3>
                </div>

                {[
                    { num: "1", title: "Stay Calm", desc: "Approach the animal slowly and calmly. Avoid sudden movements that might frighten them." },
                    { num: "2", title: "Assess the Situation", desc: "Check if the animal is conscious, breathing, and the severity of injuries from a safe distance." },
                    { num: "3", title: "Secure the Area", desc: "If on a road, try to slow down traffic. Use hazard markers if available." },
                    { num: "4", title: "Contact Us Immediately", desc: "Call our emergency helpline or send a WhatsApp message with location and photos." },
                    { num: "5", title: "Stay With the Animal", desc: "Keep the animal calm and stay nearby until our rescue team arrives." },
                ].map((step, i) => (
                    <div className="card mx-5 my-4"
                        style={{ color: '#C2185B' }}
                        key={i}>
                        <div className="card-body">
                            <h3 className="text-center">Step {step.num}: {step.title}</h3>
                            <h6 className="text-center text-muted">{step.desc}</h6>
                        </div>
                    </div>
                ))}
            </div>
            {/* Nearby Vet Clinics */}
            <div className="container my-5">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
                    Nearby Emergency Vet Clinics
                </h2>
                <div className="row">
                    {vets.length > 0 ? vets.map((v) => (
                        <div key={v.vetid} className="col-md-4 mb-4">
                            <div className="card shadow h-100"
                                style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>

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
                                            background: "#F7A9B8", color: "#B0334F",
                                            borderRadius: "20px", padding: "4px 10px",
                                            fontSize: "13px"
                                        }}>{v.availability}</span>
                                    </p>
                                </div>

                                <div className="card-footer text-center"
                                    style={{ background: "white", borderRadius: "0 0 15px 15px" }}>
                                    <a href={`tel:${v.contact}`}>
                                        <button className="btn w-100"
                                            style={{
                                                background: "linear-gradient(135deg, #ff1744, #c62828)",
                                                color: "white", borderRadius: "25px", border: "none"
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

            {/* Bottom Box */}
            <div className="container mb-5">
                <div className="card shadow text-center p-4"
                    style={{ background: "#fff5f7", borderRadius: "15px" }}>
                    <h2 style={{ color: "#c62828" }}>Need Immediate Help?</h2>
                    <p className="text-muted">Our 24/7 emergency team is always ready</p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <a href="tel:+919315982650">
                            <button className="btn btn-danger px-4"
                                style={{ borderRadius: "25px" }}>
                                Call +91 9315982650
                            </button>
                        </a>
                        {/* <a href="https://wa.me/919315982650">
                            <button className="btn px-4"
                                style={{
                                    background: "#25D366", color: "white",
                                    borderRadius: "25px", border: "none"
                                }}>
                                WhatsApp Us
                            </button>
                        </a> */}
                        <Link to="/rescue">
                            <button className="btn px-4"
                                style={{
                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                    color: "white", borderRadius: "25px", border: "none"
                                }}>
                                Report Rescue Case
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}