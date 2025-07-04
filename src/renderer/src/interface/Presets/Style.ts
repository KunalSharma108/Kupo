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
      color?: ColorsKey;
      image?: imageBackgroundKey;
      gradient?: gradientBackgroundKey;
      'image + gradient'?: imageGradientBackgroundKey;
    } | false;

    layout?: {
      verticalAlign?: 'Top' | 'Center' | 'Bottom'; // required
      horizontalAlign?: 'Left' | 'Center' | 'Right'; // required
      width?: 'Default' | number; // essential, no | false
      height?: 'Default' | number; // essential, no | false
      maxWidth?: 'Default' | number | false; // optional
      maxHeight?: 'Default' | number | false; // optional
    } | false;

    border?: {
      borderColor?: ColorsKey | false;
      borderWidth?: 'Default (2px)' | number | false;
      borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none' | false;
      borderRadius?: number | 'none' | false;
    } | false;

    transition?: {
      transitionDuration?: number; // 0 is valid, false makes no sense
      transitionStyle?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    } | false;

    font?: {
      fontColor?: ColorsKey | false;
      fontFamily?: fontOptionsKey | false;
      fontWeight?: number | false;
      fontSize?: fontSizesKey | false;
    } | false;

    margin?: {
      marginTop?: spacingKey | false;
      marginBottom?: spacingKey | false;
      marginLeft?: spacingKey | false;
      marginRight?: spacingKey | false;
    } | false;

    padding?: {
      paddingTop?: spacingKey | false;
      paddingBottom?: spacingKey | false;
      paddingLeft?: spacingKey | false;
      paddingRight?: spacingKey | false;
    } | false;

    shadow?: {
      offsetX?: number | false;
      offsetY?: number | false;
      blurRadius?: number | false;
      spreadRadius?: number | false;
      color?: ColorsKey | false;
      inset?: boolean | false;
    } | false;
  };

  hoverStyles?: {
    background?: {
      type: BackgroundTypeMapKey | false;
      color?: ColorsKey;
      image?: imageBackgroundKey;
      gradient?: gradientBackgroundKey;
      'image + gradient'?: imageGradientBackgroundKey;
    } | false;

    layout?: {
      verticalAlign?: 'Top' | 'Center' | 'Bottom';
      horizontalAlign?: 'Left' | 'Center' | 'Right';
      width?: 'Default' | number;
      height?: 'Default' | number;
      maxWidth?: 'Default' | number | false;
      maxHeight?: 'Default' | number | false;
    };

    border?: {
      borderColor?: ColorsKey | false;
      borderWidth?: 'Default (2px)' | number | false;
      borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none' | false;
      borderRadius?: number | 'none' | false;
    } | false;

    transition?: {
      transitionDuration?: number;
      transitionStyle?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
    } | false;

    font?: {
      fontColor?: ColorsKey | false;
      fontFamily?: fontOptionsKey | false;
      fontWeight?: number | false;
      fontSize?: fontSizesKey | false;
    } | false;

    margin?: {
      marginTop?: spacingKey | false;
      marginBottom?: spacingKey | false;
      marginLeft?: spacingKey | false;
      marginRight?: spacingKey | false;
    } | false;

    padding?: {
      paddingTop?: spacingKey | false;
      paddingBottom?: spacingKey | false;
      paddingLeft?: spacingKey | false;
      paddingRight?: spacingKey | false;
    } | false;

    shadow?: {
      offsetX?: number | false;
      offsetY?: number | false;
      blurRadius?: number | false;
      spreadRadius?: number | false;
      color?: ColorsKey | false;
      inset?: boolean | false;
    } | false;
  };
}


export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
