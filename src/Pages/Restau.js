import React from 'react';

import '../App.css';
import ListeRestaurant from '../Components/ListeRestaurant';
import { getRestaurants } from '../services/api'

class Restau extends React.Component {
  constructor(props){
    super(props);
    // Etat :
    this.state = {
      restau: [],
    }
  }

   // Actualise la data toutes les 0.5s
   componentDidMount(){
    this.timer = setInterval(() => {
      this.getData();
    }, 500)
  }

  // clearInterval va toujours avec setInterval
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getData = async () => {
    const restau = await getRestaurants()
    this.setState({restau});
  }

  render() {
    return (
      <div>
        <ListeRestaurant 
          restau={this.state.restau}
        />
      </div>
    );
  }
}

export default Restau;
