import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render () {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Accueil</Link>
            </li>
            <li>
              <Link to='/restaurants'>Restaurants</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header
