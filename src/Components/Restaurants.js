import React from 'react';

class Restaurants extends React.Component {
  render() {
    if(!this.props.restau){
      return (
        <p>Pas de données</p>
      )
    }
    return (
      <div className="card-restaurants">
        <h3 className="title-restaurant">{this.props.restau.title}</h3>
        <p className="content-restaurant">{this.props.restau.description}</p>
      </div>
    );
  }
}

export default Restaurants;
