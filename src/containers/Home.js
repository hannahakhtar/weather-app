import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <>
    <h1>Weather App! 🌞</h1>
    <Link to={{pathname: "/weather-app/search" }}>
      <button>Let's Go!</button>
    </Link>
    </>
  )
}

