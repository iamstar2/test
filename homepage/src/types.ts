export interface DefectItem {
  id: string;
  name: string;
  type: 'crack' | 'chipping' | 'particle' | 'stain';
  sizeMicron: number;
  location: { x: number; y: number };
  bboxAreaPercentage: number;
  polygonAreaPercentage: number;
  confidence: number;
}

export interface ModelComparison {
  model: string;
  p95Latency: string;
  mAP50: string;
  nmsFree: boolean;
  dflRemoval: boolean;
  smallObjectLoss: boolean;
  note: string;
}

export interface RoiState {
  monthlyWafers: number;
  diePerWafer: number;
  currentOverkillPercent: number;
  currentUnderkillDppm: number;
  reviewCostPerDieWon: number;
  scrapCostPerWaferWon: number;
}

export interface PocFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  waferSize: '300mm (12 inch)' | '200mm (8 inch)' | '150mm (6 inch)';
  dieSize: string;
  minDefectSize: string;
  dieSorterModel: string;
  aecQ100Required: boolean;
  notes: string;
}
