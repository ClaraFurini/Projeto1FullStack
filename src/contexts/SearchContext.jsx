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
        'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY&page=0&size=60',
      )

      if (!response.ok) {
        throw new Error('Erro ao comunicar com a API pública. Tente novamente mais tarde.')
      }

      const data = await response.json()
      const objects = (data?.near_earth_objects || [])
        .filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 20)
        .map((item) => {
          const approach = item.close_approach_data?.[0]
          const diameter = item.estimated_diameter?.kilometers
          const velocityValue = Number(approach?.relative_velocity?.kilometers_per_hour)
          const distanceValue = Number(approach?.miss_distance?.kilometers)
          const diameterMin = Number(diameter?.estimated_diameter_min)
          const diameterMax = Number(diameter?.estimated_diameter_max)

          return {
            id: item.id,
            name: item.name,
            isHazardous: item.is_potentially_hazardous_asteroid,
            magnitude: item.absolute_magnitude_h,
            velocity: Number.isFinite(velocityValue)
              ? velocityValue.toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })
              : null,
            distance: Number.isFinite(distanceValue)
              ? distanceValue.toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })
              : null,
            approachDate: approach?.close_approach_date_full || approach?.close_approach_date,
            orbitingBody: approach?.orbiting_body,
            diameterMin: Number.isFinite(diameterMin) ? diameterMin : null,
            diameterMax: Number.isFinite(diameterMax) ? diameterMax : null,
          }
        })

      if (!objects.length) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Nenhum resultado encontrado para este termo.' })
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
