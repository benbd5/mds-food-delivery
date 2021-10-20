import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css'
import Header from './Components/Header'
import Restau from './Pages/Restau'
import Home from './Pages/Home'
import Auth from './Pages/Auth'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <Header />
          <Switch>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/restaurants'>
              <Restau />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
