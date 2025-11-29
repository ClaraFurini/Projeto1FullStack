import { useEffect, useState } from 'react'

const normalizePath = (hash) => {
  const path = hash?.replace('#', '') || '/'
  if (!path.startsWith('/')) return `/${path}`
  return path || '/'
}

export function useHashRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setPath(normalizePath(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (to) => {
    const target = to.startsWith('/') ? to : `/${to}`
    if (normalizePath(window.location.hash) !== target) {
      window.location.hash = target
    }
  }

  return { path, navigate }
}
