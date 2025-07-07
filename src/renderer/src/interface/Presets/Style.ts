import { BackgroundTypeMapKey, gradientBackgroundKey, imageBackgroundKey, imageGradientBackgroundKey } from "./Background";
import { fontOptionsKey, fontSizesKey } from "./FontFamily";
import { ColorsKey } from "./uiBlocks";

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

export const spacingOptions: Record<string, styleOption> = {
  none: { label: 'None', css: '0' },
  xs: { label: 'Extra Small', css: '4px' },
  sm: { label: 'Small', css: '8px' },
  md: { label: 'Medium', css: '16px' },
  lg: { label: 'Large', css: '24px' },
  xl: { label: 'Extra Large', css: '32px' },
} as const;

export interface styles {
  styles?: {
    background?: {
      type: BackgroundTypeMapKey | false;
      color?: ColorsKey | false;
      image?: imageBackgroundKey | false;
      gradient?: gradientBackgroundKey | false;
      'image + gradient'?: imageGradientBackgroundKey | false;
    } | false;

    layout?: {
      'vertical align'?: 'Top' | 'Center' | 'Bottom';
      'horizontal align'?: 'Left' | 'Center' | 'Right';
      width?: 'Default' | number;
      height?: 'Default' | number;
      'max width'?: 'Default' | number | false;
      'max height'?: 'Default' | number | false;
    } | false;

    border?: {
      'border color'?: ColorsKey | false;
      'border width'?: 'Default (2px)' | number | false;
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none' | false;
      'border radius'?: number | 'none' | false;
    } | false;

    transition?: {
      'transition duration'?: number;
      'transition style'?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    } | false;

    font?: {
      'font color'?: ColorsKey | false;
      'font family'?: fontOptionsKey | false;
      'font weight'?: number | false;
      'font size'?: fontSizesKey | false;
    } | false;

    margin?: {
      'margin top'?: spacingKey | false;
      'margin bottom'?: spacingKey | false;
      'margin left'?: spacingKey | false;
      'margin right'?: spacingKey | false;
    } | false;

    padding?: {
      'padding top'?: spacingKey | false;
      'padding bottom'?: spacingKey | false;
      'padding left'?: spacingKey | false;
      'padding right'?: spacingKey | false;
    } | false;

    shadow?: {
      'offset x'?: number | false;
      'offset y'?: number | false;
      'blur radius'?: number | false;
      'spread radius'?: number | false;
      color?: ColorsKey | false;
      inset?: boolean | false;
    } | false;
  };

  hoverStyles?: {
    background?: {
      type: BackgroundTypeMapKey | false;
      color?: ColorsKey | false;
      image?: imageBackgroundKey | false;
      gradient?: gradientBackgroundKey | false;
      'image + gradient'?: imageGradientBackgroundKey | false;
    } | false;

    layout?: {
      'vertical align'?: 'Top' | 'Center' | 'Bottom';
      'horizontal align'?: 'Left' | 'Center' | 'Right';
      width?: 'Default' | number;
      height?: 'Default' | number;
      'max width'?: 'Default' | number | false;
      'max height'?: 'Default' | number | false;
    };

    border?: {
      'border color'?: ColorsKey | false;
      'border width'?: 'Default (2px)' | number | false;
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none' | false;
      'border radius'?: number | 'none' | false;
    } | false;

    font?: {
      'font color'?: ColorsKey | false;
      'font family'?: fontOptionsKey | false;
      'font weight'?: number | false;
      'font size'?: fontSizesKey | false;
    } | false;

    margin?: {
      'margin top'?: spacingKey | false;
      'margin bottom'?: spacingKey | false;
      'margin left'?: spacingKey | false;
      'margin right'?: spacingKey | false;
    } | false;

    padding?: {
      'padding top'?: spacingKey | false;
      'padding bottom'?: spacingKey | false;
      'padding left'?: spacingKey | false;
      'padding right'?: spacingKey | false;
    } | false;

    shadow?: {
      'offset x'?: number | false;
      'offset y'?: number | false;
      'blur radius'?: number | false;
      'spread radius'?: number | false;
      color?: ColorsKey | false;
      inset?: boolean | false;
    } | false;
  };
}


export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
