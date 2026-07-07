import { Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import {
  getLocationStatusLabel,
  getLocationTypeLabel,
  type LocationDetails,
  type LocationStatus,
  type LocationType,
} from '../../types/location'
import { FormGrid, FormModal, FullField } from './styles'

export type LocationFormMode = 'create' | 'edit'

export interface LocationFormValues {
  code: string
  name: string
  type: LocationType
  building?: string
  floor?: string
  room?: string
  description?: string
  status: LocationStatus
}

interface LocationFormModalProps {
  location?: LocationDetails
  confirmLoading?: boolean
  mode: LocationFormMode
  open: boolean
  statusOptions: LocationStatus[]
  typeOptions: LocationType[]
  onCancel: () => void
  onSubmit: (values: LocationFormValues) => void
}

const emptyLocationForm: Partial<LocationFormValues> = {
  code: '',
  name: '',
  type: undefined,
  building: '',
  floor: '',
  room: '',
  description: '',
  status: 'ACTIVE',
}

export function LocationFormModal({
  location,
  confirmLoading,
  mode,
  open,
  statusOptions,
  typeOptions,
  onCancel,
  onSubmit,
}: LocationFormModalProps) {
  const [form] = Form.useForm<LocationFormValues>()
  const isEditing = mode === 'edit'

  useEffect(() => {
    if (open) {
      form.resetFields()
      form.setFieldsValue(
        location
          ? {
              code: location.code,
              name: location.name,
              type: location.type,
              building: location.building ?? '',
              floor: location.floor ?? '',
              room: location.room ?? '',
              description: location.description ?? '',
              status: location.status,
            }
          : emptyLocationForm,
      )
    }
  }, [form, location, open])

  function handleSubmit() {
    form
      .validateFields()
      .then((values) => onSubmit(values))
      .catch(() => undefined)
  }

  return (
    <FormModal
      centered
      destroyOnHidden
      open={open}
      title={isEditing ? 'Editar local' : 'Novo local'}
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={confirmLoading}
      width={800}
      styles={{
        mask: { backdropFilter: 'blur(2px)', background: 'rgb(0 0 0 / 45%)' },
      }}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        key={`${mode}-${location?.id ?? 'empty'}`}
        layout="vertical"
        initialValues={emptyLocationForm}
        requiredMark={false}
      >
        <FormGrid>
          <Form.Item
            label="Código *"
            name="code"
            normalize={(value) =>
              typeof value === 'string' ? value.toUpperCase() : value
            }
            rules={[
              { required: true, message: 'Informe o código do local.' },
              { min: 2, message: 'Use pelo menos 2 caracteres.' },
              { max: 20, message: 'Use no máximo 20 caracteres.' },
              {
                pattern: /^[A-Z0-9-]+$/,
                message: 'Use apenas letras maiúsculas, números e hífen.',
              },
            ]}
          >
            <Input placeholder="Ex: LAB-03" />
          </Form.Item>

          <Form.Item
            label="Nome do local *"
            name="name"
            rules={[
              { required: true, message: 'Informe o nome do local.' },
              { min: 2, message: 'Use pelo menos 2 caracteres.' },
            ]}
          >
            <Input placeholder="Ex: Laboratório de Redes" />
          </Form.Item>

          <Form.Item
            label="Tipo *"
            name="type"
            rules={[{ required: true, message: 'Selecione o tipo.' }]}
          >
            <Select
              placeholder="Selecione o tipo..."
              options={typeOptions.map((type) => ({
                label: getLocationTypeLabel(type),
                value: type,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Situação *"
            name="status"
            rules={[{ required: true, message: 'Selecione a situação.' }]}
          >
            <Select
              placeholder="Selecione a situação..."
              options={statusOptions.map((status) => ({
                label: getLocationStatusLabel(status),
                value: status,
              }))}
            />
          </Form.Item>

          <Form.Item label="Prédio" name="building">
            <Input placeholder="Ex: Bloco A" />
          </Form.Item>

          <Form.Item label="Andar" name="floor">
            <Input placeholder="Ex: 2º andar" />
          </Form.Item>

          <Form.Item label="Sala" name="room">
            <Input placeholder="Ex: 204" />
          </Form.Item>

          <FullField>
            <Form.Item label="Descrição" name="description">
              <Input.TextArea
                maxLength={1000}
                placeholder="Informações adicionais sobre o local..."
                showCount
              />
            </Form.Item>
          </FullField>
        </FormGrid>
      </Form>
    </FormModal>
  )
}
