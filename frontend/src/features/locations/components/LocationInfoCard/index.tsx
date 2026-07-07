import { DetailInfoCard } from '../../../../shared/components/DetailInfoCard'
import {
  formatLocationDate,
  getLocationTypeLabel,
  type LocationDetails,
} from '../../types/location'

interface LocationInfoCardProps {
  location: LocationDetails
}

function getValue(value?: string | null) {
  return value?.trim() || 'Não informado'
}

function formatLocationDateTime(value?: string) {
  if (!value) {
    return 'Não informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function LocationInfoCard({ location }: LocationInfoCardProps) {
  return (
    <DetailInfoCard
      title="Dados do local"
      items={[
        {
          label: 'Nome',
          value: location.name,
        },
        {
          label: 'Código',
          tech: true,
          value: location.code,
        },
        {
          label: 'Tipo',
          value: getLocationTypeLabel(location.type),
        },
        {
          label: 'Prédio',
          value: getValue(location.building),
        },
        {
          label: 'Andar',
          tech: true,
          value: getValue(location.floor),
        },
        {
          label: 'Sala',
          value: getValue(location.room),
        },
        {
          countBadge: location.equipmentCount,
          label: 'Equipamentos vinculados',
          value: 'vinculados',
        },
        {
          label: 'Criado em',
          value: formatLocationDate(location.createdAt),
        },
        {
          label: 'Última atualização',
          value: formatLocationDateTime(location.updatedAt),
        },
      ]}
    />
  )
}
