import React from 'react'

export default function Card({ weatherStateAbbreviation, date, cityName, windSpeed, windDirection, windCompass, Humidity, Visibility, airPressure, minTemp, maxTemp, tempScale }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={`https://www.metaweather.com/static/img/weather/png/${weatherStateAbbreviation}.png`} alt={`View of current weather state in ${cityName}`} />
      </div>
      <div className="card-content">
        <h2>{cityName}</h2>
        <p>{date}</p>
      </div>
      <div className="content">
        <p>Wind speed: {windSpeed.toFixed(0)} mph</p>
        <p>Wind direction: {windDirection.toFixed(0)} degrees {windCompass}</p>
        <p>Humidity: {Humidity}%</p>
        <p>Visibility: {Visibility.toFixed(0)} miles</p>
        <p>Air Pressure: {airPressure.toFixed(0)} mbar</p>
        <p>Temperature range (min-max): {minTemp.toFixed(0)} - {maxTemp.toFixed(0)} degrees {tempScale}</p>
      </div>
    </div>
  )
}