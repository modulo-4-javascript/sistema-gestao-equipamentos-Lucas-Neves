import { useState } from 'react'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'

interface DeleteLocationState {
  isLoading: boolean
  errorMessage: string
  remove: (locationId: string) => Promise<void>
}

// Hook de exclusão: chama DELETE /locations/:locationId e controla o modal.
export function useDeleteLocation(): DeleteLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function remove(locationId: string) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      await locationService.deleteLocation(locationId)
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
    remove,
  }
}
