import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import './index.css';
import Register from "./Components/Register";
import UserContext from "./Components/Context";
import Login from "./Components/Login"


function App() {

  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/user", {withCredentials:true})
    .then(response => {
      setEmail(response.data.email);
    });
  }, []);

  return (
    <UserContext.Provider value={{email, setEmail}}>
      <BrowserRouter>
        <div>
          {!!email && (
            <div>Logged in as {email}</div>
          )}
          {!email && (
            <div>Not logged in</div>
          )}
        </div>
        <div>
          <Link to={'/'}>Home</Link> | 
          <Link to={'/Login'}> Login</Link> |
          <Link to={'/Register'}> Register</Link>
        </div>
        <Routes>
          <Route path={'/Register'} element={<Register/>} />
          <Route path={'/Login'} element={<Login/>}/>
        </Routes>
        <hr/>
      </BrowserRouter>
   </UserContext.Provider>
  )
}

export default App;