/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useReducer } from 'react'
import { apiFetch } from '../services/api'

const SearchContext = createContext(null)

const initialState = {
  date: '',
  results: [],
  loading: false,
  error: null,
  submitted: false,
}

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, date: action.payload }
    case 'FETCH_START':
      return { ...state, loading: true, error: null, submitted: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, results: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, results: [] }
    case 'RESET_RESULTS':
      return { ...state, results: [], submitted: false, date: '' }
    default:
      return state
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const performSearch = useCallback(async (date) => {
    const safeDate = date.trim()
    dispatch({ type: 'SET_DATE', payload: safeDate })
    dispatch({ type: 'FETCH_START' })

    try {
      const data = await apiFetch(`/api/items?date=${encodeURIComponent(safeDate)}`)

      const objects = data.items?.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        isHazardous: Boolean(item.isHazardous),
        magnitude: item.magnitude,
        nasaUrl: item.nasaUrl,
        velocity: item.velocity,
        distance: item.distance,
        approachDate: item.approachDate || safeDate,
        orbitingBody: item.orbitingBody,
        diameterMin: item.diameterMin,
        diameterMax: item.diameterMax,
      }))

      if (!objects.length) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: 'Nenhum objeto encontrado para a data informada.',
        })
        return
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: objects })
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
