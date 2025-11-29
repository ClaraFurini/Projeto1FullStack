import { useRef } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import { SearchProvider } from './contexts/SearchContext'

function App() {
  const searchSectionRef = useRef(null)

  const scrollToSearch = (event) => {
    event.preventDefault()
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <SearchProvider>
      <main className="page">
        <header className="hero hero--split">
          <div className="hero__content">
            <p className="eyebrow">Monitoramento NASA</p>
            <h1>Mapa de cometas e asteroides próximos da Terra</h1>
            <p className="lede">
              Visualize objetos próximos à Terra (NEOs) usando a API pública da NASA. Busque pelo
              nome do cometa ou asteroide, veja os detalhes de aproximação e descubra se ele é
              considerado potencialmente perigoso.
            </p>
            <div className="cta-group">
              <a className="primary" href="#cometas" onClick={scrollToSearch}>
                Ir para a lista de cometas
              </a>
              <button type="button" className="ghost" onClick={scrollToSearch}>
                Quero pesquisar agora
              </button>
            </div>
            <ul className="hero__highlights">
              <li>
                🚀 Dados oficiais em tempo real da NASA NeoWs
              </li>
              <li>
                🔎 Busca instantânea sem recarregar a página
              </li>
              <li>
                🛰️ Foco em corpos que passam perto da órbita terrestre
              </li>
            </ul>
          </div>

          <div className="hero__card" aria-hidden>
            <p className="eyebrow">Painel rápido</p>
            <h3>Entenda o risco</h3>
            <p className="hero__metric">Velocidade média</p>
            <p className="hero__value">70.000 km/h</p>
            <div className="hero__pill">Potencialmente perigosos monitorados</div>
            <p className="hero__value hero__value--small">+3.000 objetos</p>
            <p className="muted">Role ou clique no botão para consultar um nome específico.</p>
          </div>
        </header>

        <section ref={searchSectionRef} id="cometas" className="stack">
          <SearchForm />
          <ResultsList />
        </section>
      </main>
    </SearchProvider>
  )
}

export default App
