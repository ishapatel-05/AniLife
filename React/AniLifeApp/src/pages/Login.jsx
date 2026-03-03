import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API = "http://localhost:5000/api/user/login"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password)
            return alert("Please fill all fields")

        const res = await axios.post(API, { email, password })
        if (res.data.message === true) {
            localStorage.setItem("user", JSON.stringify(res.data.user))
            alert("Login Successful!")
            navigate("/home")
        } else {
            alert("Invalid email or password!")
        }
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
                <h3 className="text-center mb-4" style={{ color: '#C2185B' }}> Login</h3>

                <div className="mb-3">
                    <input type="email" className="form-control"
                        placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="btn w-100 mb-3"
                    style={{ background: '#E91E8C', color: 'white' }}
                    onClick={handleLogin}>
                    Login
                </button>

                <p className="text-center" style={{ fontSize: '14px' }}>
                    Don't have an account?{" "}
                    <span style={{ color: '#E91E8C', cursor: 'pointer' }}
                        onClick={() => navigate("/register")}>
                        Register here
                    </span>
                </p>
            </div>
        </div>
    )
}