import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './components/Home'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/weather-app" component={Home} />
          <Redirect to="/quiz/not-found" />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
