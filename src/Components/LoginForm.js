import { useState } from 'react'
import TextInput from './TextInput'

// On extrait submit et error en paramètres depuis Auth.js (au lieu de faire props.error etc)
const LoginForm = ({ submit, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Gestion de la saisie formulaire
  const handleChange = (e) => {
    setFormData({
      // Conserver les autres saisies de champs
      ...formData,
      // Champ modifié ou ajouté
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <TextInput
        type='email'
        label='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <TextInput
        type='password'
        label='Password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <input type='submit' value='Se connecter' />
      {
        error &&
        (
          <div>
            <h4>Identifiants invalides</h4>
          </div>
        )
      }
    </form>
  )
}

export default LoginForm
