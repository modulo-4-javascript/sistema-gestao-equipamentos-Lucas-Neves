import { useState } from 'react'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationDetails, UpdateLocationPayload } from '../types/location'

interface UpdateLocationState {
  isLoading: boolean
  errorMessage: string
  update: (payload: UpdateLocationActionPayload) => Promise<LocationDetails>
}

interface UpdateLocationActionPayload {
  locationId: string
  payload: UpdateLocationPayload
}

// Hook de edição: recebe ID + dados editados e chama PUT /locations/:locationId.
export function useUpdateLocation(): UpdateLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function update({ locationId, payload }: UpdateLocationActionPayload) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.updateLocation(locationId, payload)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorMessage,
    update,
  }
}
