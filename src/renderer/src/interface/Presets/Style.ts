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
      'border width'?: 'Default (2px)' | string | 'undefined';
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none';
      'border radius'?: string | 'none';
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
      'margin top'?: string | 'undefined';
      'margin bottom'?: string | 'undefined';
      'margin left'?: string | 'undefined';
      'margin right'?: string | 'undefined';
    } | false;

    padding?: {
      'padding top'?: string | 'undefined';
      'padding bottom'?: string | 'undefined';
      'padding left'?: string | 'undefined';
      'padding right'?: string | 'undefined';
    } | false;

    shadow?: {
      'offset x'?: string | 'undefined';
      'offset y'?: string | 'undefined';
      'blur radius'?: string | 'undefined';
      'spread radius'?: string | 'undefined';
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
      width?: 'Default' | string;
      height?: 'Default' | string;
      'max width'?: 'Default' | string;
      'max height'?: 'Default' | string;
    };

    border?: {
      'border color'?: ColorsKey | 'none';
      'border width'?: 'Default (2px)' | string | 'undefined';
      'border style'?: 'solid' | 'dashed' | 'dotted' | 'none';
      'border radius'?: string | 'none';
    } | false;

    font?: {
      'font color'?: ColorsKey | 'Default';
      'font family'?: fontOptionsKey | 'Default';
      'font weight'?: string | 'Default';
      'font size'?: fontSizesKey | 'Default';
    } | false;

    margin?: {
      'margin top'?: string | 'undefined';
      'margin bottom'?: string | 'undefined';
      'margin left'?: string | 'undefined';
      'margin right'?: string | 'undefined';
    } | false;

    padding?: {
      'padding top'?: string | 'undefined';
      'padding bottom'?: string | 'undefined';
      'padding left'?: string | 'undefined';
      'padding right'?: string | 'undefined';
    } | false;

    shadow?: {
      'offset x'?: string | 'undefined';
      'offset y'?: string | 'undefined';
      'blur radius'?: string | 'undefined';
      'spread radius'?: string | 'undefined';
      color?: ColorsKey | 'undefined';
      inset?: boolean | 'undefined';
    } | false;
  };
}


export type hoverEffectsKey = keyof typeof hoverEffects;
