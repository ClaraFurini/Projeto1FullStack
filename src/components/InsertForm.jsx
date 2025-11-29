import { useMemo, useState } from 'react'
import { apiFetch } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { useSearch } from '../contexts/SearchContext'
import ErrorMessage from './messages/ErrorMessage'
import SuccessMessage from './messages/SuccessMessage'

function InsertForm() {
  const { user } = useAuth()
  const { performSearch } = useSearch()
  const [form, setForm] = useState({
    name: '',
    approachDate: '',
    magnitude: '',
    velocity: '',
    distance: '',
    nasaUrl: '',
    isHazardous: false,
    orbitingBody: '',
    diameterMin: '',
    diameterMax: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isValid = useMemo(() => form.name.trim() && form.approachDate.trim(), [form])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!isValid) {
      setError('Preencha nome e data de aproximação.')
      return
    }

    try {
      const payload = {
        ...form,
        magnitude: form.magnitude ? Number(form.magnitude) : undefined,
        diameterMin: form.diameterMin ? Number(form.diameterMin) : undefined,
        diameterMax: form.diameterMax ? Number(form.diameterMax) : undefined,
      }
      const data = await apiFetch('/api/items', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setSuccess(`Registro ${data.item?.name || ''} criado com sucesso!`)
      if (payload.approachDate) {
        performSearch(payload.approachDate)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (!user) {
    return (
      <section className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Inserção protegida</p>
            <h2>Entre para cadastrar novos objetos</h2>
          </div>
        </header>
        <p className="muted">Faça login para incluir cometas/asteroides no banco.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Inserção</p>
          <h2>Cadastre um novo objeto próximo da Terra</h2>
        </div>
      </header>

      <form className="stack" onSubmit={handleSubmit}>
        <div className="grid grid--two">
          <label className="field">
            <span>Nome *</span>
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Data de aproximação *</span>
            <input
              type="date"
              name="approachDate"
              value={form.approachDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid grid--two">
          <label className="field">
            <span>Magnitude</span>
            <input
              type="number"
              step="0.1"
              name="magnitude"
              value={form.magnitude}
              onChange={handleChange}
            />
          </label>
          <label className="field checkbox">
            <input
              type="checkbox"
              name="isHazardous"
              checked={form.isHazardous}
              onChange={handleChange}
            />
            <span>Potencialmente perigoso</span>
          </label>
        </div>

        <div className="grid grid--two">
          <label className="field">
            <span>Velocidade (km/h)</span>
            <input name="velocity" value={form.velocity} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Distância (km)</span>
            <input name="distance" value={form.distance} onChange={handleChange} />
          </label>
        </div>

        <div className="grid grid--two">
          <label className="field">
            <span>Diâmetro mínimo (km)</span>
            <input
              type="number"
              step="0.01"
              name="diameterMin"
              value={form.diameterMin}
              onChange={handleChange}
            />
          </label>
          <label className="field">
            <span>Diâmetro máximo (km)</span>
            <input
              type="number"
              step="0.01"
              name="diameterMax"
              value={form.diameterMax}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid grid--two">
          <label className="field">
            <span>Corpo orbital</span>
            <input name="orbitingBody" value={form.orbitingBody} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Link da NASA</span>
            <input name="nasaUrl" value={form.nasaUrl} onChange={handleChange} />
          </label>
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <div className="form-actions">
          <button type="submit" className="primary" disabled={!isValid}>
            Salvar objeto
          </button>
          <p className="helper">Campos marcados com * são obrigatórios.</p>
        </div>
      </form>
    </section>
  )
}

export default InsertForm
