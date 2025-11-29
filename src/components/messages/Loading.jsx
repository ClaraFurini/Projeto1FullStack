export default function Loading({ message = 'Carregando...' }) {
  return (
    <div className="loading">
      <div className="spinner" aria-hidden />
      <p>{message}</p>
    </div>
  )
}
