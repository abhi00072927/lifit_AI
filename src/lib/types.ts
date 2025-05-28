import type { LucideIcon } from 'lucide-react';
import type { ZodTypeAny } from 'zod';

export type LetterType = 'College/School' | 'Job' | 'Application' | 'Report';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[]; // For select type
  validation: ZodTypeAny;
  colSpan?: number; // For grid layout, default 1
  defaultValue?: string;
}

export interface LetterTypeDetail {
  label: string;
  icon: LucideIcon;
  description: string;
  formFields: FormFieldConfig[];
}

export type LetterTypeConfigurations = {
  [key in LetterType]: LetterTypeDetail;
};
