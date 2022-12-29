import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../pages/admin";
import Signup from "../pages/signup";
import Login from "../pages/login";
import { useContext } from "react";
import userContext from "../context";
const Index = () => {
  const email = localStorage.getItem("email");
  console.log(email);
  const dataa = useContext(userContext);
  console.log(dataa);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
