import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Card from '../components/Card'

// ? need loader for loading state

export default function Search() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allLocationData, setAllLocationData] = useState({})
  const [userSubmitted, setUserSubmitted] = useState(false)
  const [woeid, setWoeid] = useState('')
  const [displayCard, setDisplayCard] = useState(false)

  async function handleSubmit() {
    const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/search/?query=${search}`)
    setSearchResults(data)
    setUserSubmitted(true)
    if (data.length === 1) {
      setWoeid(data[0].woeid)
    }
    if (data.length > 1) {
      setDisplayCard(false)
    }
  }

  useEffect(() => {
    async function fetchAllLocationData() {
        const { data } = await axios.get(`https://stormy-atoll-29846.herokuapp.com/metaweather.com/api/location/${woeid}`)
        setAllLocationData(data)
        setDisplayCard(true)
    }
    fetchAllLocationData()

  }, [woeid])

  let results
  if (searchResults.length === 0 && userSubmitted) {
    results = <p>No results - search again?</p>
  } else if (allLocationData && userSubmitted && displayCard) {
    results = <>
      <Card
      // ? image isn't working
        weatherStateAbbreviation={allLocationData.consolidated_weather[0].weather_state_abbr}
        cityName={allLocationData.title}
        windSpeed={allLocationData.consolidated_weather[0].wind_speed}
        windDirection={allLocationData.consolidated_weather[0].wind_direction}
        Humidity={allLocationData.consolidated_weather[0].humidity}
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
      <h1>Search! 🌞</h1>
      <input className="input" type="text" placeholder="Search here" onChange={(e) => setSearch(e.target.value)} />
      <button className="submit" onClick={handleSubmit}>Search</button>
      {results}
    </>
  )
}