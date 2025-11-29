import InsertForm from '../components/InsertForm'
import './pages.css'

export default function InsertPage() {
  return (
    <div className="page page-grid">
      <header className="panel section-title">
        <p className="eyebrow">Cadastro</p>
        <h1>Registrar novo objeto próximo da Terra</h1>
        <p className="muted">
          Preencha os campos essenciais para criar um novo registro na base MongoDB. Ao salvar, o cache
          das buscas por data é invalidado automaticamente.
        </p>
      </header>
      <InsertForm />
    </div>
  )
}
