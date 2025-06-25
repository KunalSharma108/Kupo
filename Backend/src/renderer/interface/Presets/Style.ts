export interface styleOption {
  label: string;
  css: string;
}

export interface dynamicStyleOption<T> {
  label: string;
  value: T;
  css: (value: T) => string;
}

export const hoverEffects: Record<string, styleOption> = {
  underline: { label: 'underline', css: 'text-decoration: underline;' },
  scale: { label: 'Scale Up', css: 'transform: scale(1.05); transition: transform 0.2s;' },
  none: { label: 'None', css: '' },
} as const;

export const horizontalPosition = {
  left: {
    label: 'Left',
    css: 'justify-content: flex-start; text-align: left;'
  },
  center: {
    label: 'Center',
    css: 'justify-content: center; text-align: center;'
  },
  right: {
    label: 'Right',
    css: 'justify-content: flex-end; text-align: right;'
  }
} as const;

export const verticalPosition = {
  top: {
    label: 'Top',
    css: 'align-items: flex-start;'
  },
  center: {
    label: 'Center',
    css: 'align-items: center;'
  },
  bottom: {
    label: 'Bottom',
    css: 'align-items: flex-end;'
  }
} as const;

export const spacingOptions: Record<string, styleOption> = {
  none: { label: 'None', css: '0' },
  xs: { label: 'Extra Small', css: '4px' },
  sm: { label: 'Small', css: '8px' },
  md: { label: 'Medium', css: '16px' },
  lg: { label: 'Large', css: '24px' },
  xl: { label: 'Extra Large', css: '32px' },
} as const;

export type verticalPositionKey = keyof typeof verticalPosition;
export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
export type horizontalPositionKey = keyof typeof horizontalPosition;
