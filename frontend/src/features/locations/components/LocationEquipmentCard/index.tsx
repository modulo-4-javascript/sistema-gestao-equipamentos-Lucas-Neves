import { Alert, Button, Spin } from 'antd'
import { getEquipmentStatusLabel } from '../../../equipment/types/equipment'
import type { LocationEquipment } from '../../types/location'
import {
  CardTitle,
  Event,
  EventDescription,
  EventEyebrow,
  EventTitle,
  HeaderDivider,
  ListCard,
  StateBox,
  Timeline,
} from './styles'

interface LocationEquipmentCardProps {
  equipment: LocationEquipment[]
  loading?: boolean
  errorMessage?: string
  onViewEquipment: (equipment: LocationEquipment) => void
}

export function LocationEquipmentCard({
  equipment,
  loading,
  errorMessage,
  onViewEquipment,
}: LocationEquipmentCardProps) {
  return (
    <ListCard styles={{ body: { padding: 24 } }}>
      <CardTitle>Equipamentos neste local</CardTitle>
      <HeaderDivider />

      {errorMessage && (
        <Alert
          showIcon
          message="Erro ao carregar equipamentos vinculados"
          description={errorMessage}
          type="error"
        />
      )}

      {loading ? (
        <StateBox>
          <Spin /> Carregando equipamentos...
        </StateBox>
      ) : errorMessage ? null : (
        <Timeline>
          {equipment.map((item) => (
            <Event key={item.id}>
              <EventEyebrow>{item.name}</EventEyebrow>
              <Button type="link" onClick={() => onViewEquipment(item)}>
                {item.code}
              </Button>
              <EventDescription>
                {getEquipmentStatusLabel(item.status)}
                {item.model ? ` - ${item.model}` : ''}
              </EventDescription>
            </Event>
          ))}

          {equipment.length === 0 && (
            <Event>
              <EventEyebrow>Sem equipamentos</EventEyebrow>
              <EventTitle>Nenhum vínculo</EventTitle>
              <EventDescription>Este local ainda não possui equipamentos.</EventDescription>
            </Event>
          )}
        </Timeline>
      )}
    </ListCard>
  )
}
