import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin'
import Signup from '../pages/signup'
import Login from '../pages/login'
import Page404 from '../pages/page404'
const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Index
