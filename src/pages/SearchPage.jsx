import SearchForm from '../components/SearchForm'
import ResultsList from '../components/ResultsList'
import './pages.css'

export default function SearchPage() {
  return (
    <div className="page page-grid">
      <header className="panel section-title">
        <p className="eyebrow">Busca protegida</p>
        <h1>Lista de cometas e asteroides por data</h1>
        <p className="muted">
          Informe uma data (YYYY-MM-DD) para consultar os objetos aproximados registrados no MongoDB.
          Apenas usuários autenticados têm acesso.
        </p>
      </header>
      <div className="page-grid page-grid--two">
        <SearchForm />
        <ResultsList />
      </div>
    </div>
  )
}
