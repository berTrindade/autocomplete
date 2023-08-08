import { useEffect, useReducer } from 'react'
import useMountedState from './useMounted'

interface useFetchProps {
  url: string
  start?: boolean
}

type State<T> = {
  data?: T
  loading?: boolean
  error?: Error | null
}

type Action<T> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'ERROR'; payload: Error }

const dataFetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'LOADING': {
      console.log('LOADING', { action })

      return { ...state, loading: true }
    }
    case 'SUCCESS': {
      console.log('SUCCESS', { action })

      return { ...state, data: action.payload, loading: false }
    }
    case 'ERROR': {
      console.log('ERROR', { action })

      return { ...state, error: action.payload, loading: false }
    }
    default: {
      console.log('DEFAULT', { state })

      return {}
    }
  }
}

export function useFetch<T>({ url, start }: useFetchProps): State<T> {
  const isMounted = useMountedState()

  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: undefined,
    loading: false,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await fetch(url)

        console.log({ response })

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()
        if (!isMounted) return

        dispatch({ type: 'SUCCESS', payload: data })
      } catch (error) {
        if (!isMounted) return

        dispatch({ type: 'ERROR', payload: error as Error })
      }
    }

    if (start) fetchData()
  }, [isMounted, start, url])

  return state as State<T>
}
