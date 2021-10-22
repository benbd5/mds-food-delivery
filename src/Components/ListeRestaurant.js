import React from 'react'

import RestaurantListItem from './RestaurantListItem'
import './styles/Restaurants.css'

class ListeRestaurant extends React.Component {
  render () {
    if (!this.props.restau || this.props.restau.length < 1) {
      return (
        <p>Aucun restaurant</p>
      )
    }
    return (
      <div className='restau'>
        {this.props.restau.map((restau) => {
          return <RestaurantListItem {...this.props} key={restau._id} restau={restau} />
        })}
      </div>
    )
  }
}

export default ListeRestaurant
