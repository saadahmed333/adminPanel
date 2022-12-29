import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import "../css/login.css";
import { BiExit } from "react-icons/bi";
import { BiUserPlus } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import userContext from "../context";
const Login = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [loggedIn, setLoggedIn] = useState(false)
    const [eye, setEye] = useState({
    password: "",
    showPassword: false,
  });
  
  const handleClickShowPassword = () => {
    setEye({ ...eye, showPassword: !eye.showPassword });
  };
  const handlePasswordChange = (prop) => (event) => {
    setEye({ ...eye, [prop]: event.target.value });
  };
  
  const loginUrl = "http://192.168.50.245:3001/api/auth/login";

  const login = async () => {
    try {
      const res = await axios.post(loginUrl, {
        email: email,
        password: eye.password
      })
      setLoggedIn(!loggedIn)
      console.log(res);
      console.log(res.data);
      setError("");
     localStorage.setItem("email", res.data.user.email)
     localStorage.setItem("id", res.data.user.id)
     console.log(res.data.user.email, "=====> email")
      
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
      console.log(e.response.data.message);
      setError(e.response.data.message)
    }
  };



  return (
    
    <userContext.Provider value={loggedIn}>
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <span>
            <BiExit className="icon" /> Sign in
          </span>
          <span className="signup">
            <BiUserPlus className="icon" />
            Sign up
          </span>
        </div>
        <div className="profile">
          <div className="profile-icon-div">
            <FaUserAlt className="profile-icon" />
          </div>
        </div>
        <div className="login-form">
          <form>
            <div className="login-email-input">
              <RiUser3Line className="login-email-input-icon" />
              <input
                type="text"
                placeholder="Username or e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-password-input">
              <AiOutlineLock className="login-email-input-icon" />
              <input
                placeholder="Password"
                type={eye.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={eye.password}
              />
              {eye.showPassword ? (
                <AiFillEye
                  className="login-email-input-icon eye-icon"
                  onClick={handleClickShowPassword}
                />
              ) : (
                <AiFillEyeInvisible
                  className="login-email-input-icon eye-icon"
                  onClick={handleClickShowPassword}
                />
              )}
            </div>
              <p className="error">{error}</p>
            <div className="login-btn">
              {/* <Link to={""}> */}
              <Link>
                <button onClick={login}>Log in</button>
              </Link>
              {loggedIn && (
          <Navigate to="/admin"  />
        )}
            </div>
          </form>
          <div className="goto-signup">
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
    </userContext.Provider>
  );
};

export default Login;
