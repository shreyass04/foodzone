import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const linkClass = ({ isActive }) =>
    `font-medium transition ${isActive ? 'text-white underline underline-offset-8' : 'text-blue-100 hover:text-white'}`

  return (
    <nav className="sticky top-0 z-10 bg-gradient-to-r from-blue-700 to-cyan-500 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white">
          🍽️ FoodZone
          <span className="rounded-full bg-lime-100 px-2 py-0.5 text-xs font-semibold text-lime-700">
            Pure Veg
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>Menu</NavLink>
          {user && <NavLink to="/orders" className={linkClass}>Orders</NavLink>}
          {user?.role === 'ADMIN' && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
          {user ? (
            <>
              <span className="hidden font-medium text-blue-100 sm:inline">Hi, {user.name}</span>
              <button
                onClick={() => { logout(); navigate('/login') }}
                className="font-medium text-blue-100 transition hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/signup" className={linkClass}>Sign up</NavLink>
            </>
          )}
          <NavLink to="/cart" className="relative rounded-full bg-white px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-50">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-800 text-xs text-white">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}