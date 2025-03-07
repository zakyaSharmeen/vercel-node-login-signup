


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required!");
    }

    try {
      const url = "https://vercel-node-login-signup-9p3afgnil-zakya-sharmeens-projects.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const result = await response.json();
      // const {jwtToken} = result
      console.log(result);
      handleSuccess(result.message || "Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      handleError("something wrong in the api request or invalid field given");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signUpInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUp;
