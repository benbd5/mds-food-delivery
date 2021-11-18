import { useState } from 'react'
import OrderForm from '../Components/OrderForm'
import OrderResume from '../Components/OrderResume'
import { useCart } from '../contexts/CartContext'

function Order () {
  const { state: { cart, total } } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  return (
    <div>
      <OrderResume cart={cart} total={total} />
      <OrderForm data={formData} onChange={setFormData} />
    </div>
  )
}

export default Order
