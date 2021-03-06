/**
 * 1) Ecrire le contexte
 * - actionTypes: ADD_ITEM_TO_CARD, ROMVE_ITEM_FROM_CARD (ajout et suppresion du tableau)
 * - Etat initial: cart = array
 * 2) Brancher le contexte sur les plats et sur le composant Cart
 * - Ajouter le CART PROVIDER dans le App.js
 */
import React, { useEffect } from 'react'

// Création du contexte
const CartContext = React.createContext()

// Création des actionTypes
const actionTypes = {
  ADD_ITEM_TO_CARD: 'ADD_ITEM_TO_CARD',
  REMOVE_ITEM_FROM_CARD: 'REMOVE_ITEM_FROM_CARD',
  RESET_CART: 'RESET_CART'
}

// Etat inital
const initalState = JSON.parse(window.localStorage.getItem('CART')) || {
  cart: [],
  total: 0
}

const CartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CARD:

      // Si mon élément est déjà présent dans mon panier, j'incrémente la quantité
      if (state.cart.some(item => item.dish._id === action.data._id)) {
        return {
          ...state,
          // Ici l'utilisation de map() permet de conserver la pureté du reducer car elle retourne un nouveau tableau contrairement à slice() qui shadow copy
          cart: state.cart.map(item => {
            // Je récupère l'élément à modifier
            if (item.dish._id === action.data._id) {
              // Je mets à jour la quantité
              return { ...item, quantity: item.quantity + 1 }
            } else {
              // On retourne les items concernés par le changement de quantité
              return item
            }
          }),
          // Calcul du total du panier, si le panier contient des items on les additionne avec la méthode array.reduce()
          // Sinon, on retourne le prix du produit courant
          total: state.cart.length > 0
            ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), action.data.price)
            : action.data.price
        }
      } else {
        // On ajoute l'item et on retourne un nouvel état
        // ...state = on conserve l'état courant
        // On concatène le tableau de l'état courant avec notre item à ajouter
        return {
          ...state,
          cart: state.cart.concat([{ dish: action.data, quantity: 1 }]),
          total: state.cart.length > 0
            ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), action.data.price)
            : action.data.price
        }
      }

    case actionTypes.REMOVE_ITEM_FROM_CARD:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.dish._id === action.data.dish._id) {
            return {
              ...item, quantity: item.quantity - 1
            }
          } else {
            return item
          }
        }).filter(item => item.quantity > 0), // Le filter retourne tout ce qui ce correspond à une quantité > 0 (retire les éléments dont quantité < 1)
        total: state.cart.length > 0
          ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), -action.data.dish.price)
          : 0
      }

    case actionTypes.RESET_CART:
      window.localStorage.removeItem('CART')
      return { cart: [], total: 0 }

    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

// Composant Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CartReducer, initalState)

  useEffect(() => {
    window.localStorage.setItem('CART', JSON.stringify(state))
  }, [state])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = React.useContext((CartContext))
  if (!context) {
    throw new Error('userCart must be used inside a CartProvider')
  }
  return context
}

export {
  CartProvider,
  useCart,
  actionTypes
}
