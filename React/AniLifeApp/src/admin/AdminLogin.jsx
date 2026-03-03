import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const APIPOINT = "http://localhost:5000/api/admin/login"

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await axios.post(APIPOINT, { email, password })
        if (res.data.message == true) {
            navigate("/dashboard")
        } else {
            alert("Invalid Email Or Password!")
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h3 className="text-center mb-4" style={{ color: '#C2185B', background: 'white' }}>AniLife Admin Login</h3>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            // className=" w-100"
                            style={{ background: "#c2185ceb", color: 'white', borderRadius:'20px', height:'50px', fontStyle:'bold', border:'none'}}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}