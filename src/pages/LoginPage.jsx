import LoginForm from '../components/LoginForm'
import './pages.css'

export default function LoginPage() {
  return (
    <div className="page page-grid">
      <header className="panel section-title">
        <p className="eyebrow">Acesso</p>
        <h1>Entre para usar a busca e o cadastro</h1>
        <p className="muted">
          Autentique-se para liberar as rotas protegidas. O token fica salvo em cookie HttpOnly e é
          reutilizado nas próximas visitas.
        </p>
      </header>
      <LoginForm />
    </div>
  )
}
