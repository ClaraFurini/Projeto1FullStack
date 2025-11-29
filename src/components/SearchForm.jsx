import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '../contexts/SearchContext'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from './messages/ErrorMessage'

function SearchForm() {
  const { state, performSearch, clearResults } = useSearch()
  const { user } = useAuth()
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [error, setError] = useState('')

  const trimmed = useMemo(() => selectedDate.trim(), [selectedDate])

  useEffect(() => {
    if (error && trimmed) {
      setError('')
    }
  }, [error, trimmed])

  const validate = () => {
    if (!trimmed) {
      return 'Informe uma data válida para buscar.'
    }
    return ''
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const validation = validate()
    if (validation) {
      setError(validation)
      return
    }
    performSearch(trimmed)
  }

  const handleReset = () => {
    setSelectedDate(today)
    setError('')
    clearResults()
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Busca autenticada</p>
          <h2>Veja NEOs que passam perto da Terra em um dia</h2>
        </div>
        <button type="button" className="ghost" onClick={handleReset} disabled={state.loading}>
          Limpar
        </button>
      </header>

      <form className="search-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Data de aproximação *</span>
          <input
            type="date"
            max={today}
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            aria-invalid={Boolean(error)}
          />
          {error && <ErrorMessage message={error} />}
        </label>

        <div className="form-actions">
          <button className="primary" type="submit" disabled={state.loading || !user}>
            {state.loading ? 'Buscando…' : 'Buscar por data'}
          </button>
          <p className="helper">
            Consulte os registros de objetos próximos à Terra na data informada. Os dados vêm do
            banco MongoDB replicando a API NeoWs para uso interno. {user ? '' : 'Faça login para liberar a busca.'}
          </p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
