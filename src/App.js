import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css'
import Header from './Components/Header'
import Restaurants from './Pages/Restaurants'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Restaurant from './Pages/Restaurant'
import Order from './Pages/Order'
import Cart from './Components/Cart'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <CartProvider>
            <AuthProvider>
              <Header />
              <Cart />
              <Switch>
                <Route path='/cancel'>
                  <Cancel />
                </Route>
                <Route path='/success'>
                  <Success />
                </Route>
                <Route path='/order'>
                  <Order />
                </Route>
                <Route path='/auth'>
                  <Auth />
                </Route>
                <Route path='/restaurant/:id'>
                  <Restaurant />
                </Route>
                <Route path='/restaurants'>
                  <Restaurants />
                </Route>
                <Route path='/'>
                  <Home />
                </Route>
              </Switch>
            </AuthProvider>
          </CartProvider>
        </Router>
      </div>
    )
  }
}

export default App
