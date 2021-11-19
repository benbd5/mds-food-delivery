import { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { createOrder } from '../services/api'

function Success () {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const { state: { cart } } = useCart()

  if (cart.length > 0) {
    // Vider le panier
  }

  useEffect(() => {
    const sendOrder = async () => {
      const user = JSON.parse(window.localStorage.getItem('ORDER_USER'))
      const result = await createOrder(user, cart)
      console.log(result)
      if (result && result._id) {
        setOrder(result)
        setLoading(false)
      }
    }
    sendOrder()
  }, [])

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
