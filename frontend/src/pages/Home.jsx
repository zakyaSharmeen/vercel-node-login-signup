

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("LoggedInUser");
    setLoggedInUser(user);

    if (user) {
      toast.success(`Welcome ${user}!`, { autoClose: 1000 }); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    toast.success("User Logged Out", { autoClose: 1500 });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };


  const fetchdProducts= async()=>{
    try{
      // const url = "http://localhost:8080/products"
      const url = "https://vercel-node-login-signup.vercel.app/products"


      const headers =
       {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
       }
      
      const response = await fetch(url, headers)
              const result = await response.json();
        // console.log(result);
        setProducts(result)
        
        console.log('====================================');
      
    }catch(err){
      console.log(err);
      console.log('====================================');
    }
  }
  useEffect(()=>{
    fetchdProducts()
  },[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <div>
        {
          products && products?.map((item, index)=>(
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          )

          )
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
