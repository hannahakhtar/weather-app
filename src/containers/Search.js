import React, { useState, useEffect } from 'react'
import Switch from "react-switch"
import axios from 'axios'
import moment from 'moment'

import Loader from "react-loader-spinner"
import DatePicker from "react-datepicker"

import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Search() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allLocationData, setAllLocationData] = useState({})
  const [userSubmitted, setUserSubmitted] = useState(false)

  // card state
  const [woeid, setWoeid] = useState('')
  const [displayCard, setDisplayCard] = useState(false)
  const [tempScale, setTempScale] = useState('celsius')
  const [applicableDate, setApplicableDate] = useState('')
  const [minTemp, setMinTemp] = useState('')
  const [maxTemp, setMaxTemp] = useState('')
  const [checked, setChecked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  // date picker state
  const [date, setDate] = useState(new Date())
  const [dateForFetch, setDateForFetch] = useState('')

  async function handleSubmit() {
    setLoading(true)
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/search/?query=${search}`)
    setSearchResults(data)
    setUserSubmitted(true)
    if (data.length === 0 || data.length > 1) {
      setLoading(false)
    }
    if (data.length === 1) {
      setWoeid(data[0].woeid)
    }
  }

  async function handleDateSubmit() {
    // setLoading(true)
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/${woeid}/${dateForFetch}/`)
    console.log(data)
  }


  useEffect(() => {
    async function fetchAllLocationData() {
      const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/${woeid}`)
      setAllLocationData(data)
      setApplicableDate(moment(data.consolidated_weather[0].applicable_date).format('DD/MM/YYYY'))
      setMinTemp(data.consolidated_weather[0].min_temp)
      setMaxTemp(data.consolidated_weather[0].max_temp)
      setDisplayCard(true)
      setLoading(false)
    }
    fetchAllLocationData()
  }, [woeid])


  function handleTemperatureToggle() {
    if (tempScale === 'celsius') {
      setTempScale('fahrenheit')
      setChecked(true)
      convertMinTempToFahrenheit(minTemp)
      convertMaxTempToFahrenheit(maxTemp)
    } else {
      setTempScale('celsius')
      setChecked(false)
      convertMinTempToCelsius(minTemp)
      convertMaxTempToCelsius(maxTemp)
    }
  }

  function convertMinTempToFahrenheit(temp) {
    const conversion = (temp * (9 / 5) + 32)
    setMinTemp(conversion)
  }

  function convertMaxTempToFahrenheit(temp) {
    const conversion = (temp * (9 / 5) + 32)
    setMaxTemp(conversion)
  }

  function convertMinTempToCelsius(temp) {
    const conversion = ((temp - 32) * 5 / 9)
    setMinTemp(conversion)
  }

  function convertMaxTempToCelsius(temp) {
    const conversion = ((temp - 32) * 5 / 9)
    setMaxTemp(conversion)
  }

  if (loading) {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      // timeout={2000} //3 secs
      />
    )
  }

  function onInputChange(e) {
    setSearch(e)
    if (e.length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function handleDateChange(date) {
    setDate(date)
    setDateForFetch((moment(date).format('YYYY/MM/DD')))
    console.log(moment(date).format('YYYY/MM/DD'))
  }

  let results

  if (searchResults.length === 0 && userSubmitted) {
    results = <p>No results - search again?</p>
  } else if (allLocationData && userSubmitted && displayCard) {
    results = <>
      <Card
        weatherStateAbbreviation={allLocationData.consolidated_weather[0].weather_state_abbr}
        cityName={allLocationData.title}
        date={applicableDate}
        windSpeed={allLocationData.consolidated_weather[0].wind_speed}
        windDirection={allLocationData.consolidated_weather[0].wind_direction}
        windCompass={allLocationData.consolidated_weather[0].wind_direction_compass}
        Humidity={allLocationData.consolidated_weather[0].humidity}
        Visibility={allLocationData.consolidated_weather[0].visibility}
        airPressure={allLocationData.consolidated_weather[0].air_pressure}
        minTemp={minTemp}
        maxTemp={maxTemp}
        tempScale={tempScale}

      />
    </>
  } else if (searchResults.length > 1 && userSubmitted) {
    results = <>
      {searchResults.map((result, index) => {
        return <div key={index}>
          <p>{result.title}</p>
        </div>
      })}
    </>
  }


  return (
    <>
      <Navbar />
      <h1>Search</h1>
      <input className="input" type="text" placeholder="Search here" onChange={(e) => onInputChange(e.target.value)} />
      <button className="submit" onClick={handleSubmit} disabled={isDisabled}>Search</button>
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
      {results}
      <DatePicker
        selected={date}
        onChange={(date) => handleDateChange(date)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        maxDate={addDays(new Date(), 5)}
      // onSelect={handleDateSelect}        
      />
      <button className="submit" onClick={handleDateSubmit}>Let's Go!</button>
    </>
  )
}