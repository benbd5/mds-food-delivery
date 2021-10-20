import { useState } from 'react'

// On extrait submit et error en paramètres depuis Auth.js (au lieu de faire props.error etc)
const LoginForm = ({ submit, error }) => {
  const [email, setEmail] = useState('test3@test.fr')
  const [password, setPassword] = useState('12345678')

  const handleSubmit = (e) => {
    e.preventDefault()
    submit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        Email
        <input
          type='text'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </label>
      <br />
      <label>
        Mot de passe :
        <input
          type='password'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
      </label>
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
