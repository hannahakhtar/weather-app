import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/weather-app/">🌞</Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to="/weather-app/"><div className="navbar-item">Home</div></Link>
            <Link to="/weather-app/search"><div className="navbar-item">Search</div></Link>
            <Link to="/weather-app/five-day-forecast"><div className="navbar-item">5 Day Forecast</div></Link>
          </div>
        </div>
        {/* <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </nav>
    </>
  )
}