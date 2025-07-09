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
      'max width'?: 'Default' | number;
      'max height'?: 'Default' | number;
    } | false;

    border?: {
      'border color'?: ColorsKey | 'none';
      'border width'?: 'Default (2px)' | number;
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none';
      'border radius'?: number | 'none';
    } | false;

    transition?: {
      'transition duration'?: number;
      'transition style'?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    } | false;

    font?: {
      'font color'?: ColorsKey | 'Default';
      'font family'?: fontOptionsKey | 'Default';
      'font weight'?: number | 'Default';
      'font size'?: fontSizesKey | 'Default';
    } | false;

    margin?: {
      'margin top'?: number;
      'margin bottom'?: number;
      'margin left'?: number;
      'margin right'?: number;
    } | false;

    padding?: {
      'padding top'?: number;
      'padding bottom'?: number;
      'padding left'?: number;
      'padding right'?: number;
    } | false;

    shadow?: {
      'offset x'?: number;
      'offset y'?: number;
      'blur radius'?: number;
      'spread radius'?: number;
      color?: ColorsKey;
      inset?: boolean;
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
      'max width'?: 'Default' | number;
      'max height'?: 'Default' | number;
    };

    border?: {
      'border color'?: ColorsKey | 'none';
      'border width'?: 'Default (2px)' | number;
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none';
      'border radius'?: number | 'none';
    } | false;

    font?: {
      'font color'?: ColorsKey | 'Default';
      'font family'?: fontOptionsKey | 'Default';
      'font weight'?: number | 'Default';
      'font size'?: fontSizesKey | 'Default';
    } | false;

    margin?: {
      'margin top'?: number;
      'margin bottom'?: number;
      'margin left'?: number;
      'margin right'?: number;
    } | false;

    padding?: {
      'padding top'?: number;
      'padding bottom'?: number;
      'padding left'?: number;
      'padding right'?: number;
    } | false;

    shadow?: {
      'offset x'?: number;
      'offset y'?: number;
      'blur radius'?: number;
      'spread radius'?: number;
      color?: ColorsKey | false;
      inset?: boolean;
    } | false;
  };
}


export type hoverEffectsKey = keyof typeof hoverEffects;
