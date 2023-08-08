import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
