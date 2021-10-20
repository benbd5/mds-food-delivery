import { useState, useEffect } from 'react'
import LoginForm from '../Components/LoginForm'
import RegisterForm from '../Components/RegisterForm'
import UserInfo from '../Components/UserInfo'

import { login, register } from '../services/api'

// Composant sous forme de fonction
// Nouvelle méthode
function Auth () {
  // Initialisation des états locaux

  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  // Appelé à chaque montage dans le DOM
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  // Soumission du formulaire
  // infos car on reçoit l'objet avec email, password, etc depuis Register/LoginForm.js
  const handleSubmit = async (infos) => {
    let data

    // Appel de la fonction d'API login
    if (isRegister) {
      data = await register(infos)
    } else {
      data = await login(infos)
    }

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
          : (
            <div>
              {
                isRegister
                  ? <RegisterForm
                      submit={handleSubmit}
                      error={error}
                    />
                  : <LoginForm
                      submit={handleSubmit}
                      error={error}
                    />
              }
              <a
                href='#'
                onClick={() => setIsRegister(!isRegister)}
                className='isRegister'
              >
                {isRegister ? 'J\'ai déjà un compte' : 'Je n\'ai pas de compte'}

              </a>
            </div>
            )
      }
    </div>
  )
}

export default Auth
