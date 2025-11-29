import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '../contexts/SearchContext'
import ErrorMessage from './messages/ErrorMessage'

function SearchForm() {
  const { state, performSearch, clearResults } = useSearch()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const trimmed = useMemo(() => query.trim(), [query])

  useEffect(() => {
    if (error && trimmed.length >= 3) {
      setError('')
    }
  }, [error, trimmed])

  const validate = () => {
    if (!trimmed) {
      return 'Informe um termo para buscar.'
    }
    if (trimmed.length < 3) {
      return 'Digite ao menos 3 caracteres.'
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
    setQuery('')
    setError('')
    clearResults()
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Busca com API da NASA</p>
          <h2>Procure um cometa ou asteroide pelo nome</h2>
        </div>
        <button type="button" className="ghost" onClick={handleReset} disabled={state.loading}>
          Limpar
        </button>
      </header>

      <form className="search-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Nome oficial do NEO *</span>
          <input
            type="text"
            placeholder="Ex.: Halley, Encke, 433 Eros"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-invalid={Boolean(error)}
          />
          {error && <ErrorMessage message={error} />}
        </label>

        <div className="form-actions">
          <button className="primary" type="submit" disabled={state.loading}>
            {state.loading ? 'Buscando…' : 'Buscar NEOs'}
          </button>
          <p className="helper">
            Os campos marcados com * são obrigatórios. Mensagens de validação aparecem antes e
            depois da chamada à API.
          </p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
