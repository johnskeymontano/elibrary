const BASE = (import.meta.env.VITE_API_BASE || "http://localhost:5000")

export async function fetchBooks(){
  const res = await fetch(`${BASE}/api/books`)
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch books`)
  return res.json()
}

export async function fetchUsers(){
  const res = await fetch(`${BASE}/api/users`)
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch users`)
  return res.json()
}

export async function createBook(data){
  const res = await fetch(`${BASE}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to create book`)
  return res.json()
}

export async function createUser(data){
  const res = await fetch(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to create user`)
  return res.json()
}

export async function registerUser(data){
  const res = await fetch(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Registration failed")
  }
  return res.json()
}

export async function loginUser(data){
  const res = await fetch(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Login failed")
  }
  return res.json()
}
