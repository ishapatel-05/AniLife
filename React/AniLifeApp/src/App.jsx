

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// admin side
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import Home from './pages/home'
import Category from './admin/category'
import Country from './admin/Country'
import State from './admin/State'
import City from './admin/City'
import Area from './admin/Area'
import Payment from './admin/Payment'
import Donation from './admin/Donation'
import Breed from './admin/breed'
import AnimalInfo from './admin/animalinfo'
import NgosInfo from './admin/Ngosinfo'
import AdminVet from './admin/Vet'
import AdminUserProfile from './admin/UserProfile'
import AdminVolunteer from './admin/Volunteer'
import RescueCase from './admin/RescueCase'
import Petlisting from './admin/Petlisting'
import Adoption from './admin/Adoption'
// user sides
import Register from './pages/Register'
import Login from './pages/Login'
import Adopt from './pages/Adopt'
import Rescue from './pages/Rescue'
import Ngo from './pages/Ngo'
import Vet from './pages/Vet'
import Volunteer from './pages/Volunteer'
import Guide from './pages/Guide'
import About from './pages/About'
import Contact from './pages/Contact'
// import Emergency from './pages/Emergency'
import UserProfile from './pages/UserProfile'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/category" element={<Category />} />

        <Route path="/admin/country" element={<Country />} />
        <Route path="/admin/state" element={<State />} />
        <Route path="/admin/city" element={<City />} />
        <Route path="/admin/area" element={<Area />} />
        <Route path="/admin/payment" element={<Payment />} />
        <Route path="/admin/donation" element={<Donation />} />
        <Route path="/admin/breed" element={<Breed />} />
        <Route path="/admin/animalinfo" element={<AnimalInfo />} />
        <Route path="/admin/ngo" element={<NgosInfo />} />
        <Route path="/admin/vet" element={<AdminVet />} />
        <Route path="/admin/users" element={<AdminUserProfile />} />
        <Route path="/admin/Volunteer" element={<AdminVolunteer />} />
        <Route path="/admin/rescue" element={<RescueCase />} />
        <Route path="/admin/petlisting" element={<Petlisting />} />
        <Route path="/admin/adoption" element={<Adoption />} />




        {/* User pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/vet" element={<Vet />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/emergency" element={<Emergency />} /> */}
        <Route path="/profile" element={<UserProfile />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
