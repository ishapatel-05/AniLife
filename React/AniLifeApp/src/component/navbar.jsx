import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const [hovered, setHovered] = useState(null)
    const navigate = useNavigate()

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"))

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <nav style={{
            background: "linear-gradient(180deg, #E91E8C 0%, #C2185B 100%)",
            padding: '10px 25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(233,30,140,0.3)',
        }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h4 style={{ color: 'white', margin: 0 }}>AniLife Connect</h4>
            </Link>

            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingTop: '10px', margin: '10px' }}>
                {[
                    { name: 'Home', path: '/' },
                    { name: 'Adopt', path: '/adopt' },
                    { name: 'Rescue', path: '/rescue' },
                    { name: 'NGO', path: '/ngo' },
                    { name: 'Vet', path: '/vet' },
                    { name: 'Volunteer', path: '/volunteer' },
                    { name: 'Guide', path: '/guide' },
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        onMouseEnter={() => setHovered(item.name)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            margin: '0 8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            paddingBottom: '3px',
                            borderBottom: hovered === item.name
                                ? '2px solid white'
                                : '2px solid transparent',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Right Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                {/* Emergency always shows */}
                <Link to="/rescue">
                    <button style={{
                        background: '#ff1744',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '15px'
                    }}>Emergency</button>
                </Link>

                {/* IF LOGGED IN - show Profile + Logout */}
                {user ? (
                    <>
                        <Link to="/profile">
                            <button style={{
                                background: 'white',
                                color: '#E91E8C',
                                border: '2px solid white',
                                padding: '7px 14px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}>
                               
                                <i className="fa fa-user-circle"></i>
                                {user.fname}</button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                color: 'white',
                                border: '2px solid white',
                                padding: '7px 14px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }}>Logout</button>
                    </>
                ) : (
                    /* IF NOT LOGGED IN - show Login + Signup */
                    <>
                        <Link to="/login">
                            <button style={{
                                background: 'white',
                                color: '#E91E8C',
                                border: '2px solid white',
                                padding: '7px 14px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}>Log In</button>
                        </Link>
                        <Link to="/register">
                            <button style={{
                                background: 'white',
                                color: '#E91E8C',
                                border: '2px solid white',
                                padding: '7px 14px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }}>Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}


// ```

// ---

// ## Logic:
// ```
// Not logged in → Shows: Log In + Sign Up
// Logged in     → Shows: 👤 John + Logout



// import { Link } from 'react-router-dom'
// import { useState } from 'react'

// export default function Navbar() {
//     const [hovered, setHovered] = useState(null)

//     return (
//         <nav style={{
//             // background: '#C2185B',
//             // background: "linear-gradient(135deg, #E91E8C, #C2185B)",
//             // fontFamily:'Segoe UI'


//             background: "linear-gradient(180deg, #E91E8C 0%, #C2185B 100%)",
//             padding: '10px 25px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             position: 'sticky',
//             top: 0,
//             zIndex: 1000,
//             boxShadow: '0 2px 10px rgba(233,30,140,0.3)',
//         }}>

//             {/* Logo */}
//             <Link to="/" style={{ textDecoration: 'none' }}>
//                 <h4 style={{ color: 'white', margin: 0 }}> AniLife Connect</h4>
//             </Link>

//             {/* Nav Links */}
//             <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingTop: '10px', margin: '10px' }}>
//                 {[
//                     { name: 'Home', path: '/' },
//                     { name: 'Adopt', path: '/adopt' },
//                     { name: 'Rescue', path: '/rescue' },
//                     { name: 'NGO', path: '/ngo' },
//                     { name: 'Vet', path: '/vet' },
//                     { name: 'Volunteer', path: '/volunteer' },
//                     { name: 'Guide', path: '/guide' },
//                     { name: 'About', path: '/about' },
//                     { name: 'Contact', path: '/contact' },
//                 ].map((item) => (
//                     <Link
//                         key={item.name}
//                         to={item.path}
//                         onMouseEnter={() => setHovered(item.name)}
//                         onMouseLeave={() => setHovered(null)}
//                         style={{
//                             color: 'white',
//                             textDecoration: 'none',
//                             margin: '0 8px',
//                             fontSize: '14px',
//                             fontWeight: '500',
//                             paddingBottom: '3px',
//                             borderBottom: hovered === item.name
//                                 ? '2px solid white'
//                                 : '2px solid transparent',
//                             transition: 'all 0.2s ease'
//                         }}
//                     >
//                         {item.name}
//                     </Link>
//                 ))}
//             </div>

//             {/* Right Buttons */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <Link to="/rescue">
//                     <button style={{
//                         background: '#ff1744',
//                         color: 'white',
//                         border: 'none',
//                         padding: '7px 14px',
//                         borderRadius: '20px',
//                         cursor: 'pointer',
//                         fontWeight: 'bold',
//                         fontSize: '15px'
//                     }}>Emergency</button>
//                 </Link>
//                 <Link to="/login">
//                     <button style={{
//                         background: 'white',
//                         color: '#E91E8C',
//                         border: '2px solid white',
//                         padding: '7px 14px',
//                         borderRadius: '20px',
//                         fontWeight: 'bold',

//                         cursor: 'pointer',
//                         fontSize: '13px'
//                     }}>Log In</button>
//                 </Link>
//                 <Link to="/register">
//                     <button style={{
//                         background: 'white',
//                         color: '#E91E8C',
//                         border: '2px solid white',
//                         padding: '7px 14px',
//                         borderRadius: '20px',
//                         cursor: 'pointer',
//                         fontWeight: 'bold',
//                         fontSize: '13px'
//                     }}>Sign Up</button>
//                 </Link>
//             </div>

//         </nav>
//     )
// }