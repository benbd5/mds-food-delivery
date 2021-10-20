import React from 'react'

import './styles/Restaurants.css'

class Restaurant extends React.Component {
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
      <div className='card-restaurants'>
        {restau.Photos &&
          <img src={`https://strapi.myidea.fr/${restau.Photos[0].url}`} alt='restaurant' />}
        <h3 className='title-restaurant'>{restau.name}</h3>
        <p className='content-restaurant'>{restau.description}</p>
      </div>
    )
  }
}

export default Restaurant
