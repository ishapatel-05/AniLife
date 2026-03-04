import Navbar from '../component/navbar'
import Footer from '../component/footer'
import { useState } from 'react'

export default function Contact() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSend = () => {
        if (!email || !message) return alert("Please fill all fields!")
        alert("Message sent successfully! We will contact you soon. ")
        setEmail("")
        setMessage("")
    }

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
                <h1 style={{ fontWeight: "bold" }}>Get In Touch</h1>
                <h5>Have questions? We're here to help. Reach out to us anytime.</h5>
            </div>

            {/* Contact Cards */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow text-center p-4 h-100"
                            style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                            {/* <div style={{ fontSize: "50px" }}>📞</div> */}
                            <h4 style={{ color: "#C2185B" }}>Call Us</h4>
                            <p className="text-muted">For immediate assistance</p>
                            <h5 style={{ color: "#E91E8C" }}>+91 9315982650</h5>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow text-center p-4 h-100"
                            style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                            {/* <div style={{ fontSize: "50px" }}>📧</div> */}
                            <h4 style={{ color: "#C2185B" }}>Email Us</h4>
                            <p className="text-muted">Send email for faster response</p>
                            <h5 style={{ color: "#E91E8C" }}>anilife@gmail.com</h5>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow text-center p-4 h-100"
                            style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                            {/* <div style={{ fontSize: "50px" }}>📍</div> */}
                            <h4 style={{ color: "#C2185B" }}>Visit Us</h4>
                            <p className="text-muted">
                                123 Pet Street, Vadodara, Gujarat, India
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Office Info + Message Form */}
            <div className="container mb-5">
                <div className="row">
                    {/* Office Info */}
                    <div className="col-md-12 mb-4">
                        <div className="card shadow p-4 h-100"
                            style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                            <h4 style={{ color: "#C2185B" }}>🕐 Contact Our Office</h4>
                            <hr />
                            <p><b style={{ color: "#C2185B" }}>Address:</b></p>
                            <p className="text-muted">123 Pet Street, Vadodara, Gujarat, India</p>
                            <p className="text-muted">House No 16, Near State Bank Of India,
                                Sultanpur, New Delhi, 110030</p>
                            <hr />
                            <p><b style={{ color: "#C2185B" }}>Working Hours:</b></p>
                            <p className="text-muted mb-1"> Emergency Rescue: <b>24/7 Available</b></p>
                            <p className="text-muted mb-1"> Office Hours: <b>9:00 AM - 6:00 PM</b></p>
                            <p className="text-muted mb-1"> Adoption Visits: <b>10:00 AM - 5:00 PM</b></p>
                            <p className="text-muted">Days: <b>Monday - Sunday</b></p>
                        </div>
                    </div>

                    {/* Message Form */}
                  
                    {/* <div className="col-md-6 mb-4">
                        <div className="card shadow p-4 h-100"
                            style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                            <h4 style={{ color: "#C2185B" }}>✉️ Send Us a Message</h4>
                            <hr />
                            <div className="mb-3">
                                <label style={{ color: "#C2185B" }}>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "#C2185B" }}>Message</label>
                                <textarea
                                    className="form-control"
                                    rows={5}
                                    placeholder="Write your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn w-100"
                                style={{
                                    background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                                    color: "white",
                                    borderRadius: "25px",
                                    border: "none"
                                }}
                                onClick={handleSend}
                            >
                                Send Message 📨
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mb-5">
                <h2 className="text-center mb-4" style={{ color: "#C2185B" }}>
                    Frequently Asked Questions
                </h2>
                <div className="row">
                    {[
                        {
                            q: "How can I report an injured animal?",
                            a: "Call our 24/7 emergency hotline at +91 9315982650 or WhatsApp us directly. Provide the exact location and details about the animal's condition."
                        },
                        {
                            q: "What is the adoption process?",
                            a: "Browse our adoptable animals, submit an application, meet the animal at our facility, and complete the adoption paperwork. The entire process takes 3-5 days."
                        },
                        {
                            q: "How can I volunteer?",
                            a: "Fill out the volunteer application form on our Volunteer page. We'll contact you within 3 days to discuss available opportunities."
                        },
                    ].map((faq, i) => (
                        <div key={i} className="col-md-4 mb-4">
                            <div className="card shadow p-4 h-100"
                                style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                                <h5 style={{ color: "#C2185B" }}>Q: {faq.q}</h5>
                                <p className="text-muted">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}