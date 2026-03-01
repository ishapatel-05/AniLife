
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import AdminLogin from './admin/AdminLogin'
// import Dashboard from './admin/Dashboard'

// import Home from './pages/home'

// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="/login" element={<AdminLogin />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import Home from './pages/home'
import Category from './admin/category'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/category" element={<Category />} />

        {/* User pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adopt" element={<Home />} />
        <Route path="/rescue" element={<Home />} />
        <Route path="/ngo" element={<Home />} />
        <Route path="/vet" element={<Home />} />
        <Route path="/volunteer" element={<Home />} />
        <Route path="/guide" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/emergency" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App