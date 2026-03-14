export interface Unit {
  id: number;
  unit_number: string;
  block: string;
  owner_name: string;
  legal_name: string; // Nome/Razão Social
  emails: string;
  phones: string;
}

export interface Notification {
  id: number;
  unit_id: number;
  type: string;
  template_type: string;
  description: string;
  occurrence_date: string;
  date: string;
  sent_at: string | null;
}

export const OCCURRENCE_TYPES = [
  "Roupas na varanda",
  "Objetos no corredor/hall",
  "Dejetos de pet",
  "Estacionamento irregular",
  "Barulho / Perturbação",
  "Animal em área proibida",
  "Trânsito de bicicletas em área proibida",
  "Outras"
];

export const TEMPLATE_MODELS = [
  { id: 'advertencia', name: 'Advertência Geral' },
  { id: 'multa', name: 'Multa Geral' },
  { id: 'advertencia_barulho', name: 'Advertência: Barulho / Perturbação' },
  { id: 'multa_barulho', name: 'Multa: Barulho / Perturbação' },
  { id: 'multa_bicicletas', name: 'Multa: Trânsito de Bicicletas' },
  { id: 'multa_estacionamento', name: 'Multa: Estacionamento Irregular' },
  { id: 'multa_gramada', name: 'Multa: Animal em Área Gramada' },
  { id: 'multa_objetos_corredor', name: 'Multa: Objetos no Corredor' },
  { id: 'multa_roupas_varanda', name: 'Multa: Roupas na Varanda' },
  { id: 'multa_dejetos', name: 'Multa: Dejetos de Pet' },
  { id: 'advertencia_gramada', name: 'Advertência: Área Gramada' },
  { id: 'advertencia_dejetos', name: 'Advertência: Dejetos de Pet' },
  { id: 'advertencia_estacionamento', name: 'Advertência: Estacionamento Errado' },
  { id: 'advertencia_roupas_varanda', name: 'Advertência: Roupas na Varanda' },
  { id: 'advertencia_objetos_corredor', name: 'Advertência: Objetos no Corredor' },
  { id: 'advertencia_bicicletas', name: 'Advertência: Trânsito de Bicicletas' },
  { id: 'outros', name: 'Outros (Personalizado)' }
];
