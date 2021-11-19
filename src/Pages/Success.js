import { useState, useEffect } from 'react'
import { useCart, actionTypes } from '../contexts/CartContext'
import { createOrder } from '../services/api'

function Success() {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const { state: { cart }, dispatch } = useCart()

  useEffect(() => {
    const sendOrder = async () => {
      const user = JSON.parse(window.localStorage.getItem('ORDER_USER'))
      const result = await createOrder(user, cart)
      console.log(result)
      if (result && result._id) {
        setOrder(result)
        if (cart.length > 0) {
          // Vider le panier
          dispatch({ type: actionTypes.RESET_CART })
          window.localStorage.removeItem('ORDER_USER')
        }
        setLoading(false)
      }
    }

    if (window.localStorage.getItem('ORDER_USER')) {
      sendOrder()
    }
  }, [])

  if (!window.localStorage.getItem('ORDER_USER') && !order) {
    return <h1>Aucune commande en cours</h1>
  }

  if (loading) {
    return <h>Chargement ...</h>
  }
  return (
    <div>
      <h1>Votre commande a été passé avec succès</h1>
      <p>ID de commande : {order && order._id}</p>
    </div>
  )
}

export default Success
