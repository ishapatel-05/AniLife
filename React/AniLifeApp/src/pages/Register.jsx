import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API = "http://localhost:5000/api/user"

export default function Register() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (!fname || !lname || !email || !contact || !password)
            return alert("Please fill all fields")

        const res = await axios.post(API, { fname, lname, email, contact, password })
        alert(res.data.message)
        navigate("/login")
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #FFF0F5, #FCE4EC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4" style={{ color: '#C2185B' }}>Register</h3>

                <div className="mb-3">
                    <input type="text" className="form-control"
                        placeholder="First Name" value={fname}
                        onChange={(e) => setFname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        placeholder="Last Name" value={lname}
                        onChange={(e) => setLname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control"
                        placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        placeholder="Contact Number" value={contact}
                        onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="btn w-100 mb-3"
                    style={{ background: '#E91E8C', color: 'white' }}
                    onClick={handleRegister}>
                    Register
                </button>

                <p className="text-center" style={{ fontSize: '14px' }}>
                    Already have an account?{" "}
                    <span style={{ color: '#E91E8C', cursor: 'pointer' }}
                        onClick={() => navigate("/login")}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    )
}