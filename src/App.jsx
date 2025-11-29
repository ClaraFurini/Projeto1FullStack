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
              <p className="eyebrow">Landing</p>
              <h1>Banco interno de cometas e asteroides próximos da Terra</h1>
              <p className="lede">
                Acesse a versão hospedada no GitHub Pages com uma landing page completa. Todo o
                conteúdo da busca e do cadastro vem do banco MongoDB local do projeto, sem chamadas
                à API externa.
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
                <li>🛰️ Dados armazenados no MongoDB do projeto</li>
              </ul>
            </div>

            <div className="hero__card" aria-hidden>
              <p className="eyebrow">Painel rápido</p>
              <h3>Entenda o risco</h3>
              <p className="hero__metric">Velocidade média</p>
              <p className="hero__value">70.000 km/h</p>
              <div className="hero__pill">Potencialmente perigosos monitorados</div>
              <p className="hero__value hero__value--small">+3.000 objetos</p>
              <p className="muted">A base local espelha o catálogo essencial e pode receber novos itens.</p>
            </div>
          </header>

          <section className="panel">
            <header className="panel__header">
              <div>
                <p className="eyebrow">Visão geral</p>
                <h2>Landing page com passos claros</h2>
                <p className="muted">
                  Use esta SPA para autenticar, consultar e cadastrar objetos próximos à Terra. Tudo é
                  servido como site estático (GitHub Pages) enquanto a API retorna os dados do MongoDB.
                </p>
              </div>
            </header>

            <div className="grid grid--two">
              <article className="card">
                <h3>1) Entrar</h3>
                <p className="muted">
                  Faça login ou crie uma conta. O token fica salvo em cookie HttpOnly para proteger a
                  sessão.
                </p>
              </article>
              <article className="card">
                <h3>2) Buscar</h3>
                <p className="muted">
                  Escolha uma data e receba os objetos daquela aproximação diretamente do MongoDB, sem
                  depender da API externa.
                </p>
              </article>
              <article className="card">
                <h3>3) Cadastrar</h3>
                <p className="muted">
                  Inclua novos asteroides ou cometas. O cache de busca é invalidado automaticamente para
                  mostrar o registro recém-criado.
                </p>
              </article>
              <article className="card">
                <h3>4) Landing no GitHub Pages</h3>
                <p className="muted">
                  O build gerado em <code>/docs</code> serve esta mesma landing. Basta publicar a pasta no
                  Pages para evitar telas em branco.
                </p>
              </article>
            </div>
          </section>

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
