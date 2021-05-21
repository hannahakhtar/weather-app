import React from 'react'

export default function Card({ imageLink, cityName, windSpeed, windDirection, windCompass, Humidity, Visibility, airPressure, minTemp, maxTemp }) {
  return (
    <div className="card">
      <div className="card-image">
        <img href={imageLink} alt={`View of current weather state in ${cityName}`} />
      </div>
      <div className="card-content">
        <h2>{cityName}</h2>
      </div>
      <div className="content">
        <p>Wind speed: {windSpeed.toFixed(0)} mph</p>
        <p>Wind direction: {windDirection.toFixed(0)} degrees {windCompass}</p>
        <p>Humidity: {Humidity}%</p>
        <p>Visibility: {Visibility.toFixed(0)} miles</p>
        <p>Air Pressure: {airPressure.toFixed(0)} mbar</p>
        <p>Temperature range (min-max): {minTemp.toFixed(0)} - {maxTemp.toFixed(0)} degrees</p>
      </div>
    </div>
  )
}