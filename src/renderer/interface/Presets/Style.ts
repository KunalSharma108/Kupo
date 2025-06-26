import { BackgroundTypeMapKey } from "./Background";
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
    background?: BackgroundTypeMapKey;

    layout?: {
      verticalAlign: 'Left' | 'Center' | 'Right';
      horizontalAlign: 'Top' | 'Center' | 'bottom';
      width?: 'Default' | number;
      height: 'Default' | number;
      maxWidth?: 'Default' | number;
      maxHeight: 'Default' | number;
    };

    border?: {
      borderColor?: ColorsKey;
      borderWidth?: 'Default (2px)' | number;
      borderStyle?: "solid" | "dashed" | "dotted" | "none";
      borderRadius?: number | 'none';
    };

    transition: {
      transitionDuration: number;
      transitionStyle: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
    }

    font: {
      fontColor?: ColorsKey;
      fontFamily?: fontOptionsKey;
      fontWeight?: number;
      fontSize?: fontSizesKey;
    }

    margin: {
      marginTop?: spacingKey;
      marginBottom?: spacingKey;
      marginLeft?: spacingKey;
      marginRight?: spacingKey;
    }

    padding: {
      paddingTop?: spacingKey;
      paddingBottom?: spacingKey;
      paddingLeft?: spacingKey;
      paddingRight?: spacingKey;
    }

    shadow?: {
      offsetX?: number;
      offsetY?: number;
      blurRadius?: number;
      spreadRadius?: number;
      color?: ColorsKey;
      inset?: boolean;
    };
  };

  hoverStyles?: {
    background?: BackgroundTypeMapKey;

    layout?: {
      verticalAlign: 'Left' | 'Center' | 'Right';
      horizontalAlign: 'Top' | 'Center' | 'bottom';
      width?: 'Default' | number;
      height: 'Default' | number;
      maxWidth?: 'Default' | number;
      maxHeight: 'Default' | number;
    };

    border?: {
      borderColor?: ColorsKey;
      borderWidth?: 'Default (2px)' | number;
      borderStyle?: "solid" | "dashed" | "dotted" | "none";
      borderRadius?: number | 'none';
    };

    font: {
      fontColor?: ColorsKey;
      fontFamily?: fontOptionsKey;
      fontWeight?: number;
      fontSize?: fontSizesKey;
    }

    margin: {
      marginTop?: spacingKey;
      marginBottom?: spacingKey;
      marginLeft?: spacingKey;
      marginRight?: spacingKey;
    }

    padding: {
      paddingTop?: spacingKey;
      paddingBottom?: spacingKey;
      paddingLeft?: spacingKey;
      paddingRight?: spacingKey;
    }

    shadow?: {
      offsetX?: number;
      offsetY?: number;
      blurRadius?: number;
      spreadRadius?: number;
      color?: ColorsKey;
      inset?: boolean;
    };
  }
}

export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
