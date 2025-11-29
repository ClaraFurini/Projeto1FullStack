import './pages.css'

export default function LandingPage({ onNavigate }) {
  const scrollTo = (hashPath) => (event) => {
    event.preventDefault()
    onNavigate(hashPath)
  }

  return (
    <div className="page">
      <header className="hero hero--split">
        <div className="hero__content">
          <p className="eyebrow">Landing</p>
          <h1>Banco interno de cometas e asteroides próximos da Terra</h1>
          <p className="lede">
            Landing preparada para publicação no GitHub Pages. Faça login, pesquise por data e cadastre
            novos objetos usando apenas o banco MongoDB e a API interna segura.
          </p>
          <div className="cta-group">
            <a className="primary" href="#/buscar" onClick={scrollTo('/buscar')}>
              Ver objetos por data
            </a>
            <button type="button" className="ghost" onClick={() => onNavigate('/cadastro')}>
              Cadastrar novo objeto
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
            <h2>Fluxo completo em páginas separadas</h2>
            <p className="muted">
              Use a navegação para acessar login, busca, banco e cadastro. Tudo continua sendo SPA,
              porém organizado por rotas hash para funcionar bem no GitHub Pages.
            </p>
          </div>
        </header>

        <div className="grid grid--two">
          <article className="card">
            <h3>1) Entrar</h3>
            <p className="muted">Faça login ou crie uma conta. O token fica salvo em cookie HttpOnly.</p>
          </article>
          <article className="card">
            <h3>2) Buscar</h3>
            <p className="muted">Escolha uma data e veja os objetos daquela aproximação direto do MongoDB.</p>
          </article>
          <article className="card">
            <h3>3) Banco de objetos</h3>
            <p className="muted">Consulte rapidamente as últimas inserções com a lista geral protegida.</p>
          </article>
          <article className="card">
            <h3>4) Cadastrar</h3>
            <p className="muted">Inclua novos asteroides ou cometas; a busca é atualizada automaticamente.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
