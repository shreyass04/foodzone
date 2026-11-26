import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('auth'))
    } catch {
      return null
    }
  })

  const saveUser = (data) => {
    localStorage.setItem('auth', JSON.stringify(data))
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, saveUser, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}