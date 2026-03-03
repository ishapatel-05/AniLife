

import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Vet from './admin/Vet'
import UserProfile from './admin/UserProfile'
import Volunteer from './admin/Volunteer'
import RescueCase from './admin/RescueCase'
import Petlisting from './admin/Petlisting'
import Adoption from './admin/Adoption'

import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/" element={<AdminLogin />} />
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
        <Route path="/admin/vet" element={<Vet />} />
        <Route path="/admin/users" element={<UserProfile />} />
        <Route path="/admin/Volunteer" element={<Volunteer />} />
        <Route path="/admin/rescue" element={<RescueCase />} />
        <Route path="/admin/petlisting" element={<Petlisting />} />
        <Route path="/admin/adoption" element={<Adoption />} />


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adopt" element={<Home />} />
        <Route path="/rescue" element={<Home />} />
        <Route path="/ngo" element={<Home />} />
        <Route path="/vet" element={<Home />} />
        <Route path="/volunteer" element={<Home />} />
        <Route path="/animalinfo" element={<Home />} />
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
