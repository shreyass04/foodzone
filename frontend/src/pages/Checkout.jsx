import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../api/api'

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-stone-800">Nothing to checkout</h2>
        <Link to="/" className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-2 font-semibold text-white">
          Browse menu
        </Link>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError('')
    try {
      await placeOrder(cart.map((c) => ({ menuItemId: c.id, quantity: c.quantity })))
      clearCart()
      navigate('/orders')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-stone-800">Checkout</h1>
      <div className="rounded-2xl bg-white p-5 shadow-md">
        <h2 className="mb-3 text-lg font-bold text-stone-800">Order summary</h2>
        {cart.map((c) => (
          <div key={c.id} className="flex justify-between border-b border-stone-100 py-2 text-stone-600">
            <span>{c.name} × {c.quantity}</span>
            <span className="font-semibold">₹{c.price * c.quantity}</span>
          </div>
        ))}
        <div className="mt-4 flex justify-between text-xl font-extrabold text-stone-800">
          <span>Total</span>
          <span className="text-orange-500">₹{totalPrice}</span>
        </div>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-orange-500 py-3 text-lg font-semibold text-white transition hover:bg-orange-600 disabled:bg-stone-300"
      >
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  )
}