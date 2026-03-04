import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from '../component/navbar'
import Footer from '../component/footer'

const GUIDE_API = "http://localhost:5000/api/animalinfo"

export default function Guide() {
    const [guides, setGuides] = useState([])
    const [expanded, setExpanded] = useState(null)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const getGuides = async () => {
        const res = await axios.get(GUIDE_API)
        setGuides(res.data)
    }

    useEffect(() => {
        getGuides()
    }, [])

    const filtered = guides.filter(g =>
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.breedname.toLowerCase().includes(search.toLowerCase())
    )

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
                <h1 style={{ fontWeight: "bold" }}>Animal Care Guide</h1>
                <h5>Everything You Need to Know About Pet Care</h5>
            </div>

            {/* Intro */}
            <div className="container my-4 text-center">
                <h2 style={{ color: "#C2185B" }}>Complete Guide to Animal Welfare</h2>
                <p className="text-muted">Learn how to properly care for your pets and support animals in your community</p>

                {/* Search */}
                <input type="text" className="form-control mx-auto mt-3"
                    style={{ maxWidth: "400px", borderRadius: "25px", borderColor: "#E91E8C" }}
                    placeholder="Search by breed or title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Guide Cards from DB */}
            <div className="container my-4">
                <h2 className="mb-4" style={{ color: "#C2185B" }}>Breed Care Guides</h2>
                <div className="row">
                    {filtered.length > 0 ? filtered.map((g) => (
                        <div key={g.infoid} className="col-md-4 mb-4">
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
                                    <h5 className="mb-0">{g.title}</h5>
                                    <small>{g.breedname}</small>
                                </div>

                                <div className="card-body">
                                    {/* Nutrition */}
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Nutrition:</b>{" "}
                                        <span className="text-muted" style={{ fontSize: "13px" }}>
                                            {expanded === g.infoid
                                                ? g.nutrition
                                                : g.nutrition?.substring(0, 60) + "..."}
                                        </span>
                                    </p>

                                    {/* Diseases */}
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Diseases:</b>{" "}
                                        <span className="text-muted" style={{ fontSize: "13px" }}>
                                            {expanded === g.infoid
                                                ? g.diseases
                                                : g.diseases?.substring(0, 60) + "..."}
                                        </span>
                                    </p>

                                    {/* Vaccines */}
                                    <p className="mb-2">
                                        <b style={{ color: "#C2185B" }}>Vaccines:</b>{" "}
                                        <span style={{
                                            background: "#F7A9B8",
                                            color: "#B0334F",
                                            borderRadius: "20px",
                                            padding: "4px 10px",
                                            fontSize: "13px"
                                        }}>{g.vaccines}</span>
                                    </p>

                                    {/* First Aid - only when expanded */}
                                    {expanded === g.infoid && (
                                        <p className="mb-2">
                                            <b style={{ color: "#C2185B" }}>First Aid:</b>{" "}
                                            <span className="text-muted" style={{ fontSize: "13px" }}>
                                                {g.firstaid}
                                            </span>
                                        </p>
                                    )}
                                </div>

                                <div className="card-footer text-center"
                                    style={{ background: "white", borderRadius: "0 0 15px 15px" }}>
                                    <button className="btn w-100"
                                        style={{
                                            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                            color: "white",
                                            borderRadius: "25px",
                                            border: "none"
                                        }}
                                        onClick={() => setExpanded(expanded === g.infoid ? null : g.infoid)}>
                                        {expanded === g.infoid ? "Show Less" : "Read More"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-muted">No guides found.</p>
                    )}
                </div>
            </div>

            {/* Seasonal Care */}
            <div className="container my-5">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>Seasonal Care Tips</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card shadow p-3 h-100" style={{ borderRadius: "15px", borderLeft: "5px solid #E91E8C" }}>
                            <h4 style={{ color: "#C2185B" }}>Summer Care</h4>
                            <ul className="text-muted">
                                <li>Provide plenty of fresh water</li>
                                <li>Never leave pets in parked cars</li>
                                <li>Walk during cooler hours</li>
                                <li>Protect paws from hot pavement</li>
                                <li>Watch for signs of heat exhaustion</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card shadow p-3 h-100" style={{ borderRadius: "15px", borderLeft: "5px solid #C2185B" }}>
                            <h4 style={{ color: "#C2185B" }}>Winter Care</h4>
                            <ul className="text-muted">
                                <li>Limit outdoor time in extreme cold</li>
                                <li>Provide warm bedding and shelter</li>
                                <li>Use pet sweaters for small breeds</li>
                                <li>Wipe paws after walks</li>
                                <li>Check for antifreeze - highly toxic!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Need Help Box */}
            <div className="container mb-5">
                <div className="card shadow text-center p-4"
                    style={{ background: "#fff5f7", borderRadius: "15px" }}>
                    <h2 style={{ color: "#C2185B" }}>Need Expert Advice?</h2>
                    <p className="text-muted">Our team is here to help with any animal care questions</p>
                    <h4 style={{ color: "#C2185B" }}>Call: +91 9315982650</h4>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                        <button className="btn px-4"
                            style={{
                                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                color: "white", borderRadius: "25px", border: "none"
                            }}
                            onClick={() => navigate("/vet")}>
                            Contact Vet
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}