



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogIn() {
  const [logInInfo, setlogInInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogInInfo({ ...logInInfo, [name]: value });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const {  email, password } = logInInfo;

    if (!email || !password) {
      return handleError("Name, email, and password are required!");
    }

    try {
      const url = "https://vercel-node-login-signup-9p3afgnil-zakya-sharmeens-projects.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInInfo),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const result = await response.json();
      const {jwtToken, success, existingUser } = result
      const name = existingUser.name;  

      console.log(result)
      // console.log(name);
      if(success){

        handleSuccess(result.message || "Signup successful!");
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("LoggedInUser", name)
        setTimeout(() => {
          navigate("/home");
        }, 1500);


      }else{
        handleError("something wrong in token coming");

      }
      
     
    } catch (err) {
      handleError("Wrong credentials given either (email or password)");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>LogIn</h1>
      <form onSubmit={handleLogIn}>
       
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={logInInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={logInInfo.password}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LogIn;

