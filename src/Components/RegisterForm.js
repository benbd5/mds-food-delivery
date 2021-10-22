import { useState } from 'react'
import TextInput from './TextInput'

function RegisterForm({ submit, error }) {
  // Stockage des données du formulaire
  // On déclare un état pour tous les champs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
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
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <TextInput
          label='Nom'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextInput
          label='Prénom'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          label='Mot de passe'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <TextInput
          label='Téléphone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
        />
        <input type='submit' value='Sinscrire' className='submit' />
      </form>
    </div>
  )
}

export default RegisterForm
