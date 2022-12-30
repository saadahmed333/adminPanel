import React, { useState } from "react";
import "../css/login.css";
import { BiExit } from "react-icons/bi";
import { BiUserPlus } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const signupUrl = "http://192.168.50.245:3001/api/user";
  const [username, setUsername] = useState();
  const [error, setError] = useState();
  const [signupEmail, setSignupEmail] = useState();
  const [signin, setSignin] = useState();
  const [button, setButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signupPassword, setSignupPassword] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setSignupPassword({
      ...signupPassword,
      showPassword: !signupPassword.showPassword,
    });
  };
  const handlePasswordChange = (prop) => (event) => {
    setSignupPassword({ ...signupPassword, [prop]: event.target.value });
  };

  const [signupConfirmPassword, setSignupConfirmPassword] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickConfirmShowPassword = () => {
    setSignupConfirmPassword({
      ...signupConfirmPassword,
      showPassword: !signupConfirmPassword.showPassword,
    });
  };
  const handleConfirmPasswordChange = (prop) => (event) => {
    setSignupConfirmPassword({
      ...signupConfirmPassword,
      [prop]: event.target.value,
    });
  };

  const postUser = async () => {
    try {
      const res = await axios.post(signupUrl, {
        username: username,
        email: signupEmail,
        password: signupPassword.password,
      });
      setError("");
      setButton(false);
      setLoading(!loading);
      setTimeout(() => {
        setSignin(!signin);
      }, 2000);
      console.log(res);
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
    }
  };

  const signupButton = (event) => {
    event.preventDefault();
    postUser();
    console.log(username);
    console.log(signupEmail);
    console.log(signupPassword.password);
    console.log(signupConfirmPassword.password);
  };
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
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-email-input">
              <RiUser3Line className="login-email-input-icon" />
              <input
                type="text"
                placeholder="e-mail"
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="login-password-input">
              <AiOutlineLock className="login-email-input-icon" />
              <input
                placeholder="Password"
                type={signupPassword.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={signupPassword.password}
              />
              {signupPassword.showPassword ? (
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
            <div className="login-confirmpassword-input">
              <AiOutlineLock className="login-email-input-icon" />
              <input
                placeholder="Confirm Password"
                type={signupConfirmPassword.showPassword ? "text" : "password"}
                onChange={handleConfirmPasswordChange("password")}
                value={signupConfirmPassword.password}
              />
              {signupConfirmPassword.showPassword ? (
                <AiFillEye
                  className="login-email-input-icon eye-icon"
                  onClick={handleClickConfirmShowPassword}
                />
              ) : (
                <AiFillEyeInvisible
                  className="login-email-input-icon eye-icon"
                  onClick={handleClickConfirmShowPassword}
                />
              )}
            </div>
            <p className="error">{error}</p>
            <div className="login-btn">
              {button && <button onClick={signupButton}>Log in</button>}
              {loading && <div className="loader"></div>}
              {signin && <Navigate to="/" />}
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
