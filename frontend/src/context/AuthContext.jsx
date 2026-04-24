import { createContext, useMemo, useState } from 'react'
import { loginWithRole } from '../services/authService'

const STORAGE_KEY = 'sri-sudha-auth'
const LANGUAGE_KEY = 'sri-sudha-language'

const AuthContext = createContext(null)

function getStoredAuth() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { user: null, token: null }
  }

  try {
    return JSON.parse(raw)
  } catch {
    return { user: null, token: null }
  }
}

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth()
  const [user, setUser] = useState(storedAuth.user)
  const [token, setToken] = useState(storedAuth.token)
  const [language, setLanguage] = useState(localStorage.getItem(LANGUAGE_KEY) || 'English')

  const isAuthenticated = Boolean(token && user)

  async function login(credentials) {
    const response = await loginWithRole(credentials)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response))
    return response
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateLanguage(value) {
    setLanguage(value)
    localStorage.setItem(LANGUAGE_KEY, value)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      language,
      login,
      logout,
      updateLanguage,
    }),
    [user, token, isAuthenticated, language],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
