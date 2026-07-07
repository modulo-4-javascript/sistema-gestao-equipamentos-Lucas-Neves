import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { DetailHeader } from '../../../../shared/components/DetailHeader'
import type { LocationDetails } from '../../types/location'
import { LocationStatusBadge } from '../LocationStatusBadge'

interface LocationDetailsHeaderProps {
  location: LocationDetails
  onBack: () => void
  onChangeStatus: () => void
  onEdit: () => void
  onRemove: () => void
}

export function LocationDetailsHeader({
  location,
  onBack,
  onChangeStatus,
  onEdit,
  onRemove,
}: LocationDetailsHeaderProps) {
  return (
    <DetailHeader
      code={location.code}
      title={location.name}
      status={<LocationStatusBadge status={location.status} />}
      backAction={{
        icon: <ArrowBackOutlined fontSize="small" />,
        label: 'Voltar para localizações',
        onClick: onBack,
      }}
      actions={[
        {
          icon: <EditOutlined fontSize="small" />,
          label: 'Editar',
          onClick: onEdit,
          variant: 'primary',
        },
        {
          icon: <AutorenewOutlined fontSize="small" />,
          label: 'Alterar status',
          onClick: onChangeStatus,
        },
        {
          danger: true,
          icon: <DeleteOutlineOutlined fontSize="small" />,
          label: 'Excluir',
          onClick: onRemove,
        },
      ]}
    />
  )
}
