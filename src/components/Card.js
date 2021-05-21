import React from 'react'

export default function Card({ cityName, windSpeed, windDirection, Humidity }) {
  return (
    <div className="card">
      <div className="card-image">
        <img href={"https://www.metaweather.com/static/img/weather/png/sn.png"} alt={`View of current weather state in ${cityName}`}/>
      </div>
      <div className="card-content">
        <h2>{cityName}</h2>
      </div>
      <div className="content">
        <p>Wind speed: {windSpeed.toFixed(0)} mph</p>
        <p>Wind direction: {windDirection} degrees</p>
        <p>Humidity: {Humidity}%</p>
      </div>
    </div>
  )
}