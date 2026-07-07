import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationDetails } from '../types/location'

// Hook do detalhe: recebe o ID da rota e busca uma única localização.
export function useLocationDetails(locationId?: string): RequestState<LocationDetails> {
  const [data, setData] = useState<LocationDetails>()
  const [isLoading, setIsLoading] = useState(Boolean(locationId))
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationDetails = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationById(locationId)
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId])

  useEffect(() => {
    void Promise.resolve().then(loadLocationDetails)
  }, [loadLocationDetails])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationDetails,
  }
}
