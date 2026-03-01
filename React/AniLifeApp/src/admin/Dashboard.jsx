// import { useNavigate } from "react-router-dom"

// const navItems = [
//   "Dashboard", "Category", "Breed", "Petlisting",
//   "NGO", "Vet", "Volunteer", "Users",
//   "Donations", "Rescue Cases", "Adoption", "Logout"
// ]

// const cardData = [
//   { title: "Category", desc: "Manage animal categories" },
//   { title: "Breed", desc: "Manage animal breeds" },
//   { title: "Petlisting", desc: "Manage pet listings" },
//   { title: "NGO", desc: "Manage NGO information" },
//   { title: "Vet", desc: "Manage vet information" },
//   { title: "Volunteer", desc: "Manage volunteers" },
//   { title: "Users", desc: "Manage users" },
//   { title: "Donations", desc: "View all donations" },
//   { title: "Rescue Cases", desc: "Manage rescue cases" },
//   { title: "Adoption", desc: "Manage adoption requests" },
// ]

// export default function Dashboard() {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     navigate("/")
//   }

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>

//       {/* Sidebar */}
//       <div style={{
//         width: "220px", background: "#2c7a4b",
//         color: "#fff", padding: "20px", overflowY: "auto"
//       }}>
//         <h4 className="text-center mb-4"> AniLife Connect</h4>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {navItems.map((item) => (
//             <li key={item}
//               style={{
//                 padding: "10px", borderRadius: "6px",
//                 cursor: "pointer", marginBottom: "5px"
//               }}
//               onClick={() => item === "Logout" ? handleLogout() : null}
//               onMouseEnter={e => e.target.style.background = "#1a5c38"}
//               onMouseLeave={e => e.target.style.background = "transparent"}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, padding: "25px", background: "#f0f0f0", overflowY: "auto" }}>
//         <div className="alert alert-success">
//           Welcome, Admin! 
//         </div>
//         <div className="row">
//           {cardData.map((card, index) => (
//             <div key={index} className="col-md-4 mb-4">
//               <div className="card shadow">
//                 <div className="card-body">
//                   <h5 className="card-title">{card.title}</h5>
//                   <p className="card-text text-muted">{card.desc}</p>
//                   <button className="btn btn-success btn-sm">
//                     Open
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }


import { useNavigate } from "react-router-dom"
import { useState } from "react"

const navItems = [
  { name: "Dashboard" },
  { name: "Category" },
  { name: "Breed" },
  { name: "Petlisting" },
  { name: "NGO" },
  { name: "Vet" },
  { name: "Volunteer" },
  { name: "Users" },
  { name: "Donations" },
  { name: "Rescue Cases" },
  { name: "Adoption" },
  { name: "Logout" },
]

// const cardData = [
//   { title: "Category", desc: "Manage animal categories" },
//   { title: "Breed", desc: "Manage animal breeds" },
//   { title: "Petlisting", desc: "Manage pet listings" },
//   { title: "NGO", desc: "Manage NGO information" },
//   { title: "Vet", desc: "Manage vet information" },
//   { title: "Volunteer", desc: "Manage volunteers" },
//   { title: "Users", desc: "Manage registered users" },
//   { title: "Donations", desc: "View all donations" },
//   { title: "Rescue Cases", desc: "Manage rescue cases" },
//   { title: "Adoption", desc: "Manage adoption requests" },
//     { title: "Category", desc: "Manage animal categories", path: "/admin/category" },

// ]
const cardData = [
  { title: "Category", desc: "Manage animal categories", icon: "🐾", path: "/admin/category" },
  { title: "Breed", desc: "Manage animal breeds", icon: "🐕", path: "/admin/breed" },
  { title: "Petlisting", desc: "Manage pet listings", icon: "📋", path: "/admin/petlisting" },
  { title: "NGO", desc: "Manage NGO information", icon: "🏢", path: "/admin/ngo" },
  { title: "Vet", desc: "Manage vet information", icon: "🩺", path: "/admin/vet" },
  { title: "Volunteer", desc: "Manage volunteers", icon: "🙋", path: "/admin/volunteer" },
  { title: "Users", desc: "Manage registered users", icon: "👥", path: "/admin/users" },
  { title: "Donations", desc: "View all donations", icon: "💝", path: "/admin/donations" },
  { title: "Rescue Cases", desc: "Manage rescue cases", icon: "🚨", path: "/admin/rescue" },
  { title: "Adoption", desc: "Manage adoption requests", icon: "🏡", path: "/admin/adoption" },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleNavClick = (item) => {
    if (item === "Logout") {
      navigate("/")
    } else {
      setActiveNav(item)
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "linear-gradient(180deg, #E91E8C 0%, #C2185B 100%)",
        color: "#fff",
        padding: "20px",
        overflowY: "auto",
        boxShadow: "4px 0 15px rgba(233,30,140,0.3)"
      }}>
        {/* Logo */}
        <div style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "15px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "12px"
        }}>
          <h4 style={{ margin: 0, color: "white", fontWeight: "bold" }}>AniLife</h4>
          <small style={{ color: "#FCE4EC" }}>Admin Panel</small>
        </div>

        {/* Nav Items */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.name}
              onClick={() => handleNavClick(item.name)}
              style={{
                padding: "12px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "5px",
                background: activeNav === item.name
                  ? "rgba(255,255,255,0.25)"
                  : "transparent",
                borderLeft: activeNav === item.name
                  ? "4px solid white"
                  : "4px solid transparent",
                transition: "all 0.3s ease",
                color: item.name === "Logout" ? "#FFB3C6" : "white",
                fontWeight: activeNav === item.name ? "bold" : "normal"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = activeNav === item.name ? "rgba(255,255,255,0.25)" : "transparent"}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        background: "#FFF0F5",
        overflowY: "auto"
      }}>
        {/* Top Bar */}
        <div style={{
          background: "white",
          padding: "15px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(233,30,140,0.1)",
          borderBottom: "2px solid #FCE4EC"
        }}>
          <h5 style={{ margin: 0, color: "#C2185B" }}>
            {activeNav}
          </h5>
          <div style={{
            background: "linear-gradient(135deg, #E91E8C, #C2185B)",
            color: "white",
            padding: "8px 18px",
            borderRadius: "20px",
            fontSize: "14px"
          }}>
            Welcome, Admin!
          </div>
        </div>

        {/* Cards */}
        <div style={{ padding: "25px" }}>

          {/* Stats Row */}
          <div className="row mb-4">
            {[
              { label: "Total Pets", value: "24", color: "#E91E8C" },
              { label: "Adoptions", value: "6", color: "#C2185B" },
              { label: "Rescue Cases", value: "6", color: "#AD1457" },
              { label: "Donations", value: "4", color: "#880E4F" },
            ].map((stat, i) => (
              <div key={i} className="col-md-3 mb-3">
                <div style={{
                  background: `linear-gradient(135deg, ${stat.color}, #880E4F)`,
                  color: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(233,30,140,0.3)"
                }}>
                  <h3 style={{ margin: "5px 0", fontWeight: "bold" }}>{stat.value}</h3>
                  <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Module Cards */}
          <h6 style={{ color: "#C2185B", marginBottom: "15px", fontWeight: "bold" }}>
            Manage Modules
          </h6>
          <div className="row">
            {cardData.map((card, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: hoveredCard === index
                      ? "0 10px 30px rgba(233,30,140,0.25)"
                      : "0 3px 10px rgba(0,0,0,0.08)",
                    transform: hoveredCard === index ? "translateY(-5px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                    borderTop: "4px solid #E91E8C",
                    cursor: "pointer"
                  }}
                >
                  <h5 style={{ color: "#C2185B", fontWeight: "bold", marginBottom: "10px" }}>{card.title}</h5>
                  <p style={{ color: "#888", fontSize: "13px", marginBottom: "15px" }}>{card.desc}</p>
                  <button
                    style={{
                      background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                      color: "white",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "bold"
                    }}
                    onClick={() => navigate(card.path)}  // ← just add this line!
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

