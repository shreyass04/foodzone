import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, changeQuantity, removeFromCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="text-7xl">🛒</div>
        <h2 className="mt-4 text-2xl font-bold text-stone-800">Your cart is empty</h2>
        <p className="mt-1 text-stone-500">Add something tasty from the menu.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
        >
          Browse menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-stone-800">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
            <div>
              <h3 className="text-lg font-bold text-stone-800">{c.name}</h3>
              <p className="text-stone-500">₹{c.price} each</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full bg-orange-50 px-2 py-1">
                <button
                  onClick={() => changeQuantity(c.id, -1)}
                  className="h-8 w-8 rounded-full bg-white font-bold text-orange-500 shadow transition hover:bg-orange-100"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{c.quantity}</span>
                <button
                  onClick={() => changeQuantity(c.id, 1)}
                  className="h-8 w-8 rounded-full bg-white font-bold text-orange-500 shadow transition hover:bg-orange-100"
                >
                  +
                </button>
              </div>
              <span className="w-20 text-right text-lg font-extrabold text-stone-800">
                ₹{c.price * c.quantity}
              </span>
              <button
                onClick={() => removeFromCart(c.id)}
                className="text-xl text-stone-400 transition hover:text-red-500"
                title="Remove"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-md">
        <div>
          <p className="text-stone-500">Total</p>
          <p className="text-3xl font-extrabold text-orange-500">₹{totalPrice}</p>
        </div>
        <Link
          to="/checkout"
          className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-orange-600"
        >
          Checkout →
        </Link>
      </div>
    </div>
  )
}