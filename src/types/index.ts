export type AppView = 
  | 'studio'
  | 'welcome'
  | 'splash'
  | 'installer'
  | 'portable'
  | 'brand_hub'
  | 'about';

export type StudioTool = 
  | 'upscale'
  | 'enhance'
  | 'bg_remove'
  | 'restore'
  | 'edit';

export interface SampleImage {
  id: string;
  name: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
  description: string;
  suggestedTool: StudioTool;
}

export interface LogoAssetItem {
  id: string;
  number: number;
  name: string;
  description: string;
  aspectRatio: string;
  recommendedSizes: string[];
  usage: string;
  fileFormat: string;
  previewType: 'master' | 'square_icon' | 'sidebar' | 'welcome' | 'splash' | 'about' | 'installer' | 'portable' | 'ico';
}

export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  contrastOnDark: string;
}
