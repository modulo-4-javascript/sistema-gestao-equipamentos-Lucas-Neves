import type { EquipmentDetail, EquipmentDetailSummary } from '../types/equipment'

// AULA 06:
// Este mock representa o retorno futuro de GET /equipments/{equipmentId}.
// Ele fica separado da listagem porque a tela de detalhes precisa de mais informacoes.
export const equipmentDetailsMock: EquipmentDetail[] = [
  {
    id: 'EQP-001',
    name: 'Notebook Dell',
    type: 'Informática',
    model: 'Latitude 54',
    status: 'Disponível',
    location: 'Laboratório 01',
    lastUpdate: 'Hoje às 14:35',
    serialNumber: 'DL-5420-2026',
    responsible: {
      initials: 'JS',
      name: 'João Silva',
    },
    createdAt: '15/01/2023',
    notes:
      'Equipamento disponível para uso em aulas práticas. Última revisão realizada sem pendências. Bateria apresentando boa autonomia.',
    history: [
      {
        id: 'history-001',
        date: '24 Out 2023, 14:30',
        title: 'Status atualizado',
        description: 'Alterado de "Em manutenção" para "Disponível".',
      },
      {
        id: 'history-002',
        date: '20 Out 2023, 09:15',
        title: 'Equipamento revisado',
        description: 'Manutenção preventiva concluída pela equipe técnica.',
      },
      {
        id: 'history-003',
        date: '15 Mai 2023, 11:00',
        title: 'Localização alterada',
        description: 'Movido de "Almoxarifado" para "Lab Info 1".',
      },
      {
        id: 'history-004',
        date: '15 Jan 2023, 10:00',
        title: 'Equipamento cadastrado',
        description: 'Registro inicial no sistema.',
      },
    ],
  },
  {
    id: 'EQP-042',
    name: 'Monitor LG',
    type: 'Informática',
    model: 'UltraWide 29"',
    status: 'Disponível',
    location: 'Laboratório 02',
    lastUpdate: '22 Out 2023',
    serialNumber: 'LG-29-042',
    responsible: {
      initials: 'MA',
      name: 'Marina Alves',
    },
    createdAt: '02/02/2023',
    notes: 'Monitor reservado para estações de desenvolvimento e edição de imagem.',
    history: [
      {
        id: 'history-005',
        date: '22 Out 2023, 16:10',
        title: 'Inventário conferido',
        description: 'Patrimônio validado durante conferência mensal.',
      },
      {
        id: 'history-006',
        date: '02 Fev 2023, 08:40',
        title: 'Equipamento cadastrado',
        description: 'Registro inicial no sistema.',
      },
    ],
  },
  {
    id: 'EQP-087',
    name: 'Projetor Epson',
    type: 'Imagem',
    model: 'PowerLite E20',
    status: 'Em manutenção',
    location: 'Auditório',
    lastUpdate: '20 Out 2023',
    serialNumber: 'EP-E20-087',
    responsible: {
      initials: 'RC',
      name: 'Rafael Costa',
    },
    createdAt: '10/03/2023',
    notes: 'Equipamento aguardando troca de lâmpada antes de voltar para uso regular.',
    history: [
      {
        id: 'history-007',
        date: '20 Out 2023, 09:15',
        title: 'Manutenção aberta',
        description: 'Chamado técnico aberto para troca de lâmpada.',
      },
      {
        id: 'history-008',
        date: '10 Mar 2023, 14:20',
        title: 'Equipamento cadastrado',
        description: 'Registro inicial no sistema.',
      },
    ],
  },
]

export function getEquipmentDetailSummary(equipment: EquipmentDetail): EquipmentDetailSummary[] {
  return [
    {
      id: 'status',
      title: 'Status',
      value: equipment.status,
      description: equipment.status === 'Disponível' ? 'Pronto para uso' : 'Acompanha restrição',
    },
    {
      id: 'location',
      title: 'Localização',
      value: equipment.location,
      description: 'Setor atual',
    },
    {
      id: 'responsible',
      title: 'Responsável',
      value: equipment.responsible.name,
      description: 'Pessoa de referência',
    },
    {
      id: 'updatedAt',
      title: 'Atualizado',
      value: equipment.lastUpdate,
      description: 'Última alteração',
    },
  ]
}

export const equipmentDetailSummaryMock: EquipmentDetailSummary[] = equipmentDetailsMock[0]
  ? getEquipmentDetailSummary(equipmentDetailsMock[0])
  : []

export function findEquipmentDetailById(equipmentId?: string) {
  return equipmentDetailsMock.find((equipment) => equipment.id === equipmentId)
}
