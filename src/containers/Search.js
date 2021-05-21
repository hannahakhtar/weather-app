import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Loader from "react-loader-spinner"

import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Search() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allLocationData, setAllLocationData] = useState({})
  const [userSubmitted, setUserSubmitted] = useState(false)
  const [woeid, setWoeid] = useState('')
  const [displayCard, setDisplayCard] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/search/?query=${search}`)
    console.log(data)
    setSearchResults(data)
    setUserSubmitted(true)
    if (data.length === 0) {
      setLoading(false)
    }
    if (data.length === 1) {
      setWoeid(data[0].woeid)
    }
  }

  useEffect(() => {
    async function fetchAllLocationData() {
      const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/${woeid}`)
      setAllLocationData(data)
      console.log(data)
      setDisplayCard(true)
      setLoading(false)
    }
    fetchAllLocationData()
  }, [woeid])

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

  let results

  if (searchResults.length === 0 && userSubmitted) {
    results = <p>No results - search again?</p>
  } else if (allLocationData && userSubmitted && displayCard) {
    results = <>
      <Card
        weatherStateAbbreviation={`https://www.metaweather.com/static/img/weather/png/${allLocationData.consolidated_weather[0].weather_state_abbr}.png`}
        cityName={allLocationData.title}
        windSpeed={allLocationData.consolidated_weather[0].wind_speed}
        windDirection={allLocationData.consolidated_weather[0].wind_direction}
        windCompass={allLocationData.consolidated_weather[0].wind_direction_compass}
        Humidity={allLocationData.consolidated_weather[0].humidity}
        Visibility={allLocationData.consolidated_weather[0].visibility}
        airPressure={allLocationData.consolidated_weather[0].air_pressure}
        minTemp={allLocationData.consolidated_weather[0].min_temp}
        maxTemp={allLocationData.consolidated_weather[0].max_temp}
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
      <input className="input" type="text" placeholder="Search here" onChange={(e) => setSearch(e.target.value)} />
      <button className="submit" onClick={handleSubmit}>Search</button>
      {results}
    </>
  )
}