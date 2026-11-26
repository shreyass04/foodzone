import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id)
      if (found) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    )
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id))
  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0)
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, changeQuantity, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}