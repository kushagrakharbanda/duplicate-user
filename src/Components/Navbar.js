import React ,{useEffect, useState} from 'react';
import {useCookies} from 'react-cookie'

import { NavLink ,useHistory } from 'react-router-dom';
const Navbar = () => {
  const history=useHistory()
  const [cookies, setCookie, removeCookie] = useCookies('user');
  const logout=()=>{
    removeCookie('user')
    window.location.reload()
    history.push('/login')
  }
  
    return (
        <nav className="navbar flex-column navbar-expand-lg navbar-light  bg-light ">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item mx-1">
          <NavLink className="nav-link " aria-current="page" to="/all">USERS</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link" to="/allDepartment">DEPARTMENTS</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link" to="/allClient">CLIENTS</NavLink>
        </li>
        <li className="nav-item mx-1">
          <NavLink className="nav-link" to="/allProject">PROJECTS</NavLink>
        </li>
        
        </ul>
        </div>
    <div className="collapse navbar-collapse d-flex justify-content-end text-white" id="navbarNav">
        <ul className="navbar-nav ">
        <li className="nav-item mx-1">
    {cookies.user? (<span className="nav-link"> WELCOME {cookies.user}</span> ) : (<span className="nav-link"> WELCOME</span>)}
        </li> 
        <li className="nav-item mx-1">
      {cookies.user ? (<NavLink className="nav-link" onClick={logout} to="/login">LOG OUT</NavLink>) : ( <NavLink className="nav-link" to="/login">LOG IN</NavLink>)}
        </li>  
        </ul>
    </div>
  </div>
</nav>
    )
}

export default Navbar
