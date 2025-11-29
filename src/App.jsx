import './App.css'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import { SearchProvider } from './contexts/SearchContext'

function App() {
  return (
    <SearchProvider>
      <main className="page">
        <header className="hero">
          <p className="eyebrow">Descrição do projeto</p>
          <h1>Catálogo de livros com React e Open Library</h1>
          <p>
            Aplicação SPA construída com React, Context API e useReducer, consumindo dados JSON
            da Open Library. A página inclui validação de formulário, mensagens de erro e um fluxo
            de busca que roda sem recarregar a interface.
          </p>
        </header>

        <SearchForm />
        <ResultsList />
      </main>
    </SearchProvider>
  )
}

export default App
