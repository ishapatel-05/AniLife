

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
import UserProfile from './admin/UserProfile'
import Volunteer from './admin/Volunteer'
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        {/* <Route path="/" element={<AdminLogin />} /> */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/adminlogin" element={<AdminLogin />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/category" element={<Category />} />

        <Route path="/admin/country" element={<Country />} />
        <Route path="/admin/state" element={<State />} />
        <Route path="/admin/city" element={<City />} />
        <Route path="/admin/area" element={<Area />} />
        <Route path="/admin/payment" element={<Payment />} />
        {/* <Route path="/admin/Donation" element={<Donation />} /> */}
        <Route path="/admin/donation" element={<Donation />} />
        <Route path="/admin/breed" element={<Breed />} />
        <Route path="/admin/animalinfo" element={<AnimalInfo />} />
        <Route path="/admin/ngo" element={<NgosInfo />} />
        <Route path="/admin/vet" element={<AdminVet />} />
        <Route path="/admin/users" element={<UserProfile />} />
        <Route path="/admin/Volunteer" element={<Volunteer />} />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
