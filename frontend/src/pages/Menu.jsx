import { useEffect, useState } from 'react'
import { getMenu } from '../api/api'
import MenuCard from '../components/MenuCard'

export default function Menu() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMenu()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(items.map((i) => i.category).filter(Boolean))]
  const shown = category === 'All' ? items : items.filter((i) => i.category === category)

  if (loading) return <p className="p-8 text-center text-stone-500">Loading menu...</p>
  if (error) return <p className="p-8 text-center text-red-500">{error}. Is the backend running?</p>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 p-8 text-white shadow-lg">
              <h1 className="text-3xl font-extrabold sm:text-4xl">Fresh pure veg food, delivered hot 🌿</h1>
              <p className="mt-2 text-blue-50">Pick your favourites and order in a minute.</p>
            </div>
            <h2 className="mb-4 text-2xl font-extrabold text-slate-800">Our Menu</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 font-medium transition ${
              category === c ? 'bg-orange-500 text-white' : 'bg-white text-stone-600 hover:bg-orange-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}