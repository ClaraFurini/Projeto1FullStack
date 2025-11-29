import { useEffect, useState } from 'react'
import { apiFetch } from '../services/api'
import ErrorMessage from './messages/ErrorMessage'
import Loading from './messages/Loading'

export default function ObjectGallery() {
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await apiFetch('/api/items/feed')
        setObjects(data.items || [])
      } catch (err) {
        setError(err.message || 'Não foi possível carregar o banco de objetos.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="panel">
      <header className="section-title">
        <p className="eyebrow">Banco de objetos</p>
        <h2>Últimas inserções</h2>
        <p className="muted">Lista condensada das últimas datas aproximadas registradas no MongoDB.</p>
      </header>

      {loading && <Loading message="Carregando objetos recentes..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <ul className="results">
          {objects.map((item) => (
            <li key={item._id || item.id} className="result-card">
              <div className="result-header">
                <h3>{item.name}</h3>
                {item.approachDate && <span className="badge">{item.approachDate}</span>}
              </div>
              <p className="muted">{item.orbitingBody || 'Corpo orbital não informado'}</p>
              <dl className="metrics">
                {item.magnitude ? (
                  <div>
                    <dt>Magnitude</dt>
                    <dd>{item.magnitude}</dd>
                  </div>
                ) : null}
                {item.velocity ? (
                  <div>
                    <dt>Velocidade</dt>
                    <dd>{item.velocity}</dd>
                  </div>
                ) : null}
                {item.distance ? (
                  <div>
                    <dt>Distância</dt>
                    <dd>{item.distance}</dd>
                  </div>
                ) : null}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
