import Draggable from 'react-draggable'
import { Link, useLocation } from 'react-router-dom'
import { actionTypes, useCart } from '../contexts/CartContext'

import './styles/Cart.css'

function Cart () {
  const { state: { cart, total }, dispatch } = useCart()
  const location = useLocation()

  const removeItem = (item) => {
    dispatch({
      type: actionTypes.REMOVE_ITEM_FROM_CARD,
      data: item
    })
  }

  // On affiche pas le panier sur la page commande
  if (location.pathname.includes('order')) {
    return null
  }
  return (
    <Draggable>
      <div className='cart-container'>
        <h2>Votre commande</h2>
        {
          cart.map(item => {
            return (
              <div key={item.dish._id}>
                <h4>{item.dish.title}</h4>
                <p>{item.dish.price.toFixed(2)}  €</p>
                <p>{item.quantity}</p>
                <button onClick={() => removeItem(item)}>X</button>
              </div>
            )
          })
        }
        <h4>Total : {total} €</h4>
        <Link to='/order'>
          <button>
            Passer la commande
          </button>
        </Link>
      </div>
    </Draggable>
  )
}

export default Cart
