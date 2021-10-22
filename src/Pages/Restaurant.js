/**
 * Créer une page restaurant qui affiche les détails d'un restaurant
 * La page doit également afficher la liste des plats (Dish)
 * - créer l'appel d'API pour récupérer les plats d'un restaurant
 * - créer un composant liste de plats (DishesList)
 * - créer un composant d'éléments de liste de plat (DishListItem)
 */

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DishesList from '../Components/DishesList'
import { getDishesByRestaurant } from '../services/api'

function Restaurant () {
  const [dishes, setDishes] = useState([])
  const { id } = useParams()

  const getData = async () => {
    const dishes = await getDishesByRestaurant(id)
    setDishes(dishes)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <DishesList dishes={dishes} />
      {/* <pre>{JSON.stringify(dishes)}</pre> */}
    </div>
  )
}

export default Restaurant
