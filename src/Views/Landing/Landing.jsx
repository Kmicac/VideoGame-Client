import React from 'react'
import { Link } from 'react-router-dom'
import '../Landing/landing.css';
import Logo from '../image/330942.png'



const Landing = () => {
  return (
    <div className="landingPage">
      <div>
      <h1>Welcome to Video Games App</h1>
      </div>
      <div>
      <button className="btn_init">
        <Link to="/home" >HOME</Link>
      </button>
      </div>
      <picture className="logo">
        <img src={Logo} alt="Logo" />
      </picture>
    </div>
  )
}

export default Landing