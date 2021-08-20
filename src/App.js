import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './containers/Home'
import Search from './containers/Search'
import FiveDay from './containers/FiveDay'

import './App.scss'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/weather-app" component={Home} />
          <Route exact path="/weather-app/search" component={Search} />
          <Route exact path="/weather-app/five-day-forecast" component={FiveDay} />
          <Redirect to="/weather-app/not-found" />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
