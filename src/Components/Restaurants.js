import React from 'react'

import './styles/Restaurants.css'

class Restaurants extends React.Component {
  // getImageRestaurant() {
  //   this.props.restau.Photos[0].url;
  //   `https://strapi.myidea.fr/{id}/uploads/`
  // }

  render () {
    if (!this.props.restau) {
      return (
        <p>Pas de données</p>
      )
    }
    return (
      <div className='card-restaurants'>
        <img src={`https://strapi.myidea.fr/${this.props.restau.Photos[0].url}`} />
        <h3 className='title-restaurant'>{this.props.restau.title}</h3>
        <p className='content-restaurant'>{this.props.restau.description}</p>
      </div>
    )
  }
}

export default Restaurants
