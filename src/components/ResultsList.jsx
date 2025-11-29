import ErrorMessage from './messages/ErrorMessage'
import { useSearch } from '../contexts/SearchContext'

function ResultsList() {
  const {
    state: { results, loading, error, submitted, query },
  } = useSearch()

  if (error) {
    return (
      <section className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Mensagens de erro</p>
            <h2>Não foi possível retornar os dados</h2>
          </div>
        </header>
        <ErrorMessage message={error} />
      </section>
    )
  }

  if (!submitted) {
    return (
      <section className="empty">
        <p className="eyebrow">API em JSON</p>
        <h3>Comece digitando um termo no formulário</h3>
        <p>Os resultados da Open Library aparecerão aqui.</p>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="empty">
        <h3>Buscando dados…</h3>
        <p>Conectando à API da Open Library para encontrar “{query}”.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Resultados</p>
          <h2>{results.length} livros encontrados</h2>
        </div>
      </header>

      <div className="grid">
        {results.map((book) => (
          <article key={book.key} className="card">
            <h3>{book.title}</h3>
            {book.author && <p className="muted">{book.author}</p>}
            <p className="tagline">
              {book.year ? `Publicado em ${book.year}` : 'Ano não informado'}
            </p>
            {book.subjects.length > 0 && (
              <ul className="chips">
                {book.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ResultsList
