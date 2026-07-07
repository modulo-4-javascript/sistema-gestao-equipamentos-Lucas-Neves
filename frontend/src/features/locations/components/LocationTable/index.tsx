import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import { Dropdown } from 'antd'
import type { TableProps } from 'antd'
import { DataTable } from '../../../../shared/components/DataTable'
import {
  ActionButton,
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'
import {
  formatLocationDate,
  getLocationTypeLabel,
  type LocationDetails,
} from '../../types/location'
import { LocationStatusBadge } from '../LocationStatusBadge'

interface LocationTableProps {
  locations: LocationDetails[]
  loading?: boolean
  pagination?: TableProps<LocationDetails>['pagination']
  onChangeStatusLocation: (location: LocationDetails) => void
  onEditLocation: (location: LocationDetails) => void
  onRemoveLocation: (location: LocationDetails) => void
  onViewLocation: (location: LocationDetails) => void
}

interface LocationTableActions {
  onChangeStatusLocation: (location: LocationDetails) => void
  onEditLocation: (location: LocationDetails) => void
  onRemoveLocation: (location: LocationDetails) => void
  onViewLocation: (location: LocationDetails) => void
}

function formatRoomLabel(room?: string) {
  if (!room) {
    return undefined
  }

  return room.toLowerCase().startsWith('sala') ? room : `Sala ${room}`
}

function formatLocationAddress(location: LocationDetails) {
  const addressParts = [
    location.building,
    location.floor,
    formatRoomLabel(location.room),
  ].filter(Boolean)

  return addressParts.length > 0 ? addressParts.join(' - ') : 'Não informado'
}

function getColumns({
  onChangeStatusLocation,
  onEditLocation,
  onRemoveLocation,
  onViewLocation,
}: LocationTableActions): TableProps<LocationDetails>['columns'] {
  return [
    {
      title: 'Local',
      dataIndex: 'name',
      key: 'name',
      render: (_, location) => (
        <ResourceCell>
          <ResourceIcon>
            <PinDropOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{location.name}</ResourceName>
            <ResourceCode>{location.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: LocationDetails['type']) => getLocationTypeLabel(type),
    },
    {
      title: 'Endereço',
      dataIndex: 'building',
      key: 'address',
      render: (_, location) => formatLocationAddress(location),
    },
    {
      title: 'Situação',
      dataIndex: 'status',
      key: 'status',
      render: (status: LocationDetails['status']) => (
        <LocationStatusBadge status={status} />
      ),
    },
    {
      title: 'Equip.',
      dataIndex: 'equipmentCount',
      key: 'equipmentCount',
    },
    {
      title: 'Atualizado',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: LocationDetails['updatedAt']) =>
        formatLocationDate(updatedAt),
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'right',
      render: (_, location) => (
        <Dropdown
          trigger={['click']}
          menu={{
            onClick: ({ key }) => {
              if (key === 'view') {
                onViewLocation(location)
              }

              if (key === 'edit') {
                onEditLocation(location)
              }

              if (key === 'status') {
                onChangeStatusLocation(location)
              }

              if (key === 'remove') {
                onRemoveLocation(location)
              }
            },
            items: [
              {
                key: 'view',
                icon: <VisibilityOutlined fontSize="small" />,
                label: 'Ver detalhes',
              },
              {
                key: 'edit',
                icon: <EditOutlined fontSize="small" />,
                label: 'Editar',
              },
              {
                key: 'status',
                icon: <AutorenewOutlined fontSize="small" />,
                label: 'Mudar situação',
              },
              {
                key: 'remove',
                icon: <DeleteOutlineOutlined fontSize="small" />,
                label: 'Excluir',
                danger: true,
              },
            ],
          }}
        >
          <ActionButton
            aria-label={`Abrir ações de ${location.name}`}
            icon={<MoreHorizOutlined fontSize="small" />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ]
}

export function LocationTable({
  locations,
  loading,
  pagination,
  onChangeStatusLocation,
  onEditLocation,
  onRemoveLocation,
  onViewLocation,
}: LocationTableProps) {
  return (
    <DataTable
      columns={getColumns({
        onChangeStatusLocation,
        onEditLocation,
        onRemoveLocation,
        onViewLocation,
      })}
      dataSource={locations}
      emptyText="Nenhuma localização encontrada."
      loading={loading}
      pagination={pagination}
      rowKey="id"
    />
  )
}
