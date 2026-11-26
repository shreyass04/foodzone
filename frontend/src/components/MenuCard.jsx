import { useState } from 'react'
import { useCart } from '../context/CartContext'

const EMOJI = {
  'Main Course': '🍛',
  Breakfast: '🥞',
  Starters: '🥗',
  Desserts: '🍰',
  Drinks: '🥤',
}

export default function MenuCard({ item }) {
  const { addToCart } = useCart()
  const [broken, setBroken] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      {item.imageUrl && !broken ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          onError={() => setBroken(true)}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 items-center justify-center bg-orange-100 text-6xl">
          {EMOJI[item.category] || '🍽️'}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
        <p className="mt-1 h-10 text-sm text-slate-500">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-extrabold text-orange-500">₹{item.price}</span>
          <button
            onClick={() => addToCart(item)}
            disabled={!item.available}
            className="rounded-full bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:bg-slate-300"
          >
            {item.available ? 'Add +' : 'Sold out'}
          </button>
        </div>
      </div>
    </div>
  )
}