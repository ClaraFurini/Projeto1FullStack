import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { SearchProvider } from './contexts/SearchContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import InsertPage from './pages/InsertPage'
import DatabasePage from './pages/DatabasePage'
import { useHashRoute } from './hooks/useHashRoute'

const ROUTES = {
  '/': LandingPage,
  '/login': LoginPage,
  '/buscar': SearchPage,
  '/cadastro': InsertPage,
  '/banco': DatabasePage,
}

function Navigation({ current, onNavigate }) {
  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/login', label: 'Login' },
    { path: '/buscar', label: 'Lista de cometas' },
    { path: '/banco', label: 'Banco de objetos' },
    { path: '/cadastro', label: 'Cadastro' },
  ]

  return (
    <nav className="top-nav">
      <div className="brand" role="heading" aria-level="1">
        <span className="brand__logo" aria-hidden>
          ☄️
        </span>
        <span className="brand__name">Near Earth Objects</span>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <a
              href={`#${item.path}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(item.path)
              }}
              className={current === item.path ? 'active' : ''}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function App() {
  const { path, navigate } = useHashRoute()
  const CurrentPage = ROUTES[path] || LandingPage

  return (
    <AuthProvider>
      <SearchProvider>
        <div className="app-shell">
          <Navigation current={path} onNavigate={navigate} />
          <CurrentPage onNavigate={navigate} />
        </div>
      </SearchProvider>
    </AuthProvider>
  )
}

export default App
