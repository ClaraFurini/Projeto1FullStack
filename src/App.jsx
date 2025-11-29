import { useRef } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import LoginForm from './components/LoginForm'
import InsertForm from './components/InsertForm'
import { SearchProvider } from './contexts/SearchContext'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  const searchSectionRef = useRef(null)

  const scrollToSearch = (event) => {
    event.preventDefault()
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AuthProvider>
      <SearchProvider>
        <main className="page">
          <header className="hero hero--split">
            <div className="hero__content">
              <p className="eyebrow">Monitoramento NASA</p>
              <h1>Mapa diário de cometas e asteroides próximos da Terra</h1>
              <p className="lede">
                Visualize objetos próximos à Terra (NEOs) usando o banco interno espelhado da NASA.
                Consulte por data, insira novos corpos e proteja o acesso com login e cookies
                HttpOnly.
              </p>
              <div className="cta-group">
                <a className="primary" href="#cometas" onClick={scrollToSearch}>
                  Ver objetos por data
                </a>
                <button type="button" className="ghost" onClick={scrollToSearch}>
                  Ir para a busca diária
                </button>
              </div>
              <ul className="hero__highlights">
                <li>🔒 Login obrigatório para buscar e inserir</li>
                <li>🧠 Cache com Redis para respostas rápidas</li>
                <li>🛰️ Dados baseados no catálogo NeoWs</li>
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

          <section id="auth" className="stack">
            <LoginForm />
          </section>

          <section ref={searchSectionRef} id="cometas" className="stack">
            <SearchForm />
            <ResultsList />
          </section>

          <section id="insercao" className="stack">
            <InsertForm />
          </section>
        </main>
      </SearchProvider>
    </AuthProvider>
  )
}

export default App
