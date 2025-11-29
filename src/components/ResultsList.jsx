import ErrorMessage from './messages/ErrorMessage'
import { useSearch } from '../contexts/SearchContext'

const formatDiameter = (min, max) => {
  if (!min && !max) return 'n/d'

  const formatter = (value) =>
    Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (min && max) return `${formatter(min)} km a ${formatter(max)} km`
  return `${formatter(min || max)} km`
}

function ResultsList() {
  const {
    state: { results, loading, error, submitted, date },
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
        <p className="eyebrow">Corpos próximos da Terra</p>
        <h3>Escolha uma data para trazer os registros</h3>
        <p>Filtramos os dados armazenados localmente a partir do catálogo NeoWs.</p>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="empty">
        <h3>Buscando dados…</h3>
        <p>Consultando a API interna para encontrar objetos em {date}.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Resultados</p>
          <h2>{results.length} objetos encontrados</h2>
          <p className="muted">Data consultada: {date}</p>
        </div>
      </header>

      <div className="grid">
        {results.map((object) => (
          <article key={object.id} className="card">
            <div className="card__header">
              <h3>{object.name}</h3>
              {object.isHazardous && <span className="pill pill--danger">Perigoso</span>}
            </div>

            <p className="tagline">Magnitude absoluta: {object.magnitude ?? 'n/d'}</p>

            <p className="muted">Diâmetro estimado: {formatDiameter(object.diameterMin, object.diameterMax)}</p>

            <ul className="chips">
              <li>
                Velocidade: {object.velocity ? `${object.velocity} km/h` : 'n/d'}
              </li>
              <li>
                Distância: {object.distance ? `${object.distance} km` : 'n/d'}
              </li>
              <li>Corpo orbital: {object.orbitingBody ?? 'n/d'}</li>
            </ul>

            {object.approachDate && (
              <p className="muted">Próxima aproximação em {object.approachDate}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ResultsList
