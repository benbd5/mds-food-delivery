import { useState, useEffect } from 'react'
import LoginForm from '../Components/LoginForm'
import RegisterForm from '../Components/RegisterForm'
import UserInfo from '../Components/UserInfo'

import { getProfile, register } from '../services/api'

import { actionTypes, loginUser, useAuth } from '../contexts/AuthContext'

// Composant sous forme de fonction
// Nouvelle méthode
function Auth () {
  // Initialisation des états locaux
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [profil, setProfil] = useState(null)

  const { dispatch, state: { error, user, loading } } = useAuth()

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  // Soumission du formulaire
  // infos car on reçoit l'objet avec email, password, etc depuis Register/LoginForm.js
  const handleSubmit = async (infos) => {
    let data

    // Appel de la fonction d'API login
    if (isRegister) {
      data = await register(infos)
    } else {
      await loginUser(infos, dispatch)
    }
  }

  const handleLoadProfile = async () => {
    const profile = await getProfile()
    setProfil(profile)
  }

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT
    })
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
              >
                {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
              </a>
            </div>
            )
      }
      <button onClick={handleLoadProfile}>Load Profile</button>
      <p>{profil && JSON.stringify(profil)}</p>
    </div>
  )
}

export default Auth
