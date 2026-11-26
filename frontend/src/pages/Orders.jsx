import { useEffect, useState } from 'react'
import { getOrders } from '../api/api'

const STATUS_STYLE = {
  PLACED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-yellow-100 text-yellow-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-8 text-center text-stone-500">Loading orders...</p>
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-stone-800">Order History</h1>
      {orders.length === 0 && <p className="text-stone-500">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl bg-white p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-800">Order #{o.id}</h3>
                <p className="text-sm text-stone-500">{new Date(o.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLE[o.status] || ''}`}>
                {o.status}
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-stone-600">
              {o.items.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.menuItem?.name} × {i.quantity}</span>
                  <span>₹{i.price * i.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-stone-100 pt-3 text-lg font-extrabold">
              <span>Total</span>
              <span className="text-orange-500">₹{o.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}