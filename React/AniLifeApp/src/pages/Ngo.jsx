import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const NGO_API = "http://localhost:5000/api/ngosinfo"

export default function Ngo() {
    const [ngos, setNgos] = useState([])
    const navigate = useNavigate()

    const getNgos = async () => {
        const res = await axios.get(NGO_API)
        setNgos(res.data)
    }

    useEffect(() => {
        getNgos()
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
                <h1 style={{ fontWeight: "bold" }}>NGO Partners</h1>
                <h5>Organizations Working Tirelessly for Animal Welfare</h5>
            </div>

            {/* NGO Cards */}
            <div className="container my-5">
                <h2 className="text-center mb-2" style={{ color: "#C2185B" }}>Our NGO Network</h2>
                <p className="text-center text-muted mb-4">Connect with trusted animal welfare organizations in your area</p>

                <div className="row">
                    {ngos.length > 0 ? ngos.map((n) => (
                        <div key={n.ngoid} className="col-md-4 mb-4">
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
                                    <h5 className="mb-0">{n.ngoname}</h5>
                                </div>

                                <div className="card-body">
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Address:</b>{" "}
                                        <span className="text-muted">{n.address}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Area:</b>{" "}
                                        <span className="text-muted">{n.areaname}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Contact:</b>{" "}
                                        <span className="text-muted">{n.contact}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Email:</b>{" "}
                                        <span className="text-muted">{n.email}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Services:</b>{" "}
                                        <span style={{
                                            background: "#F7A9B8",
                                            color: "#B0334F",
                                            borderRadius: "20px",
                                            padding: "4px 10px",
                                            fontSize: "13px"
                                        }}>{n.services}</span>
                                    </p>
                                </div>

                                {/* Donate Now Button */}
                                <div className="card-footer text-center"
                                    style={{ background: "white", borderRadius: "0 0 15px 15px" }}>
                                    <button className="btn w-100"
                                        style={{
                                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                            color: "white",
                                            borderRadius: "25px",
                                            border: "none",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => navigate("/donate")}>
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-muted">No NGOs found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}