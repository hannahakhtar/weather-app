import React, { useState } from 'react'
import axios from 'axios'

import Navbar from '../components/Navbar'

export default function Search() {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [userSubmitted, setUserSubmitted] = useState(false)
  // const [woeid, setWoeid] = useState

  async function handleSubmit() {
    const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/metaweather.com/api/location/search/?query=${search}`)
    console.log(data)
    setSearchResults(data)
    setUserSubmitted(true)
  }

  let results
  if (searchResults.length === 0 && userSubmitted) {
    results = <p>No results - search again?</p>
  } else if (searchResults.length === 1 && userSubmitted) {
    results = <>
      <p>1 result</p>
      <p>{searchResults[0].title}</p>
    </>
  } else if (searchResults.length > 1 && userSubmitted) {
    results = <>
      <p>more than one result</p>
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