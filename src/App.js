import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './containers/Home'
import Search from './containers/Search'

import './App.scss'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/weather-app" component={Home} />
          <Route exact path="/weather-app/search" component={Search} />
          <Redirect to="/quiz/not-found" />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
