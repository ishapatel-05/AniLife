import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/donation"

export default function Donation() {
    const [donations, setDonations] = useState([])

    const getDonations = async () => {
        const res = await axios.get(API)
        setDonations(res.data)
    }

    useEffect(() => {
        getDonations()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>💰 Donation Management</h2>

            {/* Total Summary */}
            <div className="card p-3 mb-4 shadow text-center">
                <h5 style={{ color: '#C2185B' }}>
                    💰 Total Donations: ₹{donations.reduce((sum, d) => sum + Number(d.amount), 0).toLocaleString()}
                </h5>
                <small className="text-muted">Total Records: {donations.length}</small>
            </div>

            {/* Table */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((d, index) => (
                            <tr key={d.donationid}>
                                <td>{index + 1}</td>
                                <td>{d.username}</td>
                                <td>{d.ngoname}</td>
                                <td>₹{d.amount}</td>
                                <td>{d.paymentmethodname}</td>
                                <td>{d.transactionid}</td>
                                <td>{d.donationdate?.split("T")[0] ?? d.donationdate}</td>
                            </tr>
                        ))}
                        {donations.length === 0 && (
                            <tr><td colSpan="7" className="text-center">No Records Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}