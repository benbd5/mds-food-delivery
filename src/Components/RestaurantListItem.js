import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Restaurants.css'

class RestaurantListItem extends React.Component {
  // getImageRestaurant() {
  //   this.props.restau.Photos[0].url;
  //   `https://strapi.myidea.fr/{id}/uploads/`
  // }

  render () {
    const { restau } = this.props
    if (!restau) {
      return (
        <p>Pas de données</p>
      )
    }
    return (
      <Link to={`/restaurant/${restau._id}`}>
        <div className='card-restaurants'>
          {
            restau.Photos &&
              <img src={`https://strapi.myidea.fr/${restau.Photos[0].url}`} alt='restaurant' />
          }
          <h3 className='title-restaurant'>{restau.name}</h3>
          <p className='content-restaurant'>{restau.description}</p>
        </div>
      </Link>

    )
  }
}

export default RestaurantListItem
