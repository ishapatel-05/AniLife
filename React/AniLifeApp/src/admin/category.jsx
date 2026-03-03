import { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/api/category"

export default function Category() {

    const [catname, setCatname] = useState("")
    const [catpic, setCatpic] = useState(null)
    const [oldpic, setOldpic] = useState("")
    const [id, setId] = useState(0)
    const [categories, setCategories] = useState([])

    // ================= GET ALL =================
    const getCategories = async () => {
        try {
            const res = await axios.get(API)
            setCategories(res.data)
        } catch (error) {
            console.error(error)
            alert("Error fetching categories")
        }
    }

    // ================= SAVE / UPDATE =================
    const saveCategory = async () => {
        try {

            if (!catname) {
                return alert("Enter Category Name")
            }

            const formData = new FormData()
            formData.append("catname", catname)

            if (id > 0) {
                // UPDATE
                if (catpic) {
                    formData.append("categorypic", catpic)
                } else {
                    formData.append("old_picture", oldpic)
                }

                await axios.put(`${API}/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })

                alert("Category Updated Successfully")
                setId(0)

            } else {
                // INSERT
                if (!catpic) {
                    return alert("Select Image")
                }

                formData.append("categorypic", catpic)

                await axios.post(API, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })

                alert("Category Inserted Successfully")
            }

            // RESET
            setCatname("")
            setCatpic(null)
            setOldpic("")
            getCategories()

        } catch (error) {
            console.error(error)
            alert(error.response?.data?.error || "Something went wrong")
        }
    }

    // ================= EDIT =================
    const editCategory = (cat) => {
        setCatname(cat.catname)
        setOldpic(cat.categorypic)
        setId(cat.catid)
    }

    // ================= DELETE =================
    const deleteCategory = async (catid) => {
        const ok = window.confirm("Are you sure want to delete?")
        if (ok) {
            try {
                const res = await axios.delete(`${API}/${catid}`)
                alert(res.data.message)
                getCategories()
            } catch (error) {
                console.error(error)
                alert("Delete failed")
            }
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
                Category Management
            </h2>

            {/* FORM */}
            <div className="card p-3 mb-4 shadow">
                <div className="row">

                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                            value={catname}
                            onChange={(e) => setCatname(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setCatpic(e.target.files[0])}
                        />
                    </div>

                    <div className="col-md-2">
                        <button
                            type="button"
                            className="btn w-100"
                            style={{ background: '#E91E8C', color: 'white' }}
                            onClick={saveCategory}
                        >
                            {id > 0 ? "Update" : "Save"}
                        </button>
                    </div>

                    {id > 0 && (
                        <div className="col-md-2">
                            <button
                                type="button"
                                className="btn btn-secondary w-100"
                                onClick={() => {
                                    setId(0)
                                    setCatname("")
                                    setCatpic(null)
                                    setOldpic("")
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                </div>
            </div>

            {/* TABLE */}
            <div className="card shadow">
                <table className="table table-hover mb-0">
                    <thead style={{ background: '#E91E8C', color: 'white' }}>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Sr.No</th>

                            <th>Category Name</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((cat,index) => (
                                <tr key={cat.catid}>
                                    <td>{index + 1}</td>
                                    {/* <td>{cat.catid}</td> */}
                                    <td>{cat.catname}</td>
                                    <td>
                                        {cat.categorypic ?
                                            <img
                                                src={`http://localhost:5000/uploads/${cat.categorypic}`}
                                                alt="category"
                                                height="50"
                                                style={{ borderRadius: '8px' }}
                                            />
                                            : "No Image"}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => editCategory(cat)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteCategory(cat.catid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No Record Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// import { useEffect, useState } from "react"
// import axios from "axios"


// const API = "http://localhost:5000/api/category"


// export default function Category() {
//     const [catname, setCatname] = useState("")
//     const [catpic, setCatpic] = useState(null)
//     const [oldpic, setOldpic] = useState("")
//     const [id, setId] = useState(0)
//     const [categories, setCategories] = useState([])

//     // GET ALL
//     const getCategories = async () => {
//         const res = await axios.get(API)
//         setCategories(res.data)
//     }

//     // ADD or UPDATE
//     const saveCategory = async () => {
//         const formData = new FormData()
//         formData.append("catname", catname)

//         if (id > 0) {
//             // UPDATE
//             if (catpic) {
//                 formData.append("categorypic", catpic)
//             } else {
//                 formData.append("old_picture", oldpic)
//             }
//             await axios.put(`${API}/${id}`, formData)
//             setId(0)
//         } else {
//             // INSERT
//             formData.append("categorypic", catpic)
//             await axios.post(API, formData)
//         }


        
//         setCatname("")
//         setCatpic(null)
//         setOldpic("")
//         getCategories()
//     }

//     // EDIT - fill inputs
//     const editCategory = (cat) => {
//         setCatname(cat.catname)
//         setOldpic(cat.categorypic)
//         setId(cat.catid)
//     }

//     // DELETE
//     const deleteCategory = async (catid) => {
//         const ok = confirm("Are you sure want to delete?")
//         if (ok) {
//             const res = await axios.delete(`${API}/${catid}`)
//             alert(res.data.message)
//             getCategories()
//         }
//     }

//     useEffect(() => {
//         getCategories()
//     }, [])

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center mb-4" style={{ color: '#C2185B' }}>
//                 Category Management
//             </h2>

//             {/* Form */}
//             <div className="card p-3 mb-4 shadow">
//                 <div className="row">
//                     <div className="col-md-4">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Category Name"
//                             value={catname}
//                             onChange={(e) => setCatname(e.target.value)}
//                         />
//                     </div>
//                     <div className="col-md-4">
//                         <input
//                             type="file"
//                             className="form-control"
//                             onChange={(e) => setCatpic(e.target.files[0])}
//                         />
//                     </div>
//                     <div className="col-md-2">
//                         <button
//                             className="btn w-100"
//                             style={{ background: '#E91E8C', color: 'white' }}
//                             onClick={saveCategory}
//                         >
//                             {id > 0 ? "Update" : "Save"}
//                         </button>
//                     </div>
//                     {id > 0 && (
//                         <div className="col-md-2">
//                             <button
//                                 className="btn btn-secondary w-100"
//                                 onClick={() => { setId(0); setCatname(""); setCatpic(null) }}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="card shadow">
//                 <table className="table table-hover mb-0">
//                     <thead style={{ background: '#E91E8C', color: 'white' }}>
//                         <tr>
//                             <th>ID</th>
//                             <th>Category Name</th>
//                             <th>Image</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {categories.length > 0 ? (
//                             categories.map((cat) => (
//                                 <tr key={cat.catid}>
//                                     <td>{cat.catid}</td>
//                                     <td>{cat.catname}</td>
//                                     <td>
//                                         {cat.categorypic ?
//                                             <img
//                                                 src={`http://localhost:5000/uploads/${cat.categorypic}`}
//                                                 height="50px"
//                                                 style={{ borderRadius: '8px' }}
//                                             />
//                                             : "No Image"}
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-sm btn-warning"
//                                             onClick={() => editCategory(cat)}
//                                         >
//                                             Edit
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-sm btn-danger"
//                                             onClick={() => deleteCategory(cat.catid)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="text-center">No Record Found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }