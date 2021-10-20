const getRestaurants = async () => {
  const response = await window.fetch('https://strapi.myidea.fr/restaurants')
  const result = await response.json()
  return result
}

module.exports = {
  getRestaurants
}
