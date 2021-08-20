import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Switch from "react-switch"

// ! set logic so only allowed to access this link if state is passed. Otherwise, need to do something else.

export default function FiveDay({ location }) {

  console.log(location)
  // const [woeid, setWoeid] = useState(location.state.woeid)
  // const [search, setSearch] =  useState(location.state.search)
  const [checked, setChecked] = useState(location.state.checked)
  const [tempScale, setTempScale] = useState(location.state.tempScale)
  // const [locationData, setLocationData] = useState(location.state.allLocationData)

  function handleTemperatureToggle() {
    if (tempScale === 'celsius') {
      setTempScale('fahrenheit')
      setChecked(true)
      // convertMinTempToFahrenheit(minTemp)
      // convertMaxTempToFahrenheit(maxTemp)
    } else {
      setTempScale('celsius')
      setChecked(false)
      // convertMinTempToCelsius(minTemp)
      // convertMaxTempToCelsius(maxTemp)
    }
  }

  return (
    <>
      <Navbar />
      <h1>5 Day</h1>
      <label>
        <span>Celsius</span>
        <Switch
          checked={checked}
          onChange={handleTemperatureToggle}
          offColor="#0bfc03"
          onColor="#9e31a8"
          uncheckedIcon={false}
          checkedIcon={false}
        />
        <span>Fahrenheit</span>
      </label>
    </>
  )
}