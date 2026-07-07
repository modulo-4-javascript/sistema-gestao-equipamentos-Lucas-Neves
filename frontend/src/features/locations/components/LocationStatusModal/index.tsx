import { StatusModal } from '../../../../shared/components/StatusModal'
import type { StatusFormValues } from '../../../../shared/components/StatusModal'
import {
  getLocationStatusLabel,
  type LocationDetails,
  type LocationStatus,
} from '../../types/location'

export type LocationStatusFormValues = StatusFormValues<LocationStatus>

interface LocationStatusModalProps {
  location?: LocationDetails
  confirmLoading?: boolean
  open: boolean
  statusOptions: LocationStatus[]
  onCancel: () => void
  onSubmit: (values: LocationStatusFormValues) => void
}

export function LocationStatusModal({
  location,
  confirmLoading,
  open,
  statusOptions,
  onCancel,
  onSubmit,
}: LocationStatusModalProps) {
  return (
    <StatusModal
      confirmLoading={confirmLoading}
      currentStatus={location?.status}
      currentStatusPrefix="Situação atual"
      getStatusLabel={getLocationStatusLabel}
      notePlaceholder="Ex: local temporariamente indisponível para manutenção."
      open={open}
      statusLabel="Nova situação"
      statusOptions={statusOptions}
      title="Alterar situação"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )
}
