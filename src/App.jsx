import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Users from './pages/Users'
import Promotions from './pages/Promotions'
import AddPromotion from './pages/AddPromotion'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route index element={<Promotions/>} />
        <Route path="users" element={<Users />} />
        <Route path="add-promotion" element={<AddPromotion />} />
        <Route path="edit-promotion/:promotionId" element={<AddPromotion />} />
        
      </Route>
    </Routes>
  )
}

export default App
