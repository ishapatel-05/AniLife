import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/donation"
const USER_API = "http://localhost:5000/api/mstuser"
const NGO_API = "http://localhost:5000/api/ngosinfo"
const PAYMENT_API = "http://localhost:5000/api/paymentmethod"

export default function Donation() {
    const [uid, setUid] = useState("")
    const [ngoid, setNgoid] = useState("")
    const [amount, setAmount] = useState("")
    const [pmid, setPmid] = useState("")
    const [transactionid, setTransactionid] = useState("")
    const [donationdate, setDonationdate] = useState("")
    const [id, setId] = useState(0)

    const [donations, setDonations] = useState([])
    const [users, setUsers] = useState([])
    const [ngos, setNgos] = useState([])
    const [methods, setMethods] = useState([])

    const getDonations = async () => {
        const res = await axios.get(API)
        setDonations(res.data)
    }

    const getDropdowns = async () => {
        const [uRes, nRes, pRes] = await Promise.all([
            axios.get(USER_API),
            axios.get(NGO_API),
            axios.get(PAYMENT_API)
        ])
        setUsers(uRes.data)
        setNgos(nRes.data)
        setMethods(pRes.data)
    }

    const resetForm = () => {
        setUid(""); setNgoid(""); setAmount("")
        setPmid(""); setTransactionid(""); setDonationdate("")
        setId(0)
    }

    const saveDonation = async () => {
        if (!uid || !ngoid || !amount || !pmid || !transactionid || !donationdate)
            return alert("Please fill all fields")

        const payload = {
            uid,
            ngoid,
            amount,
            pmid,
            transactionid,
            donationdate
        }

        if (id > 0) {
            await axios.put(`${API}/${id}`, payload)
            setId(0)
        } else {
            await axios.post(API, payload)
        }
        resetForm()
        getDonations()
    }

    const editDonation = (d) => {
        setUid(d.uid)
        setNgoid(d.ngoid)
        setAmount(d.amount)
        setPmid(d.pmid)
        setTransactionid(d.transactionid)
        setDonationdate(d.donationdate?.split("T")[0] ?? d.donationdate)
        setId(d.donationid)
    }

    const deleteDonation = async (donationid) => {
        const ok = confirm("Are you sure?")
        if (ok) {
            await axios.delete(`${API}/${donationid}`)
            getDonations()
        }
    }

    useEffect(() => {
        getDonations()
        getDropdowns()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>💰 Donation Management</h2>

            {/* Form Card */}
            <div className="card p-3 mb-4 shadow">
                <div className="row g-2">

                    {/* User Dropdown */}
                    <div className="col-md-4">
                        <select className="form-control" value={uid}
                            onChange={(e) => setUid(e.target.value)}>
                            <option value="">-- Select User --</option>
                            {users.map((u) => (
                                <option key={u.uid} value={u.uid}>
                                    {u.fname} {u.lname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* NGO Dropdown */}
                    <div className="col-md-4">
                        <select className="form-control" value={ngoid}
                            onChange={(e) => setNgoid(e.target.value)}>
                            <option value="">-- Select NGO --</option>
                            {ngos.map((n) => (
                                <option key={n.ngoid} value={n.ngoid}>
                                    {n.ngoname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Payment Method Dropdown */}
                    <div className="col-md-4">
                        <select className="form-control" value={pmid}
                            onChange={(e) => setPmid(e.target.value)}>
                            <option value="">-- Select Payment Method --</option>
                            {methods.map((m) => (
                                <option key={m.pmid} value={m.pmid}>
                                    {m.paymentmethodname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="col-md-3">
                        <input type="number" className="form-control"
                            placeholder="Amount" value={amount}
                            onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    {/* Transaction ID */}
                    <div className="col-md-4">
                        <input type="text" className="form-control"
                            placeholder="Transaction ID" value={transactionid}
                            onChange={(e) => setTransactionid(e.target.value)} />
                    </div>

                    {/* Donation Date */}
                    <div className="col-md-3">
                        <input type="date" className="form-control"
                            value={donationdate}
                            onChange={(e) => setDonationdate(e.target.value)} />
                    </div>

                    {/* Save / Update Button */}
                    <div className="col-md-1">
                        <button className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveDonation}>
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>

                    {/* Cancel Button */}
                    {id > 0 && (
                        <div className="col-md-1">
                            <button className="btn btn-secondary w-100"
                                onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Card */}
            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            <th>Sr.No</th>
                            <th>User</th>
                            <th>NGO</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((d, index) => (
                            <tr key={d.donationid}>
                                <td>{index + 1}</td>
                                <td>{d.fname} {d.lname}</td>
                                <td>{d.ngoname}</td>
                                <td>₹{d.amount}</td>
                                <td>{d.paymentmethodname}</td>
                                <td>{d.transactionid}</td>
                                <td>{d.donationdate?.split("T")[0] ?? d.donationdate}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => editDonation(d)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => deleteDonation(d.donationid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {donations.length === 0 && (
                            <tr><td colSpan="9" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}