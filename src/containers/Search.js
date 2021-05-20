import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function Search() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allLocaationData, setAllLocationData] = useState({})
  const [userSubmitted, setUserSubmitted] = useState(false)
  const [woeid, setWoeid] = useState('')

  // * whilst API call is being made for all the details - have a loader so set loader to true when first API call and set to false at the end

  async function handleSubmit() {
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/search/?query=${search}`)
    setSearchResults(data)
    if (data.length >= 1) {
      setWoeid(data[0].woeid)
    }
    setUserSubmitted(true)
  }

  useEffect(() => {
    fetchAllLocationData()
  },[ woeid ])

  async function fetchAllLocationData() {
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/44418`)
    setAllLocationData(data)
  }

  let results
  if (searchResults.length === 0 && userSubmitted) {
    results = <p>No results - search again?</p>
  } else if (allLocaationData && userSubmitted) {
    results = <>
      <p>1 result</p>
      <Card
        weatherStateAbbreviation={allLocaationData.consolidated_weather[0].weather_state_abbr}
        cityName={allLocaationData.title}
        windSpeed={allLocaationData.consolidated_weather[0].wind_speed}
        windDirection={allLocaationData.consolidated_weather[0].wind_direction}
        Humidity={allLocaationData.consolidated_weather[0].humidity}
      />
    </>
  } else if (searchResults.length > 1 && userSubmitted) {
    results = <>
      <p>More than one result</p>
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
      <h1>Search! 🌞</h1>
      <input className="input" type="text" placeholder="Search here" onChange={(e) => setSearch(e.target.value)} />
      <button className="submit" onClick={handleSubmit}>Search</button>
      {results}
    </>
  )
}