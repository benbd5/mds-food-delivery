import { useState, useEffect } from 'react'
import LoginForm from '../Components/LoginForm'
import UserInfo from '../Components/UserInfo'

import { login } from '../services/api'

// Composant sous forme de fonction
// Nouvelle méthode
function Auth () {
  // Initialisation des états locaux

  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Appelé à chaque montage dans le DOM
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  // Soumission du formulaire
  // credentials car on reçoit l'objet avec email, password depuis LoginForm.js
  const handleSubmit = async (credentials) => {
    // Appel de la fonction d'API login
    const data = await login(credentials)

    if (data.error) {
      setError(data.error)
    } else {
      setError(null)
    }

    const token = window.localStorage.getItem('token')

    if (token) {
      setIsLoggedIn(true)
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    window.localStorage.removeItem('token', null)
  }

  return (
    <div>
      {
        isLoggedIn
          ? <UserInfo logout={logout} />
          : <LoginForm
              submit={handleSubmit}
              error={error}
            />
      }
    </div>
  )
}

export default Auth
