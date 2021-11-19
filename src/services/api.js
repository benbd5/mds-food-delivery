import axios from 'axios'

const api = axios.create({
  baseURL: 'https://whispering-cliffs-44835.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// const old_getRestaurants = async () => {
//   const response = await window.fetch('https://strapi.myidea.fr/restaurants')
//   const result = await response.json()
//   return result
// }

// Credentials = paramètres d'auth (email, passwd)
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const register = async (RegisterInfos) => {
  try {
    const response = await api.post('/auth/register', RegisterInfos)

    // Sauvegarde du token dans le localStorage
    if (response.data && response.data.token) {
      window.localStorage.setItem('token', response.data.token)
    }
    return {
      error: null,
      data: response.data
    }
  } catch (error) {
    console.error(error)
    return {
      error: error,
      data: null
    }
  }
}

const getProfile = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (token) {
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants')
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getDishesByRestaurant = async (restaurantId) => {
  try {
    const response = await api.get(`/dishes?id=${restaurantId}`)
    return (response.data)
  } catch (error) {
    console.error(error)
  }
}

const createPaymentSession = async (cart, formData) => {
  try {
    const response = await api.post('/payment/create-session', { order: { cart, formData } })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createOrder = async (user, cart) => {
  try {
    // On recompose un tableau contenant les ID des plats du panier pour respecter le format de l'api
    const _cart = cart.map(item => item.dish._id)
    const response = await api.post('/order', { user, cart: _cart })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  login,
  register,
  getProfile,
  getRestaurants,
  getDishesByRestaurant,
  createPaymentSession,
  createOrder
}
