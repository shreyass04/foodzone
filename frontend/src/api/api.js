const BASE_URL = 'http://localhost:8081/api'

function authHeaders() {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}
  } catch {
    return {}
  }
}

async function authRequest(path, body) {
  const res = await fetch(`${BASE_URL}/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 401) throw new Error('Invalid email or password')
  if (res.status === 409) throw new Error('Email already registered')
  if (!res.ok) throw new Error('Something went wrong. Check your details.')
  return res.json()
}

export const login = (email, password) => authRequest('login', { email, password })
export const signup = (name, email, password) => authRequest('signup', { name, email, password })

export async function getMenu() {
  const res = await fetch(`${BASE_URL}/menu`)
  if (!res.ok) throw new Error('Failed to load menu')
  return res.json()
}

export async function placeOrder(items) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ items }),
  })
  if (res.status === 401) throw new Error('Please log in again')
  if (!res.ok) throw new Error('Failed to place order')
  return res.json()
}

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/orders`, { headers: authHeaders() })
  if (res.status === 401) throw new Error('Please log in again')
  if (!res.ok) throw new Error('Failed to load orders')
  return res.json()
}

export async function getAllOrders() {
  const res = await fetch(`${BASE_URL}/admin/orders`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to load orders')
  return res.json()
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${BASE_URL}/admin/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Status change not allowed')
  return res.json()
}

export async function saveMenuItem(item) {
  const res = await fetch(`${BASE_URL}/menu${item.id ? '/' + item.id : ''}`, {
    method: item.id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(item),
  })
  if (!res.ok) throw new Error('Failed to save item')
  return res.json()
}