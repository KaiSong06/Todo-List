import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Register from "./Components/Register"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      <Routes>
        <Route path='/Register' element={<Register />} />
      </Routes>
      <hr/>
    </BrowserRouter>
  )
}

export default App;