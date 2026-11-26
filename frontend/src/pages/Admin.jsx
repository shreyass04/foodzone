import { useEffect, useState } from 'react'
import { getAllOrders, getMenu, saveMenuItem, updateOrderStatus } from '../api/api'

const NEXT = { PLACED: 'PREPARING', PREPARING: 'DELIVERED' }
const STATUS_STYLE = {
  PLACED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-yellow-100 text-yellow-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}
const EMPTY = { name: '', description: '', price: '', category: '', available: true }

export default function Admin() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [menu, setMenu] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const load = () => {
    getAllOrders().then(setOrders).catch((e) => setError(e.message))
    getMenu().then(setMenu).catch((e) => setError(e.message))
  }
  useEffect(load, [])

  const change = async (id, status) => {
    setError('')
    try {
      await updateOrderStatus(id, status)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const addItem = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await saveMenuItem({ ...form, price: Number(form.price) })
      setForm(EMPTY)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const toggle = async (item) => {
    await saveMenuItem({ ...item, available: !item.available })
    load()
  }

  const input = 'rounded-xl border border-stone-200 px-3 py-2 outline-none focus:border-orange-500'
  const tabBtn = (t) =>
    `rounded-full px-4 py-1.5 font-medium ${tab === t ? 'bg-orange-500 text-white' : 'bg-white text-stone-600'}`

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-extrabold text-stone-800">Admin Panel</h1>
      <div className="mb-6 flex gap-2">
        <button className={tabBtn('orders')} onClick={() => setTab('orders')}>Orders</button>
        <button className={tabBtn('menu')} onClick={() => setTab('menu')}>Menu</button>
      </div>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 && <p className="text-stone-500">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl bg-white p-5 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-800">Order #{o.id} · User {o.userId}</h3>
                  <p className="text-sm text-stone-500">{new Date(o.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLE[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <p className="mt-2 text-stone-600">
                {o.items.map((i) => `${i.menuItem?.name} × ${i.quantity}`).join(', ')}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-extrabold text-orange-500">₹{o.totalAmount}</span>
                <div className="flex gap-2">
                  {NEXT[o.status] && (
                    <button onClick={() => change(o.id, NEXT[o.status])}
                            className="rounded-full bg-orange-500 px-4 py-1.5 font-semibold text-white hover:bg-orange-600">
                      Mark {NEXT[o.status]}
                    </button>
                  )}
                  {NEXT[o.status] && (
                    <button onClick={() => change(o.id, 'CANCELLED')}
                            className="rounded-full bg-red-100 px-4 py-1.5 font-semibold text-red-700 hover:bg-red-200">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'menu' && (
        <div>
          <form onSubmit={addItem} className="mb-6 grid gap-3 rounded-2xl bg-white p-5 shadow-md sm:grid-cols-2">
            <input className={input} placeholder="Name" value={form.name} required
                   onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={input} placeholder="Category (e.g. Main Course)" value={form.category}
                   onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className={input} placeholder="Description" value={form.description}
                   onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className={input} type="number" placeholder="Price" value={form.price} required
                   onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <button className="rounded-full bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 sm:col-span-2">
              Add menu item
            </button>
          </form>
          <div className="space-y-3">
            {menu.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
                <div>
                  <h3 className="font-bold text-stone-800">{m.name}</h3>
                  <p className="text-sm text-stone-500">{m.category} · ₹{m.price}</p>
                </div>
                <button onClick={() => toggle(m)}
                        className={`rounded-full px-4 py-1.5 font-semibold ${m.available ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-500'}`}>
                  {m.available ? 'Available' : 'Sold out'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}