import React from "react";
import "../css/login.css";
import { BiExit } from "react-icons/bi";
import { BiUserPlus } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <span className="Login">
            <BiExit className="icon" /> Sign in
          </span>
          <span>
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
              <input type="text" />
            </div>
            <div className="login-password-input">
              <AiOutlineLock className="login-email-input-icon" />
              <input type="password" />
            </div>
            <div className="login-confirmpassword-input">
              <AiOutlineLock className="login-email-input-icon" />
              <input type="password" />
            </div>
            <div className="login-btn">
              <button>Sign Up</button>
            </div>
          </form>
          <div className="goto-signup">
            <Link to={"/"}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
