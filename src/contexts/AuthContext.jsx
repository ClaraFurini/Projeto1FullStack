/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    try {
      setError('')
      const data = await apiFetch('/api/auth/me')
      setUser(data.user)
    } catch (err) {
      setUser(null)
      if (err?.message && !err.message.toLowerCase().includes('autenticação')) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, error, login, logout, register, refresh: fetchProfile }),
    [user, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
