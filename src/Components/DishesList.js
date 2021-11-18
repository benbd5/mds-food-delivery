import DishListItem from './DishListItem'

function DishesList ({ dishes }) {
  if (!dishes || dishes.length < 1) {
    return (
      <p>Aucun plat</p>
    )
  }

  return (
    <div className='restau'>
      {dishes.map(dish => {
        return <DishListItem {...dishes} key={dish._id} dishes={dish} />
      })}
    </div>
  )
}

export default DishesList
