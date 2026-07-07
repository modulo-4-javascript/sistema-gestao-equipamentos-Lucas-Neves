import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type {
  GetLocationEquipmentParams,
  LocationEquipment,
  PaginatedResult,
} from '../types/location'

// Hook dos equipamentos vinculados a um local, com paginação própria.
export function useLocationEquipment(
  locationId?: string,
  params: GetLocationEquipmentParams = {},
): RequestState<PaginatedResult<LocationEquipment>> {
  const { page, pageSize, status } = params
  const [data, setData] = useState<PaginatedResult<LocationEquipment>>()
  const [isLoading, setIsLoading] = useState(Boolean(locationId))
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationEquipment = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationEquipment(locationId, {
        page,
        pageSize,
        status,
      })
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId, page, pageSize, status])

  useEffect(() => {
    void Promise.resolve().then(loadLocationEquipment)
  }, [loadLocationEquipment])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationEquipment,
  }
}
