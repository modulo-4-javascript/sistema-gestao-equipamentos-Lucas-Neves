import { useEffect, useState } from 'react'
import { Alert, Dropdown, App as AntDesignApp } from 'antd'
import type { TableProps } from 'antd'

// Icons
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

// Layout & Layout global
import { AppLayout } from '../../../../app/layout/AppLayout'
import { PageHeader } from '../../../../shared/components/PageHeader'

// Componentes Compartilhados
import { DataTable } from '../../../../shared/components/DataTable'
import { ResourceFilters } from '../../../../shared/components/ResourceFilters'
import { SummaryCards, type SummaryCardItem } from '../../../../shared/components/SummaryCards'

// Hooks e Helpers da Feature
import { useLocationList } from '../../hooks/useLocationList'
import { useLocationSummary } from '../../hooks/useLocationSummary'
import { useCreateLocation } from '../../hooks/useCreateLocation'
import { useUpdateLocation } from '../../hooks/useUpdateLocation'
import { useDeleteLocation } from '../../hooks/useDeleteLocation'
import { getRequestErrorMessage } from '../../../../shared/http/getRequestErrorMessage'

// Modais (Lembre-se de criar esses componentes conforme sugerido no Bloco 6)
import {
  LocationFormModal,
  type LocationFormMode,
  type LocationFormValues,
} from '../../components/LocationFormModal'
import { LocationRemoveModal } from '../../components/LocationRemoveModal'

// Types & Utils
import {
  formatLocationDate,
  getLocationStatusLabel,
  getLocationTypeLabel,
  locationStatusOptions,
  locationTypeOptions,
  type LocationDetails,
  type LocationStatus,
  type LocationSummaryResponse,
  type LocationType,
} from '../../types/location'

// Styles
import { Container, LocationStatusTag } from './styles'
import {
  ActionButton,
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'

// --- CONSTANTES E HELPERS ---
const defaultPageSize = 10

const emptySummary: LocationSummaryResponse = {
  total: 0,
  active: 0,
  inactive: 0,
  equipmentCount: 0,
}

function buildLocationSummaryCards(summary: LocationSummaryResponse): SummaryCardItem[] {
  return [
    {
      id: 'total',
      title: 'Locais',
      value: summary.total,
      icon: 'location',
      lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
      iconBackground: '#E1E8FD',
    },
    {
      id: 'active',
      title: 'Ativos',
      value: summary.active,
      icon: 'active',
      lineColor: '#25B8A7',
      iconBackground: '#E6FFFB',
    },
    {
      id: 'equipmentCount',
      title: 'Equipamentos',
      value: summary.equipmentCount,
      icon: 'maintenance',
      lineColor: '#007C8C',
      iconBackground: '#E6F4FF',
    },
    {
      id: 'inactive',
      title: 'Inativos',
      value: summary.inactive,
      icon: 'inactive',
      lineColor: '#6B7280',
      iconBackground: '#F3F4F6',
    },
  ]
}

function formatRoomLabel(room?: string) {
  if (!room) return undefined
  return room.toLowerCase().startsWith('sala') ? room : `Sala ${room}`
}

function formatLocationAddress(location: LocationDetails) {
  const addressParts = [
    location.building,
    formatRoomLabel(location.room) ?? location.floor,
  ].filter(Boolean)

  return addressParts.length > 0 ? addressParts.join(' • ') : 'Não informado'
}

interface LocationTableActions {
  onChangeStatusLocation: (location: LocationDetails) => void
  onEditLocation: (location: LocationDetails) => void
  onRemoveLocation: (location: LocationDetails) => void
  onViewLocation: (location: LocationDetails) => void
}

function getLocationColumns({
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
        <LocationStatusTag $status={status}>
          {getLocationStatusLabel(status)}
        </LocationStatusTag>
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
    },
  ]
}