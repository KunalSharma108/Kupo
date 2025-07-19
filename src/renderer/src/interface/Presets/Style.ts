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
      'vertical align'?: 'Top' | 'Center' | 'Bottom' | 'undefined';
      'horizontal align'?: 'Left' | 'Center' | 'Right' | 'undefined';
      width?: string;
      height?: string;
      'max width'?: string;
      'max height'?: string;
    } | false;

    border?: {
      'border color'?: ColorsKey | 'none';
      'border width'?: 'Default (2px)' | number | 'undefined';
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none';
      'border radius'?: number | 'none';
    } | false;

    transition?: {
      'transition duration'?: number | 'undefined';
      'transition style'?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'undefined';
    } | false;

    font?: {
      'font color'?: ColorsKey | 'Default';
      'font family'?: fontOptionsKey | 'Default';
      'font weight'?: number | 'Default';
      'font size'?: fontSizesKey | 'Default';
    } | false;

    margin?: {
      'margin top'?: number | 'undefined';
      'margin bottom'?: number | 'undefined';
      'margin left'?: number | 'undefined';
      'margin right'?: number | 'undefined';
    } | false;

    padding?: {
      'padding top'?: number | 'undefined';
      'padding bottom'?: number | 'undefined';
      'padding left'?: number | 'undefined';
      'padding right'?: number | 'undefined';
    } | false;

    shadow?: {
      'offset x'?: number | 'undefined';
      'offset y'?: number | 'undefined';
      'blur radius'?: number | 'undefined';
      'spread radius'?: number | 'undefined';
      color?: ColorsKey | 'undefined';
      inset?: boolean | 'undefined';
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
      'vertical align'?: 'Top' | 'Center' | 'Bottom' | 'undefined';
      'horizontal align'?: 'Left' | 'Center' | 'Right' | 'undefined';
      width?: 'Default' | number;
      height?: 'Default' | number;
      'max width'?: 'Default' | number;
      'max height'?: 'Default' | number;
    };

    border?: {
      'border color'?: ColorsKey | 'none';
      'border width'?: 'Default (2px)' | number | 'undefined';
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
      'margin top'?: number | 'undefined';
      'margin bottom'?: number | 'undefined';
      'margin left'?: number | 'undefined';
      'margin right'?: number | 'undefined';
    } | false;

    padding?: {
      'padding top'?: number | 'undefined';
      'padding bottom'?: number | 'undefined';
      'padding left'?: number | 'undefined';
      'padding right'?: number | 'undefined';
    } | false;

    shadow?: {
      'offset x'?: number | 'undefined';
      'offset y'?: number | 'undefined';
      'blur radius'?: number | 'undefined';
      'spread radius'?: number | 'undefined';
      color?: ColorsKey | 'undefined';
      inset?: boolean | 'undefined';
    } | false;
  };
}


export type hoverEffectsKey = keyof typeof hoverEffects;
