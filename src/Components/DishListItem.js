import React from 'react'
import { useCart, actionTypes } from '../contexts/CartContext'

function DishListItem ({ dishes }) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_ITEM_TO_CARD,
      data: dishes
    })
  }

  if (!dishes) {
    return (
      <p>No dishes</p>
    )
  }
  return (
    <div className='card-restaurants'>
      <h3 className='title-restaurant'>{dishes.title}</h3>
      <p className='content-restaurant'>{dishes.description}</p>
      <p className='content-restaurant'>Prix : {dishes.price}€</p>
      <p className='content-restaurant'>{dishes.category}</p>
      <p className='content-restaurant'>{dishes.restaurant}</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  )
}

export default DishListItem
