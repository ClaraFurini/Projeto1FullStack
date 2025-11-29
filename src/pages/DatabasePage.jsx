import ObjectGallery from '../components/ObjectGallery'
import './pages.css'

export default function DatabasePage() {
  return (
    <div className="page page-grid">
      <header className="panel section-title">
        <p className="eyebrow">Banco</p>
        <h1>Objetos próximos armazenados</h1>
        <p className="muted">
          Visualização rápida das inserções mais recentes no MongoDB sem depender da API externa. É
          necessário estar autenticado para consultar.
        </p>
      </header>
      <ObjectGallery />
    </div>
  )
}
