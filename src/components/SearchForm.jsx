import { useEffect } from 'react'
import { useForm } from 'https://esm.sh/react-hook-form@7.54.0'
import { useSearch } from '../contexts/SearchContext'
import ErrorMessage from './messages/ErrorMessage'

function SearchForm() {
  const { state, performSearch, clearResults } = useSearch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    defaultValues: { query: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const queryValue = watch('query')

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ query: queryValue })
    }
  }, [isSubmitSuccessful, reset, queryValue])

  const onSubmit = (data) => {
    performSearch(data.query.trim())
  }

  const handleReset = () => {
    reset({ query: '' })
    clearResults()
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Busca com API JSON</p>
          <h2>Pesquise livros usando a Open Library</h2>
        </div>
        <button type="button" className="ghost" onClick={handleReset} disabled={state.loading}>
          Limpar
        </button>
      </header>

      <form className="search-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Título do livro ou autor *</span>
          <input
            type="text"
            placeholder="Ex.: Dom Casmurro, Machado de Assis"
            {...register('query', {
              required: 'Informe um termo para buscar.',
              minLength: { value: 3, message: 'Digite ao menos 3 caracteres.' },
            })}
            aria-invalid={Boolean(errors.query)}
          />
          {errors.query && <ErrorMessage message={errors.query.message} />}
        </label>

        <div className="form-actions">
          <button className="primary" type="submit" disabled={state.loading}>
            {state.loading ? 'Buscando…' : 'Buscar agora'}
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
