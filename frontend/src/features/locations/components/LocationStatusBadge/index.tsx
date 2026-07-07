import { StatusPill } from '../../../../shared/components/StatusPill'
import { getLocationStatusLabel, type LocationStatus } from '../../types/location'

interface LocationStatusBadgeProps {
  status: LocationStatus
}

export function LocationStatusBadge({ status }: LocationStatusBadgeProps) {
  return (
    <StatusPill
      label={getLocationStatusLabel(status)}
      tone={status === 'ACTIVE' ? 'success' : 'muted'}
    />
  )
}
