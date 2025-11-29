import { createContext, useCallback, useContext, useReducer } from 'react'

const SearchContext = createContext(null)

const initialState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  submitted: false,
}

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'FETCH_START':
      return { ...state, loading: true, error: null, submitted: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, results: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, results: [] }
    case 'RESET_RESULTS':
      return { ...state, results: [], submitted: false }
    default:
      return state
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const performSearch = useCallback(async (query) => {
    dispatch({ type: 'SET_QUERY', payload: query })
    dispatch({ type: 'FETCH_START' })

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=15`,
      )

      if (!response.ok) {
        throw new Error('Erro ao comunicar com a API pública. Tente novamente mais tarde.')
      }

      const data = await response.json()
      const books = (data?.docs || []).map((item) => ({
        key: item.key,
        title: item.title,
        author: item.author_name?.join(', '),
        year: item.first_publish_year,
        subjects: item.subject?.slice(0, 3) || [],
      }))

      if (!books.length) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Nenhum resultado encontrado para este termo.' })
        return
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: books })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Não foi possível completar a busca.',
      })
    }
  }, [])

  const clearResults = useCallback(() => {
    dispatch({ type: 'RESET_RESULTS' })
  }, [])

  return (
    <SearchContext.Provider value={{ state, performSearch, clearResults }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch deve ser usado dentro de SearchProvider')
  }

  return context
}
