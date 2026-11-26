import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { saveUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      saveUser(await login(email, password))
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const input = 'w-full rounded-xl border border-stone-200 px-4 py-2 outline-none focus:border-orange-500'

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-extrabold text-stone-800">Welcome back 👋</h1>
        <input className={input} type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input className={input} type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full rounded-full bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600">
          Log in
        </button>
        <p className="text-center text-stone-500">
          New here? <Link to="/signup" className="font-semibold text-orange-500">Sign up</Link>
        </p>
      </form>
    </div>
  )
}